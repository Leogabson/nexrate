// src/app/auth/verify/page.tsx
"use client";

import Link from "next/link";

export default function VerifiedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-cyan-500">✅ Email Verified!</h1>
        <p className="mt-4 text-gray-600">
          Your account has been successfully verified. You can now log in and
          start using NexRate.
        </p>
        <Link
          href="/auth/signin"
          className="mt-6 inline-block bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
