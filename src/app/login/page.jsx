// src/app/login/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm type="login" onSuccess={() => router.push('/user/dashboard')} />
      <Link href="/user/register" className="block mt-4 text-center text-blue-500">Register instead?</Link>
    </div>
  );
}