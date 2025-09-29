export default function VerifySuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-3xl font-bold text-cyan-500">🎉 Account Verified!</h1>
      <p className="mt-4 text-gray-600">
        Your account has been successfully verified. You can now sign in
        securely.
      </p>
      <a
        href="/auth/signin"
        className="mt-6 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
      >
        Proceed to Sign In
      </a>
    </div>
  );
}
