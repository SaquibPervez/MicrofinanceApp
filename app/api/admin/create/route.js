import dbConnect from '@/server/lib/mongoose';
import User from '@/server/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), {
      status: 400,
    });
  }

  await dbConnect();

  const existing = await User.findOne({ email });
  if (existing) {
    return new Response(JSON.stringify({ message: 'User already exists' }), {
      status: 400,
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const admin = await User.create({
    name,
    email,
    password: hashed,
    isAdmin: true,
    status: 'Verified',
  });

  return new Response(
    JSON.stringify({ message: 'Admin created', adminId: admin._id }),
    { status: 201 }
  );
}
