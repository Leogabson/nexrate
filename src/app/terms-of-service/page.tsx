// src/app/terms-of-service/page.tsx

import Link from "next/link";

export const metadata = {
  title: "Terms of Service - NexRate",
  description: "NexRate's terms of service and user agreement.",
};

export default function TermsOfService() {
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
              Terms of Service
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
                These terms of service are currently in draft form. Please check
                back soon for our complete terms, or contact us if you have any
                questions.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using NexRate&apos;s website and services, you
                accept and agree to be bound by the terms and provisions of this
                agreement. If you do not agree to these terms, please do not use
                our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                NexRate provides a platform for:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Cryptocurrency trading and exchange services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Gift card buying, selling, and trading</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>AI-powered arbitrage opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>NXR token rewards and staking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Digital asset management and trading tools</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                3. User Eligibility
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                To use NexRate services, you must:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Be at least 18 years of age</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    Have the legal capacity to enter into binding agreements
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    Not be prohibited from using our services under applicable
                    laws
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    Provide accurate and complete registration information
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Account Registration and Security
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                When you create an account with us:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    You must provide accurate, current, and complete information
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    You are responsible for maintaining the confidentiality of
                    your account credentials
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    You are responsible for all activities that occur under your
                    account
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    You must notify us immediately of any unauthorized use of
                    your account
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Prohibited Activities
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You agree not to engage in any of the following prohibited
                activities:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    Using the service for any illegal or unauthorized purpose
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    Attempting to interfere with, compromise, or disrupt the
                    service
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    Engaging in fraudulent transactions or money laundering
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    Creating multiple accounts to abuse promotions or rewards
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Violating any applicable laws or regulations</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Trading and Fees
              </h2>
              <p className="text-gray-300 leading-relaxed">
                NexRate may charge fees for certain transactions and services.
                All applicable fees will be clearly disclosed before you
                complete a transaction. You agree to pay all fees and charges
                incurred in connection with your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                7. NXR Token Terms
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                The NexRate Token (NXR) is subject to additional terms:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    NXR tokens are utility tokens used within the NexRate
                    ecosystem
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Token value may fluctuate and is not guaranteed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    Staking and rewards are subject to platform rules and
                    availability
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>
                    NXR tokens do not represent ownership or equity in NexRate
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Intellectual Property
              </h2>
              <p className="text-gray-300 leading-relaxed">
                All content, features, and functionality on NexRate, including
                but not limited to text, graphics, logos, and software, are the
                exclusive property of NexRate and are protected by copyright,
                trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-300 leading-relaxed">
                To the maximum extent permitted by law, NexRate shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages, including but not limited to loss of profits,
                data, or other intangible losses resulting from your use of or
                inability to use the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                10. Disclaimer of Warranties
              </h2>
              <p className="text-gray-300 leading-relaxed">
                The service is provided on an &quot;as is&quot; and &quot;as
                available&quot; basis without warranties of any kind, either
                express or implied. NexRate does not warrant that the service
                will be uninterrupted, secure, or error-free.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                11. Termination
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to suspend or terminate your account and
                access to the service at our sole discretion, without notice,
                for conduct that we believe violates these Terms of Service or
                is harmful to other users, us, or third parties, or for any
                other reason.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                12. Changes to Terms
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms of Service at any
                time. We will notify users of any material changes by posting
                the updated terms on our website. Your continued use of the
                service after such changes constitutes acceptance of the new
                terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                13. Governing Law
              </h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms of Service shall be governed by and construed in
                accordance with the laws of the jurisdiction in which NexRate
                operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                14. Contact Information
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <p className="text-gray-300 mb-2">
                  <strong className="text-white">Email:</strong>{" "}
                  legal@nexrate.com
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
