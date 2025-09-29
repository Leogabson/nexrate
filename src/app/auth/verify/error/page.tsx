export default function VerifyError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-3xl font-bold text-red-500">❌ Invalid Link</h1>
      <p className="mt-4 text-gray-600">
        This verification link is invalid or has already been used.
      </p>
      <a
        href="/auth/signin"
        className="mt-6 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
      >
        Back to Sign In
      </a>
    </div>
  );
}
