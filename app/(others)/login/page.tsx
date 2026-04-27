"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Zap, Mail, Lock } from "lucide-react";
import { FaChrome } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const { login, loginWithGoogle, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill all fields"); return; }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.replace("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("invalid-credential") || msg.includes("wrong-password") || msg.includes("user-not-found")) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Welcome!");
      router.replace("/");
    } catch {
      toast.error("Google sign-in failed");
    } finally {
      setGLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 1.5rem", position: "relative" }}>
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(240,165,0,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Zap size={22} color="#07070d" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>Welcome back</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Sign in to your Nexus account</p>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "36px" }}>
          {/* Google */}
          <button onClick={handleGoogle} disabled={gLoading} style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)",
            background: "var(--surface-2)", color: "var(--text)", cursor: "pointer",
            fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
            transition: "all 0.2s", marginBottom: "24px",
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border-light)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>
            <FaChrome size={18} color="#4285f4" />
            {gLoading ? "Signing in..." : "Continue with Google"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>or with email</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label className="label">Email</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
                <input
                  type="email" className="input" placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={{ paddingLeft: "42px" }} required
                />
              </div>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label className="label">Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
                <input
                  type={showPass ? "text" : "password"} className="input" placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)}
                  style={{ paddingLeft: "42px", paddingRight: "44px" }} required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "0.95rem", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: "20px", color: "var(--text-muted)", fontSize: "0.875rem" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>Create one free</Link>
        </p>
      </div>
    </div>
  );
}
