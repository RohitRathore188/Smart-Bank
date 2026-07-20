import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../services/authService";

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMsg(null);
    setIsSubmitting(true);

    try {
      const res = await authService.forgotPassword({ email });
      setMsg(res.message);
    } catch (err: any) {
      setError(err.message || "Failed to process request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080A0F] p-4 text-white font-sans relative">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-2 text-center">Reset Password</h1>
        <p className="text-xs text-slate-400 mb-6 text-center">Enter your registered email to receive a password reset token</p>

        {msg && <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">{msg}</div>}
        {error && <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm outline-none"
              placeholder="name@company.com"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl"
          >
            {isSubmitting ? "Sending..." : "Send Reset Token"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Remember your password? <Link to="/login" className="text-cyan-400 font-semibold">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
};
