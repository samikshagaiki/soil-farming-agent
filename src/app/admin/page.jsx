// src/app/admin/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';

export default function AdminLogin() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm type="login" onSuccess={() => router.push('/admin/dashboard')} isAdmin />
    </div>
  );
}