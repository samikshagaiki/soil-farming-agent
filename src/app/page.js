// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl mb-8">Soil Farming Agent</h1>
      <div className="space-x-4">
        <Link href="/user/register" className="px-4 py-2 bg-blue-500 text-white rounded">User Register</Link>
        <Link href="/login" className="px-4 py-2 bg-green-500 text-white rounded">User Login</Link>
        <Link href="/admin" className="px-4 py-2 bg-red-500 text-white rounded">Admin Login</Link>
      </div>
    </div>
  );
}