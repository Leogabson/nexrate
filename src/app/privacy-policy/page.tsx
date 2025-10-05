// src/app/privacy-policy/page.tsx

import Link from "next/link";
import { motion } from "framer-motion";

export const metadata = {
  title: "Privacy Policy - NexRate",
  description: "NexRate's privacy policy and data protection practices.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 sticky top-0 bg-[#0B0F19]/95 backdrop-blur-xl z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              NexRate
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-400">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8">
              <p className="text-cyan-400 text-sm mb-2 font-semibold">
                📋 Note: This is a placeholder
              </p>
              <p className="text-gray-300 text-sm">
                This privacy policy is currently in draft form. Please check
                back soon for our complete privacy policy, or contact us if you
                have any questions.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed">
                NexRate ("we," "our," or "us") is committed to protecting your
                privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website and use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Information We Collect
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may collect information about you in a variety of ways,
                including:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    <strong className="text-white">Personal Data:</strong> Name,
                    email address, and contact information you provide when
                    joining our waitlist.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    <strong className="text-white">Usage Data:</strong>{" "}
                    Information about how you access and use our website.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    <strong className="text-white">Device Data:</strong>{" "}
                    Information about your device, including IP address, browser
                    type, and operating system.
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Provide, operate, and maintain our services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    Communicate with you about updates, promotions, and
                    important information
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Improve and personalize your experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Process transactions and manage your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Comply with legal obligations</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational security
                measures to protect your personal information. However, please
                note that no method of transmission over the internet or
                electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Your Rights
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Depending on your location, you may have certain rights
                regarding your personal information, including:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Access to your personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Correction of inaccurate data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Deletion of your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Opt-out of marketing communications</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Third-Party Services
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our website may contain links to third-party websites or
                services. We are not responsible for the privacy practices of
                these third parties. We encourage you to review their privacy
                policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Contact Us
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <p className="text-gray-300 mb-2">
                  <strong className="text-white">Email:</strong>{" "}
                  privacy@nexrate.com
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">Website:</strong>{" "}
                  https://nexrate.vercel.app
                </p>
              </div>
            </section>
          </div>

          {/* Back to Home Button */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6 mt-12">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} NexRate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
