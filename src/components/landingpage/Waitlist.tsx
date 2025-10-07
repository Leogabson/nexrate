"use client";
import { motion } from "framer-motion";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";

type MessageType = "success" | "error" | "info" | "";

interface WaitlistResponse {
  success: boolean;
  error?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  referralCode: string;
  agreeToUpdates: boolean;
}

interface WaitlistProps {
  waitlistCount?: number;
}

export default function Waitlist({ waitlistCount = 2847 }: WaitlistProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    referralCode: "",
    agreeToUpdates: true,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<MessageType>("");
  const [showReferralField, setShowReferralField] = useState<boolean>(false);
  const [referralLink, setReferralLink] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 0,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      setMessage("Please fill in all required fields");
      setMessageType("error");
      return;
    }

    if (!formData.email.includes("@")) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: WaitlistResponse = await res.json();

      if (data.success === true) {
        setMessage(
          `🎉 Welcome ${formData.firstName}! Check your email for confirmation.`
        );
        setMessageType("success");
        // Generate referral link
        const refLink = `https://nexrate.vercel.app?ref=${
          formData.email.split("@")[0]
        }`;
        setReferralLink(refLink);
      } else if (data.success === false) {
        setMessage(data.error || "This email is already on our waitlist!");
        setMessageType("info");
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Waitlist submission error:", error);
      setMessage("Network error. Please check your connection and try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="py-20 px-6 md:px-16 bg-[#0F172A] relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#06B6D4] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B5CF6] rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {messageType !== "success" ? (
          <>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Don&apos;t Miss Your Chance to Be a Founder Member
              </h2>
              <p className="text-lg text-[#CBD5E1]">
                Join{" "}
                <span className="font-bold text-white">
                  {waitlistCount.toLocaleString()}
                </span>{" "}
                traders already on the waitlist. Lock in exclusive lifetime
                benefits before we launch.
              </p>
            </motion.div>

            {/* Urgency Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              {/* Countdown Timer */}
              <div className="bg-[#1E293B] border-2 border-[#F59E0B] rounded-2xl p-6 mb-4">
                <p className="text-center text-[#F59E0B] font-semibold mb-4">
                  ⚡ Launch Countdown
                </p>
                <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div key={idx} className="text-center">
                      <div className="bg-[#0F172A] rounded-xl py-3 mb-2">
                        <span className="text-2xl md:text-3xl font-bold text-white">
                          {String(item.value).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-xs text-[#64748B] uppercase">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scarcity Badge */}
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 bg-[#EF4444]/10 border border-[#EF4444]/30 px-6 py-3 rounded-full"
                >
                  <span className="text-[#EF4444] font-bold text-sm">
                    🔥 Only {5000 - waitlistCount} spots remaining
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Waitlist Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-[#1E293B] rounded-2xl p-8 border border-[#CBD5E1]/20"
            >
              <div className="space-y-4">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-4 rounded-xl bg-[#0F172A] border-2 border-[#CBD5E1]/20 text-white placeholder-[#64748B] focus:outline-none focus:border-[#06B6D4] transition-colors text-base"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-4 rounded-xl bg-[#0F172A] border-2 border-[#CBD5E1]/20 text-white placeholder-[#64748B] focus:outline-none focus:border-[#06B6D4] transition-colors text-base"
                  />
                </div>

                {/* Email Field */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-4 rounded-xl bg-[#0F172A] border-2 border-[#CBD5E1]/20 text-white placeholder-[#64748B] focus:outline-none focus:border-[#06B6D4] transition-colors text-base"
                />

                {/* Referral Code (Optional, Expandable) */}
                <div>
                  {!showReferralField ? (
                    <button
                      type="button"
                      onClick={() => setShowReferralField(true)}
                      className="text-[#06B6D4] text-sm hover:underline"
                    >
                      + Have a referral code?
                    </button>
                  ) : (
                    <input
                      type="text"
                      name="referralCode"
                      placeholder="Referral Code (Optional)"
                      value={formData.referralCode}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-4 py-4 rounded-xl bg-[#0F172A] border-2 border-[#CBD5E1]/20 text-white placeholder-[#64748B] focus:outline-none focus:border-[#06B6D4] transition-colors text-base"
                    />
                  )}
                </div>

                {/* Agreement Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToUpdates"
                    checked={formData.agreeToUpdates}
                    onChange={handleChange}
                    className="w-5 h-5 mt-0.5 rounded border-2 border-[#CBD5E1]/20 bg-[#0F172A] checked:bg-[#06B6D4] focus:outline-none cursor-pointer"
                  />
                  <span className="text-sm text-[#CBD5E1]">
                    I agree to receive launch updates and exclusive offers
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 rounded-xl font-bold text-lg text-white bg-[#06B6D4] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    "Secure My Early Access"
                  )}
                </button>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-4 text-xs text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <span className="text-[#10B981]">✓</span> No credit card
                    required
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-[#10B981]">✓</span> Unsubscribe
                    anytime
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-[#10B981]">✓</span>
                    <a href="/privacy-policy" className="hover:text-[#06B6D4]">
                      Your data is secure
                    </a>
                  </span>
                </div>
              </div>
            </motion.form>
          </>
        ) : (
          /* Success State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1E293B] rounded-2xl p-12 border-2 border-[#10B981] text-center"
          >
            <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              🎉 You&apos;re on the list!
            </h3>
            <p className="text-lg text-[#CBD5E1] mb-8">
              Check your email for confirmation and get ready to claim your 500
              NXR welcome bonus.
            </p>

            {/* Referral Link */}
            {referralLink && (
              <div className="bg-[#0F172A] rounded-xl p-6 mb-6">
                <p className="text-sm text-[#CBD5E1] mb-3">
                  Share your referral link and earn 10% of your referrals&apos;
                  trades:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 px-4 py-3 bg-[#1E293B] border border-[#CBD5E1]/20 rounded-lg text-white text-sm"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(referralLink);
                      alert("Copied to clipboard!");
                    }}
                    className="px-6 py-3 bg-[#06B6D4] text-white rounded-lg font-semibold hover:bg-[#0EA5E9] transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setMessageType("");
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  referralCode: "",
                  agreeToUpdates: true,
                });
              }}
              className="text-[#06B6D4] hover:underline"
            >
              ← Back to form
            </button>
          </motion.div>
        )}

        {/* Error/Info Message */}
        {message && messageType !== "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
              messageType === "error"
                ? "bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444]"
                : "bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 text-[#0EA5E9]"
            }`}
          >
            <span className="text-xl">
              {messageType === "error" ? "⚠️" : "ℹ️"}
            </span>
            <p className="text-sm">{message}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
