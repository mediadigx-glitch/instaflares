import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const result = await pool.query(
    'SELECT user_id, username, email_address, password FROM users WHERE email_address = $1',
    [email]
  );
  const user = result.rows[0];
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Generate JWT token
  const token = jwt.sign(
    { user_id: user.user_id, email: user.email_address },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return NextResponse.json({ token, user: { user_id: user.user_id, username: user.username, email: user.email_address } });
}