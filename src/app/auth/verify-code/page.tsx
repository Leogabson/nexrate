"use client";

import {
  useState,
  useEffect,
  useRef,
  type KeyboardEvent,
  Suspense,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Zap, Brain, Mail, RefreshCw } from "lucide-react";
import Image from "next/image";

function VerifyCodeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";
  const returnUrl = searchParams?.get("returnUrl") || "/dashboard";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [trustDevice, setTrustDevice] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendCountdown]);

  const handleCodeChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit !== "") && !loading) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
    setCode(newCode);

    const lastFilledIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastFilledIndex]?.focus();

    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (codeString: string) => {
    if (attemptsLeft <= 0) {
      setError("Too many failed attempts. Please request a new code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: codeString,
          trustDevice,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(returnUrl);
      } else {
        const newAttemptsLeft = attemptsLeft - 1;
        setAttemptsLeft(newAttemptsLeft);

        if (newAttemptsLeft <= 0) {
          setError("Too many failed attempts. Please request a new code.");
        } else {
          setError(
            data.error ||
              `Invalid code. ${newAttemptsLeft} attempt${
                newAttemptsLeft !== 1 ? "s" : ""
              } remaining.`
          );
        }

        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setLoading(true);
    setError("");
    setCanResend(false);
    setResendCountdown(60);

    try {
      const res = await fetch("/api/auth/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setAttemptsLeft(5);
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        setError(data.error || "Failed to resend code. Please try again.");
        setCanResend(true);
        setResendCountdown(0);
      }
    } catch (err) {
      setError("Failed to resend code. Please try again.");
      setCanResend(true);
      setResendCountdown(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-start px-16 w-full">
          <div className="flex items-center gap-3 mb-16">
            <Image
              src="/logo.jpg"
              alt="NexRate"
              width={48}
              height={48}
              className="rounded-xl"
            />
            <span className="text-3xl font-bold text-white">NexRate</span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Secure Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Account
            </span>
          </h1>

          <div className="flex items-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-cyan-400" />
              <span className="text-xl text-gray-300 font-medium">Faster</span>
            </div>
            <span className="text-gray-600 text-2xl">•</span>
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-cyan-400" />
              <span className="text-xl text-gray-300 font-medium">Smarter</span>
            </div>
            <span className="text-gray-600 text-2xl">•</span>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-cyan-400" />
              <span className="text-xl text-gray-300 font-medium">Safer</span>
            </div>
          </div>

          <p className="text-gray-400 text-lg max-w-md leading-relaxed">
            We've sent a verification code to your email. Enter it below to
            access your account securely.
          </p>

          <div className="absolute top-1/4 right-10 w-20 h-20 border-2 border-cyan-400/30 rounded-lg rotate-12 animate-bounce"></div>
          <div className="absolute bottom-1/3 right-20 w-16 h-16 border-2 border-blue-400/30 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <Image
              src="/logo.jpg"
              alt="NexRate"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <span className="text-2xl font-bold text-gray-900">NexRate</span>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-4">
              <Mail className="w-8 h-8 text-cyan-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-600">We've sent a verification code to</p>
            <p className="text-cyan-500 font-medium mt-1">{email}</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-3 text-center">
              Enter 6-digit code
            </label>
            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={loading || attemptsLeft <= 0}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <input
              type="checkbox"
              id="trustDevice"
              checked={trustDevice}
              onChange={(e) => setTrustDevice(e.target.checked)}
              disabled={loading || attemptsLeft <= 0}
              className="mt-1 w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
            />
            <label
              htmlFor="trustDevice"
              className="text-sm text-gray-600 leading-relaxed"
            >
              Trust this device (You won't need to verify on this device again
              until you log out)
            </label>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm mb-2">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResend}
              disabled={!canResend || loading}
              className="text-cyan-500 hover:text-cyan-600 font-medium text-sm flex items-center justify-center gap-2 mx-auto disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              {canResend ? "Resend Code" : `Resend in ${resendCountdown}s`}
            </button>
          </div>

          {attemptsLeft < 5 && attemptsLeft > 0 && (
            <div className="text-center mb-6">
              <p className="text-sm text-orange-600">
                ⚠️ {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""}{" "}
                remaining
              </p>
            </div>
          )}

          {loading && (
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500">Verifying...</p>
            </div>
          )}

          <div className="text-center">
            <a
              href="/auth/signin"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              ← Back to Sign In
            </a>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              🔒 This code will expire in 5 minutes. For your security, do not
              share this code with anyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyCodePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <VerifyCodeContent />
    </Suspense>
  );
}
