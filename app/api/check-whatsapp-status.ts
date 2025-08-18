import type { NextApiRequest, NextApiResponse } from "next";
import  pool  from "@/lib/db";

const getUserId = (req: NextApiRequest) => 1;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user_id = getUserId(req);
  if (!user_id) return res.status(401).json({ error: "Unauthorized" });

  const { rows } = await pool.query(
    "SELECT whatsapp_number FROM users WHERE user_id = $1",
    [user_id]
  );
  const whatsapp_status = rows && rows[0]?.whatsapp_number ? 1 : 0;
  res.json({ whatsapp_status });
}