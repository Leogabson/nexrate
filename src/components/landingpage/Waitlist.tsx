"use client";
import { motion } from "framer-motion";
import { useState, JSX, FormEvent, ChangeEvent, KeyboardEvent } from "react";

// Define types for the component
type MessageType = "success" | "error" | "info" | "";

interface WaitlistResponse {
  success: boolean;
  error?: string;
}

export default function Waitlist(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<MessageType>("");

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement | HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address");
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
        body: JSON.stringify({ email }),
      });

      const data: WaitlistResponse = await res.json();

      if (data.success === true) {
        setMessage(
          "🎉 Successfully joined the waitlist! Check your email for confirmation."
        );
        setMessageType("success");
        setEmail(""); // Clear the input
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

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSubmit(e as any);
    }
  };

  return (
    <section id="contact" className="py-16 px-6 md:px-16">
      <div className="bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl p-10 text-center text-white max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold">Start Trading with NexRate Today</h3>
        <p className="mt-2 opacity-90">
          Join our early waitlist and be among the first to access smarter
          crypto & gift card tools.
        </p>

        {/* Waitlist Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            disabled={isLoading}
            onKeyDown={handleKeyDown}
            className={`
              flex-1 px-4 py-3 rounded-lg text-black w-full sm:w-auto
              disabled:bg-gray-100 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-white/50
              ${messageType === "error" ? "ring-2 ring-red-300" : ""}
            `}
          />
          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className={`
              font-semibold px-6 py-3 rounded-lg transition-all duration-200
              flex items-center justify-center min-w-[140px]
              disabled:cursor-not-allowed
              ${
                isLoading
                  ? "bg-gray-600 text-gray-300"
                  : "bg-black text-white hover:bg-gray-900"
              }
            `}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
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
              </>
            ) : (
              "Join Waitlist"
            )}
          </button>
        </form>

        {/* Inline Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`
              mt-4 p-4 rounded-lg flex items-center justify-center space-x-2
              ${
                messageType === "success"
                  ? "bg-green-500/20 border border-green-300/30"
                  : messageType === "error"
                  ? "bg-red-500/20 border border-red-300/30"
                  : "bg-blue-500/20 border border-blue-300/30"
              }
            `}
          >
            {messageType === "success" && (
              <svg
                className="h-5 w-5 text-green-200"
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
                className="h-5 w-5 text-red-200"
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
                className="h-5 w-5 text-blue-200"
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
                  ? "text-green-100"
                  : messageType === "error"
                  ? "text-red-100"
                  : "text-blue-100"
              }
            `}
            >
              {message}
            </p>
          </motion.div>
        )}

        <p className="mt-4 text-sm opacity-90">
          No spam. Only important updates about NexRate 🚀
        </p>

        {/* Social Links */}
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="https://x.com/Nexrate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <span className="sr-only">Follow us on X</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://t.me/NexRates"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <span className="sr-only">Join our Telegram</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
