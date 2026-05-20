import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MoreVertical, Plus, Shield, Trash2 } from "lucide-react";
import { members as seed, type Member, type Role } from "../data/mock";
import { UserAvatar } from "../components/Avatar";
import { toast } from "sonner";

function Confirm({ open, title, body, danger, onCancel, onConfirm }: {
  open: boolean; title: string; body: string; danger?: boolean; onCancel: () => void; onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4" onClick={onCancel}>
      <motion.div initial={{scale:0.96,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.18}}
        className="w-full max-w-sm rounded-2xl glass p-6" onClick={(e)=>e.stopPropagation()}>
        <h3 className="text-[16px] font-semibold">{title}</h3>
        <p className="text-[13px] text-[#8B93A7] mt-1.5 leading-relaxed">{body}</p>
        <div className="mt-5 flex gap-2 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg text-[13px] hover:bg-white/5 transition-colors">Cancel</button>
          <button onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-opacity hover:opacity-90 ${danger ? "bg-[#F43F5E] text-white" : "bg-gradient-to-r from-[#7C3AED] to-[#10B981]"}`}>
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Team() {
  const [items, setItems] = useState(seed);
  const [invite, setInvite] = useState("");
  const [confirm, setConfirm] = useState<{ kind: "role" | "remove"; member: Member; newRole?: Role } | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <h2 className="text-[22px] font-semibold tracking-tight">Team members</h2>
          <div className="text-[13px] text-[#8B93A7]">{items.length} people · {items.filter(m=>m.role==="Admin").length} admins</div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2 px-3 h-10 rounded-lg bg-[#1C2230] border border-white/5 flex-1 md:w-72">
            <Mail size={14} className="text-[#8B93A7]" />
            <input value={invite} onChange={(e)=>setInvite(e.target.value)} placeholder="teammate@company.com" className="flex-1 bg-transparent outline-none text-[13px]" />
          </div>
          <button
            onClick={()=>{ if (!invite.includes("@")) { toast.error("Enter a valid email"); return; } toast.success(`Invite sent to ${invite}`); setInvite(""); }}
            className="h-10 px-4 rounded-lg text-[13px] font-medium bg-gradient-to-r from-[#7C3AED] to-[#10B981] hover:opacity-90 transition-opacity flex items-center gap-1.5">
            <Plus size={15} /> Invite
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{duration:0.22, delay: i*0.03}}
            whileHover={{y:-2}}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <UserAvatar id={m.id} size={48} />
                <div>
                  <div className="font-semibold text-[15px]">{m.name}</div>
                  <div className="text-[12px] text-[#8B93A7]">{m.email}</div>
                </div>
              </div>
              <details className="relative">
                <summary className="list-none cursor-pointer p-1.5 rounded-md hover:bg-white/5 text-[#8B93A7]"><MoreVertical size={16} /></summary>
                <div className="absolute right-0 top-9 z-10 w-44 rounded-xl bg-[#1C2230] border border-white/10 p-1 shadow-2xl">
                  <button onClick={()=>setConfirm({ kind: "role", member: m, newRole: m.role === "Admin" ? "Member" : "Admin" })}
                    className="w-full text-left px-3 py-2 rounded-md text-[13px] hover:bg-white/5 flex items-center gap-2">
                    <Shield size={13} /> Make {m.role === "Admin" ? "Member" : "Admin"}
                  </button>
                  <button onClick={()=>setConfirm({ kind: "remove", member: m })}
                    className="w-full text-left px-3 py-2 rounded-md text-[13px] hover:bg-white/5 text-[#F43F5E] flex items-center gap-2">
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </details>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`text-[11px] px-2 py-1 rounded-full border ${m.role === "Admin" ? "bg-violet-500/15 text-violet-400 border-violet-500/20" : "bg-white/5 text-[#8B93A7] border-white/10"}`}>
                {m.role}
              </span>
              <span className="text-[12px] text-[#8B93A7]">{m.taskCount} tasks</span>
            </div>
          </motion.div>
        ))}
      </div>

      <Confirm
        open={!!confirm}
        title={confirm?.kind === "remove" ? "Remove member?" : "Change role?"}
        body={confirm?.kind === "remove"
          ? `${confirm.member.name} will lose access to this workspace immediately. This can be undone by re-inviting them.`
          : `${confirm?.member.name} will become a ${confirm?.newRole}. Their permissions will update right away.`}
        danger={confirm?.kind === "remove"}
        onCancel={()=>setConfirm(null)}
        onConfirm={()=>{
          if (!confirm) return;
          if (confirm.kind === "remove") {
            setItems(items.filter(m => m.id !== confirm.member.id));
            toast.success(`${confirm.member.name} removed`);
          } else {
            setItems(items.map(m => m.id === confirm.member.id ? { ...m, role: confirm.newRole! } : m));
            toast.success(`${confirm.member.name} is now ${confirm.newRole}`);
          }
          setConfirm(null);
        }}
      />
    </div>
  );
}
