// src/app/user/register/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';

export default function Register() {
  const router = useRouter();
  return <AuthForm type="register" onSuccess={() => router.push('/user/dashboard')} />;
}