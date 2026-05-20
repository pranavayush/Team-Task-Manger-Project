import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const nav = useNavigate();
  const isSignup = mode === "signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string,string> = {};
    if (isSignup && name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (pw.length < 8) next.pw = "Use at least 8 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      toast.success(isSignup ? "Welcome to Northwind!" : "Welcome back");
      nav("/");
    }, 700);
  };

  return (
    <div className="min-h-screen flex bg-[#0F1117]">
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="w-full max-w-sm"
        >
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#10B981] grid place-items-center shadow-lg shadow-violet-500/20">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="font-semibold tracking-tight">Northwind</div>
          </div>
          <h1 className="text-[26px] font-semibold tracking-tight">{isSignup ? "Create your account" : "Welcome back"}</h1>
          <p className="text-[13px] text-[#8B93A7] mt-1.5">{isSignup ? "Start managing your team's work in seconds." : "Sign in to your workspace."}</p>

          <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
            {isSignup && (
              <div>
                <label className="text-[12px] text-[#8B93A7] block mb-1.5">Full name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)}
                  className={`w-full bg-[#1C2230] border rounded-lg px-3 py-2.5 text-[14px] outline-none transition-colors ${errors.name ? "border-[#F43F5E]" : "border-white/5 focus:border-[#7C3AED]"}`} />
                {errors.name && <div className="text-[12px] text-[#F43F5E] mt-1">{errors.name}</div>}
              </div>
            )}
            <div>
              <label className="text-[12px] text-[#8B93A7] block mb-1.5">Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="email"
                className={`w-full bg-[#1C2230] border rounded-lg px-3 py-2.5 text-[14px] outline-none transition-colors ${errors.email ? "border-[#F43F5E]" : "border-white/5 focus:border-[#7C3AED]"}`} />
              {errors.email && <div className="text-[12px] text-[#F43F5E] mt-1">{errors.email}</div>}
            </div>
            <div>
              <label className="text-[12px] text-[#8B93A7] block mb-1.5">Password</label>
              <div className="relative">
                <input value={pw} onChange={(e)=>setPw(e.target.value)} type={show ? "text" : "password"}
                  className={`w-full bg-[#1C2230] border rounded-lg px-3 py-2.5 pr-10 text-[14px] outline-none transition-colors ${errors.pw ? "border-[#F43F5E]" : "border-white/5 focus:border-[#7C3AED]"}`} />
                <button type="button" onClick={()=>setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#8B93A7] hover:text-white" aria-label="Toggle password visibility">
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.pw && <div className="text-[12px] text-[#F43F5E] mt-1">{errors.pw}</div>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg text-[14px] font-medium bg-gradient-to-r from-[#7C3AED] to-[#10B981] hover:opacity-90 transition-opacity disabled:opacity-60">
              {loading ? "Signing you in…" : isSignup ? "Create account" : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-[13px] text-center text-[#8B93A7]">
            {isSignup ? <>Already have an account? <Link to="/login" className="text-[#A78BFA] hover:underline">Sign in</Link></> : <>New here? <Link to="/signup" className="text-[#A78BFA] hover:underline">Create an account</Link></>}
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 relative overflow-hidden border-l border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_30%_30%,rgba(124,58,237,0.35),transparent_60%),radial-gradient(700px_400px_at_70%_80%,rgba(16,185,129,0.25),transparent_60%)]" />
        <div className="absolute inset-0 grid place-items-center p-12">
          <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{duration:0.5}} className="max-w-md">
            <div className="text-[12px] uppercase tracking-[0.2em] text-[#A78BFA] mb-3">A new way to ship</div>
            <h2 className="text-[34px] font-semibold tracking-tight leading-tight">Plan less. Ship more.</h2>
            <p className="text-[14px] text-[#8B93A7] mt-3 leading-relaxed">Northwind brings projects, tasks, and people into a single, fast, beautiful workspace your team will actually want to open every morning.</p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                ["1.2M","tasks shipped"],
                ["18k","teams"],
                ["99.99%","uptime"],
              ].map(([v,l]) => (
                <div key={l} className="rounded-xl glass p-4">
                  <div className="text-[18px] font-semibold">{v}</div>
                  <div className="text-[11px] text-[#8B93A7] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
