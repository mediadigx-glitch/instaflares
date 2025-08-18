import { NextRequest } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

// Get user ID from JWT token in Authorization header
function getUserId(req: NextRequest): number | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { user_id: number };
    return payload.user_id;
  } catch {
    return null;
  }
}

// GET /api/instagram-accounts
export async function GET(req: NextRequest) {
  const user_id = getUserId(req);
  if (!user_id) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const { rows } = await pool.query(
    "SELECT insta_id, instagram_username FROM instagram_accounts WHERE user_id = $1 AND status = TRUE",
    [user_id]
  );
  return Response.json({ accounts: rows });
}

// POST /api/instagram-accounts
export async function POST(req: NextRequest) {
  const user_id = getUserId(req);
  if (!user_id) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const body = await req.json();
  const { instagram_username, instagram_password } = body;
  if (!instagram_username || !instagram_password) {
    return new Response(JSON.stringify({ status: "error", message: "Missing fields" }), { status: 400 });
  }
  await pool.query(
    `INSERT INTO instagram_accounts 
      (user_id, instagram_username, instagram_password, created_at, status, ip_address, user_agent, device) 
      VALUES ($1, $2, $3, NOW(), TRUE, '', '', '')`,
    [user_id, instagram_username, instagram_password]
  );
  return Response.json({ status: "success" });
}

// DELETE /api/instagram-accounts
export async function DELETE(req: NextRequest) {
  const user_id = getUserId(req);
  if (!user_id) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const body = await req.json();
  const { insta_id } = body;
  await pool.query(
    "UPDATE instagram_accounts SET status = FALSE WHERE insta_id = $1 AND user_id = $2",
    [insta_id, user_id]
  );
  return Response.json({ status: "success" });
}