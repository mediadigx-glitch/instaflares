import { NextRequest } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body.url;
    const secret = body.secret;

    // Set this env var in Vercel: UPDATE_SECRET
    if (!process.env.UPDATE_SECRET || secret !== process.env.UPDATE_SECRET) {
      return new Response(JSON.stringify({ status: "error", message: "Unauthorized" }), { status: 401 });
    }
    if (!url) {
      return new Response(JSON.stringify({ status: "error", message: "Missing url" }), { status: 400 });
    }

    await pool.query(
      `INSERT INTO app_config (key, value, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = EXCLUDED.updated_at`,
      ["php_login_url", url]
    );

    return new Response(JSON.stringify({ status: "ok", url }), { status: 200 });
  } catch (e) {
    console.error("update-php-url error:", e);
    return new Response(JSON.stringify({ status: "error", message: "Internal server error" }), { status: 500 });
  }
}