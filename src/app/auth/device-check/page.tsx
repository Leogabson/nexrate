"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Shield, Loader2 } from "lucide-react";
import Image from "next/image";

export default function DeviceCheckPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Wait for session to load
    if (status === "loading") return;

    // If not authenticated, redirect to signin
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    // If authenticated, check device
    if (status === "authenticated" && session?.user?.email) {
      checkDevice();
    }
  }, [status, session]);

  const checkDevice = async () => {
    try {
      setChecking(true);
      setError("");

      const response = await fetch("/api/auth/check-device-google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to verify device");
        setChecking(false);
        return;
      }

      // Redirect based on response
      if (data.redirectTo) {
        router.push(data.redirectTo);
      } else {
        // Fallback
        if (data.needsVerification) {
          router.push(
            `/auth/verify-code?email=${encodeURIComponent(
              session?.user?.email || ""
            )}&returnUrl=/dashboard`
          );
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      console.error("Device check error:", err);
      setError("Something went wrong. Please try again.");
      setChecking(false);
    }
  };

  const handleRetry = () => {
    setError("");
    checkDevice();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Image
            src="/logo.jpg"
            alt="NexRate"
            width={48}
            height={48}
            className="rounded-xl"
          />
          <span className="text-3xl font-bold text-white">NexRate</span>
        </div>

        {/* Card */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-500/30">
              {checking ? (
                <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
              ) : (
                <Shield className="w-10 h-10 text-cyan-400" />
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white text-center mb-3">
            {checking ? "Verifying Your Device" : "Device Check"}
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-center mb-6">
            {checking
              ? "Please wait while we verify your device for security..."
              : error
              ? "We encountered an issue while checking your device."
              : "Device verification complete."}
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-600 text-red-400 text-sm rounded-lg">
              <p className="font-semibold mb-1">Verification Failed</p>
              <p>{error}</p>
            </div>
          )}

          {/* Retry Button */}
          {error && (
            <button
              onClick={handleRetry}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all"
            >
              Retry Verification
            </button>
          )}

          {/* Loading Indicator */}
          {checking && (
            <div className="space-y-3">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse rounded-full w-2/3"></div>
              </div>
              <p className="text-center text-sm text-gray-500">
                This may take a few seconds...
              </p>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-300 font-medium mb-1">
                  Why are we doing this?
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  As a fintech platform, we take your security seriously. We
                  verify each device to ensure only you can access your account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Having trouble?{" "}
          <a
            href="/support"
            className="text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
