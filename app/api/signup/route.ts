import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, email_address, password) VALUES ($1, $2, $3) RETURNING user_id, username, email_address, created_at',
      [name, email, hashedPassword]
    );
    const user = result.rows[0];
    const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
    const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '7d' });
    return NextResponse.json({ user, token });
  } catch (err: any) {
    console.error('Signup error:', err);
    if (err.code === '23505') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}