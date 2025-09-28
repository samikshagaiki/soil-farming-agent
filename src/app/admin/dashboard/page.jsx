// src/app/admin/dashboard/page.tsx
'use client';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import PostForm from '@/components/PostForm';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, role, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!user || role !== 'admin') return <p>Access denied. <Link href="/">Go Home</Link></p>;

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Admin Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
      </header>
      <PostForm type="soil" onSuccess={() => console.log('Soil posted')} />
      <PostForm type="distributor" onSuccess={() => console.log('Distributor posted')} />
    </div>
  );
}