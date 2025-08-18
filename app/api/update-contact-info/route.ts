import { NextRequest } from "next/server";
import pool from "@/lib/db";

const getUserId = (req: NextRequest) => 1;

export async function POST(req: NextRequest) {
  const user_id = getUserId(req);
  if (!user_id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json();
  const { whatsapp, telegram } = body;
  if (!whatsapp && !telegram) {
    return new Response(
      JSON.stringify({ status: "error", message: "No contact info provided" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  await pool.query(
    "UPDATE users SET whatsapp_number = $1, telegram_number = $2 WHERE user_id = $3",
    [whatsapp || null, telegram || null, user_id]
  );
  return new Response(JSON.stringify({ status: "success" }), {
    headers: { "Content-Type": "application/json" },
  });
}