import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { authService } from "../../services/authService";

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"VERIFYING" | "SUCCESS" | "ERROR">("VERIFYING");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("ERROR");
      setErrorMsg("Verification token missing from URL query parameter.");
      return;
    }

    const verify = async () => {
      try {
        await authService.verifyEmail({ token });
        setStatus("SUCCESS");
      } catch (err: any) {
        setStatus("ERROR");
        setErrorMsg(err.message || "Invalid or expired verification token.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080A0F] p-4 text-white font-sans">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl text-center">
        {status === "VERIFYING" && (
          <div className="space-y-4">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-xl font-bold">Verifying Your Email...</h2>
          </div>
        )}

        {status === "SUCCESS" && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto">✓</div>
            <h2 className="text-2xl font-bold text-white">Email Verified!</h2>
            <p className="text-sm text-slate-400">Your SmartBank AI vault is now active.</p>
            <Link to="/login" className="inline-block mt-4 py-3 px-6 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl">
              Proceed to Sign In
            </Link>
          </div>
        )}

        {status === "ERROR" && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-3xl mx-auto">✕</div>
            <h2 className="text-2xl font-bold text-white">Verification Failed</h2>
            <p className="text-sm text-red-400">{errorMsg}</p>
            <Link to="/login" className="inline-block mt-4 py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl">
              Return to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
