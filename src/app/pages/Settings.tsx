import { useState } from "react";
import { toast } from "sonner";
import { UserAvatar } from "../components/Avatar";

function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="text-[14px] font-medium">{label}</div>
        {hint && <div className="text-[12px] text-[#8B93A7] mt-0.5">{hint}</div>}
      </div>
      <button
        onClick={()=>onChange(!checked)} aria-label={label}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "bg-[#7C3AED]" : "bg-[#2A3142]"}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}

export function Settings() {
  const [name, setName] = useState("Ada Lovelace");
  const [email, setEmail] = useState("ada@northwind.io");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-[22px] font-semibold tracking-tight">Settings</h2>
        <div className="text-[13px] text-[#8B93A7]">Manage your profile, notifications, and workspace.</div>
      </div>

      <section className="glass rounded-2xl p-6">
        <h3 className="text-[15px] font-semibold">Profile</h3>
        <div className="mt-4 flex items-center gap-4">
          <UserAvatar id="u1" size={64} />
          <button className="text-[12px] px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors">Change avatar</button>
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] text-[#8B93A7] block mb-1.5">Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full bg-[#1C2230] border border-white/5 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#7C3AED]" />
          </div>
          <div>
            <label className="text-[12px] text-[#8B93A7] block mb-1.5">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-[#1C2230] border border-white/5 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#7C3AED]" />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button onClick={()=>toast.success("Profile saved")} className="px-4 py-2 rounded-lg text-[13px] font-medium bg-gradient-to-r from-[#7C3AED] to-[#10B981] hover:opacity-90 transition-opacity">Save changes</button>
        </div>
      </section>

      <section className="glass rounded-2xl p-6 divide-y divide-white/5">
        <h3 className="text-[15px] font-semibold pb-3">Notifications</h3>
        <Toggle checked={emailNotif} onChange={setEmailNotif} label="Email notifications" hint="Mentions, assignments, and due-date reminders." />
        <Toggle checked={pushNotif} onChange={setPushNotif} label="Push notifications" hint="Real-time updates in your browser." />
        <Toggle checked={weeklyDigest} onChange={setWeeklyDigest} label="Weekly digest" hint="Sunday-evening summary of activity and upcoming work." />
      </section>

      <section className="rounded-2xl border border-[#F43F5E]/30 bg-[#F43F5E]/[0.04] p-6">
        <h3 className="text-[15px] font-semibold text-[#F43F5E]">Danger zone</h3>
        <p className="text-[13px] text-[#8B93A7] mt-1.5 leading-relaxed">Permanently delete your workspace and all its data. This cannot be undone.</p>
        <button onClick={()=>toast.error("This is irreversible — confirm via email link.")} className="mt-4 px-4 py-2 rounded-lg text-[13px] font-medium bg-[#F43F5E]/10 border border-[#F43F5E]/40 text-[#F43F5E] hover:bg-[#F43F5E]/20 transition-colors">
          Delete workspace
        </button>
      </section>
    </div>
  );
}
