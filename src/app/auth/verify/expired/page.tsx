export default function VerifyExpired() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-3xl font-bold text-red-500">⏰ Link Expired</h1>
      <p className="mt-4 text-gray-600">
        Your verification link has expired. Please request a new link to
        continue.
      </p>
      <a
        href="/auth/resend"
        className="mt-6 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
      >
        Resend Verification Email
      </a>
    </div>
  );
}
