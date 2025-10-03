"use client";
import { motion } from "framer-motion";
import { useState, FormEvent, ChangeEvent } from "react";

type MessageType = "success" | "error" | "info" | "";

interface WaitlistResponse {
  success: boolean;
  error?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

export default function Waitlist() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<MessageType>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      setMessage("Please fill in all fields");
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
        setFormData({ firstName: "", lastName: "", email: "" }); // Clear form
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
      id="contact"
      className="py-20 px-6 md:px-16 bg-[#0B0F19] relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 rounded-3xl p-8 md:p-12 text-center backdrop-blur-xl shadow-2xl"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                🚀 Join the Revolution
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Early Access to NexRate
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Be among the first to experience AI-powered trading, earn NXR
              tokens, and unlock exclusive early adopter benefits.
            </p>
          </motion.div>

          {/* Waitlist Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`
                    w-full px-6 py-4 rounded-xl bg-gray-900/50 backdrop-blur-xl border text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 transition-all
                    disabled:bg-gray-800 disabled:cursor-not-allowed
                    ${
                      messageType === "error" && !formData.firstName
                        ? "border-red-500/50 focus:ring-red-500/50"
                        : "border-gray-700 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                    }
                  `}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`
                    w-full px-6 py-4 rounded-xl bg-gray-900/50 backdrop-blur-xl border text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 transition-all
                    disabled:bg-gray-800 disabled:cursor-not-allowed
                    ${
                      messageType === "error" && !formData.lastName
                        ? "border-red-500/50 focus:ring-red-500/50"
                        : "border-gray-700 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                    }
                  `}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`
                  w-full px-6 py-4 rounded-xl bg-gray-900/50 backdrop-blur-xl border text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 transition-all
                  disabled:bg-gray-800 disabled:cursor-not-allowed
                  ${
                    messageType === "error" && !formData.email
                      ? "border-red-500/50 focus:ring-red-500/50"
                      : "border-gray-700 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                  }
                `}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className={`
                w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
                flex items-center justify-center gap-2
                ${
                  isLoading
                    ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-cyan-500/50"
                }
              `}
            >
              {isLoading ? (
                <>
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
                  Joining Waitlist...
                </>
              ) : (
                <>🚀 Join the Waitlist</>
              )}
            </motion.button>
          </motion.form>

          {/* Message Display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`
                mt-6 p-4 rounded-xl flex items-center justify-center gap-3
                ${
                  messageType === "success"
                    ? "bg-green-500/20 border border-green-500/30"
                    : messageType === "error"
                    ? "bg-red-500/20 border border-red-500/30"
                    : "bg-blue-500/20 border border-blue-500/30"
                }
              `}
            >
              {messageType === "success" && (
                <svg
                  className="h-5 w-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {messageType === "error" && (
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              )}
              {messageType === "info" && (
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <p
                className={`
                text-sm font-medium
                ${
                  messageType === "success"
                    ? "text-green-300"
                    : messageType === "error"
                    ? "text-red-300"
                    : "text-blue-300"
                }
              `}
              >
                {message}
              </p>
            </motion.div>
          )}

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-300"
          >
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">✓</span>
              <span>Early NXR token rewards</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">✓</span>
              <span>Exclusive launch perks</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pink-400">✓</span>
              <span>Priority support access</span>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-6 flex justify-center gap-4"
          >
            <a
              href="https://x.com/nexrate_app"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://t.me/NexRates"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </motion.div>

          <p className="mt-6 text-xs text-gray-500">
            No spam, ever. Only important updates about NexRate. 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
}
