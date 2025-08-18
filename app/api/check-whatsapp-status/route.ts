import { NextRequest } from "next/server";
import pool from "@/lib/db";

const getUserId = (req: NextRequest) => 1;

export async function GET(req: NextRequest) {
  const user_id = getUserId(req);
  if (!user_id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { rows } = await pool.query(
    "SELECT whatsapp_number FROM users WHERE user_id = $1",
    [user_id]
  );
  const whatsapp_status = rows && rows[0]?.whatsapp_number ? 1 : 0;
  return new Response(JSON.stringify({ whatsapp_status }), {
    headers: { "Content-Type": "application/json" },
  });
}