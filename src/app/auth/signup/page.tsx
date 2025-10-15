"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Eye,
  EyeOff,
  Shield,
  Zap,
  Brain,
  ChevronDown,
  Check,
  LogIn,
} from "lucide-react";
import Image from "next/image";
import Script from "next/script";

declare global {
  interface Window {
    hcaptcha: {
      reset: () => void;
      execute: () => void;
      render: (container: string | HTMLElement, params: any) => void;
    };
  }
}

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    country: "Nigeria",
    referralCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaLoaded, setCaptchaLoaded] = useState(false);

  const countries = [
    { name: "Nigeria", flag: "🇳🇬" },
    { name: "United States", flag: "🇺🇸" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Ghana", flag: "🇬🇭" },
    { name: "Kenya", flag: "🇰🇪" },
    { name: "South Africa", flag: "🇿🇦" },
  ];

  // Listen for hCaptcha events
  useEffect(() => {
    // Define global callback functions
    (window as any).onCaptchaVerify = (token: string) => {
      setCaptchaToken(token);
    };

    (window as any).onCaptchaExpire = () => {
      setCaptchaToken("");
    };

    return () => {
      delete (window as any).onCaptchaVerify;
      delete (window as any).onCaptchaExpire;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }
    if (!captchaToken) {
      setError("Please complete the captcha verification.");
      return;
    }

    setLoading(true);

    try {
      // Verify captcha first
      const captchaRes = await fetch("/api/auth/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });

      if (!captchaRes.ok) {
        setError("Captcha verification failed. Please try again.");
        setLoading(false);
        if (window.hcaptcha) {
          window.hcaptcha.reset();
        }
        setCaptchaToken("");
        return;
      }

      // Proceed with signup
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        // Redirect to verification code page
        router.push(
          `/auth/verify-code?email=${encodeURIComponent(
            form.email
          )}&returnUrl=/dashboard`
        );
      } else {
        setError(
          data.error ||
            (res.status === 500
              ? "Server error. Check database connection."
              : "Signup failed. Try again.")
        );
        if (window.hcaptcha) {
          window.hcaptcha.reset();
        }
        setCaptchaToken("");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      if (window.hcaptcha) {
        window.hcaptcha.reset();
      }
      setCaptchaToken("");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");

    if (!captchaToken) {
      setError("Please complete the captcha verification.");
      return;
    }

    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      // Verify captcha first
      const captchaRes = await fetch("/api/auth/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });

      if (!captchaRes.ok) {
        setError("Captcha verification failed. Please try again.");
        if (window.hcaptcha) {
          window.hcaptcha.reset();
        }
        setCaptchaToken("");
        return;
      }

      // Proceed with Google signup
      signIn("google", {
        callbackUrl: `${window.location.origin}/auth/verify-code`,
      });
    } catch (err) {
      setError("Failed to initiate Google signup.");
      if (window.hcaptcha) {
        window.hcaptcha.reset();
      }
      setCaptchaToken("");
    }
  };

  return (
    <>
      <Script
        src="https://js.hcaptcha.com/1/api.js"
        onLoad={() => setCaptchaLoaded(true)}
        async
        defer
      />
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
              Join the Future of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Trading
              </span>
            </h1>

            <div className="flex items-center gap-6 mb-12">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-cyan-400" />
                <span className="text-xl text-gray-300 font-medium">
                  Faster
                </span>
              </div>
              <span className="text-gray-600 text-2xl">•</span>
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-cyan-400" />
                <span className="text-xl text-gray-300 font-medium">
                  Smarter
                </span>
              </div>
              <span className="text-gray-600 text-2xl">•</span>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-cyan-400" />
                <span className="text-xl text-gray-300 font-medium">Safer</span>
              </div>
            </div>

            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Create your account and unlock advanced trading tools, real-time
              market data, and personalized insights.
            </p>

            <div className="absolute top-1/4 right-10 w-20 h-20 border-2 border-cyan-400/30 rounded-lg rotate-12 animate-bounce"></div>
            <div className="absolute bottom-1/3 right-20 w-16 h-16 border-2 border-blue-400/30 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-gray-900 via-black to-gray-800">
          <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
            <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
              <Image
                src="/logo.jpg"
                alt="NexRate"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <span className="text-2xl font-bold text-white">NexRate</span>
            </div>

            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">New To NexRate?</h2>
              <a
                href="/auth/signin"
                className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
              >
                <LogIn size={18} />
                <span> Log In</span>
              </a>
            </div>

            <div className="flex border-b border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab("email")}
                className={`pb-3 px-1 font-medium transition-colors relative ${
                  activeTab === "email"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Email
                {activeTab === "email" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"></div>
                )}
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Where do you live?
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white flex items-center justify-between bg-gray-800/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {countries.find((c) => c.name === form.country)?.flag}
                    </span>
                    <span>{form.country}</span>
                  </div>
                  <ChevronDown size={20} className="text-gray-400" />
                </button>

                {showCountryDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {countries.map((country) => (
                      <button
                        key={country.name}
                        type="button"
                        onClick={() => {
                          setForm({ ...form, country: country.name });
                          setShowCountryDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-700 flex items-center gap-3 transition-colors"
                      >
                        <span className="text-2xl">{country.flag}</span>
                        <span className="text-white">{country.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div
                className={`mb-4 p-3 border text-sm rounded-lg ${
                  error.includes("Check your email")
                    ? "bg-green-900/20 border-green-600 text-green-400"
                    : "bg-red-900/20 border-red-600 text-red-400"
                }`}
              >
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 bg-gray-800/50"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 pr-12 bg-gray-800/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <button
                  type="button"
                  className="absolute left-0 top-0 text-xs text-gray-400 -mt-5 flex items-center gap-1"
                >
                  Referral Code (Optional)
                  <ChevronDown size={14} />
                </button>
                <input
                  type="text"
                  name="referralCode"
                  placeholder="Referral Code"
                  value={form.referralCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 pr-12 bg-gray-800/50"
                />
                {form.referralCode && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400">
                    <Check size={20} />
                  </div>
                )}
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-cyan-500 border-gray-600 rounded focus:ring-cyan-500 bg-gray-800"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-gray-400 leading-relaxed"
                >
                  By selecting "Create Account", you agree to our{" "}
                  <a
                    href="/terms-of-service"
                    className="text-cyan-400 hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy-policy"
                    className="text-cyan-400 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div className="flex justify-center p-4 border border-gray-600 rounded-lg bg-gray-800/30">
                <div
                  className="h-captcha"
                  data-sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                  data-theme="dark"
                  data-callback="onCaptchaVerify"
                  data-expired-callback="onCaptchaExpire"
                ></div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !captchaToken || !agreeToTerms}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </div>

            <div className="my-6 flex items-center">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="px-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                or sign up with
              </span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleGoogleSignup}
                disabled={!captchaToken || !agreeToTerms}
                className="w-14 h-14 flex items-center justify-center border border-gray-600 rounded-lg hover:bg-gray-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-800/30"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>
            </div>

            <p className="text-gray-400 text-sm text-center mt-6">
              Already have an account?{" "}
              <a href="/auth/signin" className="text-cyan-400 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            function onCaptchaVerify(token) {
              window.dispatchEvent(new CustomEvent('hcaptcha-verify', { detail: token }));
            }
            function onCaptchaExpire() {
              window.dispatchEvent(new CustomEvent('hcaptcha-expire'));
            }
          `,
        }}
      />
    </>
  );
}
