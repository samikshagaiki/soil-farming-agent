"use client";

import Link from "next/link";

import { signOut, useSession } from "next-auth/react";

const Navbar = () => {

  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-green-700">
        🌾 KrushiMitra
      </h1>

      <div className="flex gap-4 items-center">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/soil">
          Soil
        </Link>

        {
          session?.user?.role === "admin" && (
            <Link href="/admin/dashboard">
              Admin
            </Link>
          )
        }

        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;