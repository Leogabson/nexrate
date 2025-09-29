"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";

export default function SigninPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check for error in URL params only if no session is loading
    if (status === "loading") return;
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get("error");
    if (errorParam) {
      setError(errorParam);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError(
        res.error.includes("ETIMEOUT")
          ? "Database connection failed. Check your MongoDB URI and network."
          : res.error
      );
    } else if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>; // Prevent flash of content during session check
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-700">
        <div className="flex items-center justify-center mb-6">
          <Image src="/logo.png" alt="NexRate" width={40} height={40} />
          <span className="text-2xl font-bold text-cyan-400">NexRate</span>
        </div>

        <h2 className="text-2xl font-bold text-cyan-400 text-center mb-6">
          Welcome Back
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-400 bg-red-900/30 p-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500 outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500 outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-400 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-600"></div>
          <span className="px-4 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-600"></div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full py-3 bg-cyan-400 text-black rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-cyan-200 transition"
        >
          <img src="/google-icon.png" alt="Google" className="w-10 h-10" />
          Continue with Google
        </button>

        <p className="text-gray-400 text-xs text-center mt-6">
          By continuing, you agree to{" "}
          <a href="/terms" className="text-cyan-400 hover:underline">
            NexRate’s Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-cyan-400 hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        <p className="text-gray-400 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-cyan-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
