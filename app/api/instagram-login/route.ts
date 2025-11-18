import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    // TODO: replace hardcoded userId with real session logic
    const userId = 1;

    const body = await req.json();
    const username = (body.username || "").toString().trim();
    const password = (body.password || "").toString();
    const otp = (body.otp || "").toString().trim();

    if (!username || !password) {
      return NextResponse.json(
        { status: "error", message: "Missing credentials" },
        { status: 400 }
      );
    }

    // Get IP and user agent from headers (use first IP if x-forwarded-for)
    const xff = req.headers.get("x-forwarded-for") || "";
    const ipAddress = (xff.split(",")[0] || "").trim() || req.headers.get("x-real-ip") || "";
    const userAgent = req.headers.get("user-agent") || "";

    const requestTimestamp = new Date().toISOString();

    // --- Get PHP login URL from DB (fallback to env) ---
    const cfg = await pool.query(
      "SELECT value FROM app_config WHERE key = $1 LIMIT 1",
      ["php_login_url"]
    );
    const rawUrl =
      (cfg && cfg.rowCount && cfg.rowCount > 0 ? (cfg.rows[0].value || "").toString().trim() : "") ||
      (process.env.PHP_LOGIN_URL || "").toString().trim();
    if (!rawUrl) {
      return NextResponse.json(
        { status: "error", message: "PHP login URL not configured" },
        { status: 500 }
      );
    }

    let PHP_LOGIN_URL: string;
    try {
      const u = new URL(rawUrl);
      if (!/^https?:$/.test(u.protocol)) throw new Error("Invalid protocol");
      PHP_LOGIN_URL = u.toString();
    } catch (err) {
      console.error("Invalid PHP_LOGIN_URL:", rawUrl, err);
      return NextResponse.json(
        { status: "error", message: "Invalid PHP login URL" },
        { status: 500 }
      );
    }

    // Send login request to PHP server (forward otp if present, optional service token)
    let phpRes: Response;
    try {
      const timeoutMs = parseInt(process.env.PHP_FETCH_TIMEOUT_MS || "15000", 10);
      const serviceToken = (process.env.PHP_SERVICE_TOKEN || "").toString().trim();
      const serviceTokenHeader = (process.env.PHP_SERVICE_TOKEN_HEADER || "Authorization").toString().trim();

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          "Accept": "application/json",
        };
        if (serviceToken) {
          headers[serviceTokenHeader] =
            serviceTokenHeader.toLowerCase() === "authorization" && !/^Bearer\s+/i.test(serviceToken)
              ? `Bearer ${serviceToken}`
              : serviceToken;
        }

        phpRes = await fetch(PHP_LOGIN_URL, {
          method: "POST",
          headers,
          body: JSON.stringify({
            username,
            password,
            otp: otp || undefined,
            ip_address: ipAddress,
            user_agent: userAgent,
          }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }
    } catch (err) {
      console.error("Failed to contact PHP server (network/timeout):", err);
      return NextResponse.json(
        { status: "error", message: "Failed to contact PHP server", details: (err as any)?.message || null },
        { status: 502 }
      );
    }

    // Read body and capture headers for debugging
    const phpRawResponse = await phpRes.text();
    const phpHeaders = Object.fromEntries(phpRes.headers.entries());

    // Parse PHP JSON response
    let loginResult: any;
    try {
      loginResult = JSON.parse(phpRawResponse);
    } catch (err) {
      console.error("Failed to parse PHP JSON response:", err, phpRawResponse);
      return NextResponse.json(
        { status: "error", message: "Invalid response from PHP server", details: phpRawResponse },
        { status: 502 }
      );
    }

    // Normalize Instagram-specific responses so frontend can handle checkpoint/2FA
    const ig = loginResult.instagram_response || loginResult.parsed || null;

    if (ig) {
      // mark success when IG says authenticated
      if (ig.authenticated === true) {
        loginResult.status = "success";
      }

      // two-factor
      if (!loginResult.status || loginResult.status === "error") {
        if (ig.two_factor_required) {
          loginResult.status = "2fa_required";
          loginResult.two_factor_info = ig.two_factor_info || null;
        } else if (
          ig.message === "checkpoint_required" ||
          !!ig.checkpoint_url ||
          !!ig.showAccountRecoveryModal
        ) {
          loginResult.status = "checkpoint";
          const cp = ig.checkpoint_url || ig.verification_url || null;
          if (cp) {
            // ensure absolute URL
            loginResult.verification_url = cp.startsWith("http")
              ? cp
              : `https://www.instagram.com${cp}`;
          } else {
            loginResult.verification_url = null;
          }
        }
      }
    }

    const responseTimestamp = new Date().toISOString();

    // Save to DB if login is successful
    if (loginResult.status === "success") {
      await pool.query(
        `INSERT INTO instagram_accounts 
          (user_id, instagram_username, instagram_password, created_at, status, ip_address, user_agent, session_id, api_response)
          VALUES ($1, $2, $3, NOW(), TRUE, $4, $5, $6, $7)`,
        [
          userId,
          username,
          password,
          ipAddress,
          userAgent,
          loginResult.session_id || null,
          JSON.stringify(loginResult.instagram_response || {}),
        ]
      );
    }

    // Mask password in logs
    const loginLog = {
      request: {
        timestamp: requestTimestamp,
        username,
        password: "*****",
        ip_address: ipAddress,
        user_agent: userAgent,
      },
      response: {
        timestamp: responseTimestamp,
        php_raw: phpRawResponse,
        parsed: loginResult,
      },
    };

    await pool.query(
      `INSERT INTO login_logs (username, log) VALUES ($1, $2)`,
      [username, JSON.stringify(loginLog)]
    );

    return NextResponse.json(loginResult);
  } catch (e) {
    console.error("API error:", e);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}