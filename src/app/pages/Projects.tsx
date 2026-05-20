import { useState } from "react";
import { motion } from "motion/react";
import { LayoutGrid, List, Plus, Search } from "lucide-react";
import { projects as seed, type Project } from "../data/mock";
import { AvatarStack } from "../components/Avatar";
import { toast } from "sonner";

const statusBadge: Record<string, string> = {
  "On Track": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "At Risk": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "Delayed": "bg-rose-500/15 text-rose-400 border-rose-500/20",
  "Completed": "bg-violet-500/15 text-violet-400 border-violet-500/20",
};

function ProgressRing({ value, color }: { value: number; color: string }) {
  const r = 18, c = 2 * Math.PI * r;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
      <circle cx="22" cy="22" r={r} stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none" />
      <motion.circle
        cx="22" cy="22" r={r} stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c - (c * value) / 100 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      />
      <text x="22" y="22" textAnchor="middle" dominantBaseline="middle" transform="rotate(90 22 22)" fill="#E6E8EE" fontSize="10" fontWeight="600">{value}%</text>
    </svg>
  );
}

function CreateModal({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (p: Project) => void }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("#7C3AED");
  if (!open) return null;
  const palette = ["#7C3AED","#10B981","#38BDF8","#F59E0B","#F43F5E","#A78BFA"];
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md rounded-2xl glass p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-[17px] font-semibold">New project</h3>
        <p className="text-[12px] text-[#8B93A7] mt-1">Spin up a space for your team to collaborate.</p>
        <div className="mt-5 space-y-4">
          <div>
            <label className="text-[12px] text-[#8B93A7] block mb-1.5">Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="e.g. Q3 Launch"
              className="w-full bg-[#1C2230] border border-white/5 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#7C3AED] transition-colors" />
          </div>
          <div>
            <label className="text-[12px] text-[#8B93A7] block mb-1.5">Description</label>
            <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} rows={3} placeholder="What is this project about?"
              className="w-full bg-[#1C2230] border border-white/5 rounded-lg px-3 py-2.5 text-[14px] outline-none focus:border-[#7C3AED] transition-colors resize-none" />
          </div>
          <div>
            <label className="text-[12px] text-[#8B93A7] block mb-1.5">Color</label>
            <div className="flex gap-2">
              {palette.map(c => (
                <button key={c} onClick={()=>setColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform ${color === c ? "ring-2 ring-white/50 scale-110" : ""}`}
                  style={{ background: c }} aria-label={`Pick ${c}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-[13px] hover:bg-white/5 transition-colors">Cancel</button>
          <button
            onClick={() => {
              if (!name.trim()) { toast.error("Name is required"); return; }
              onCreate({
                id: "p" + Date.now(), name, description: desc, color, status: "On Track", progress: 0, taskCount: 0,
                memberIds: ["u1"], dueDate: new Date(Date.now()+30*86400000).toISOString().slice(0,10),
              });
              toast.success("Project created");
              onClose();
            }}
            className="px-4 py-2 rounded-lg text-[13px] font-medium bg-gradient-to-r from-[#7C3AED] to-[#10B981] hover:opacity-90 transition-opacity"
          >
            Create project
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [items, setItems] = useState(seed);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = items.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="flex-1">
          <h2 className="text-[22px] font-semibold tracking-tight">All projects</h2>
          <div className="text-[13px] text-[#8B93A7]">{items.length} projects · {items.reduce((s,p)=>s+p.taskCount,0)} tasks</div>
        </div>
        <div className="flex items-center gap-2 px-3 h-10 rounded-lg bg-[#1C2230] border border-white/5 w-full md:w-72">
          <Search size={14} className="text-[#8B93A7]" />
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search projects…" className="flex-1 bg-transparent outline-none text-[13px]" />
        </div>
        <div className="flex items-center bg-[#1C2230] border border-white/5 rounded-lg p-0.5">
          <button onClick={()=>setView("grid")} className={`p-1.5 rounded-md transition-colors ${view==="grid" ? "bg-white/10 text-white" : "text-[#8B93A7]"}`} aria-label="Grid view"><LayoutGrid size={16} /></button>
          <button onClick={()=>setView("list")} className={`p-1.5 rounded-md transition-colors ${view==="list" ? "bg-white/10 text-white" : "text-[#8B93A7]"}`} aria-label="List view"><List size={16} /></button>
        </div>
        <button onClick={()=>setOpen(true)} className="h-10 px-4 rounded-lg text-[13px] font-medium bg-gradient-to-r from-[#7C3AED] to-[#10B981] hover:opacity-90 transition-opacity flex items-center gap-1.5">
          <Plus size={15} /> New project
        </button>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.03 }}
              whileHover={{ y: -3 }}
              className="glass rounded-2xl p-5 cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: `${p.color}22`, color: p.color }}>
                    <div className="w-3.5 h-3.5 rounded-md" style={{ background: p.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[15px] truncate">{p.name}</div>
                    <div className="text-[12px] text-[#8B93A7]">{p.taskCount} tasks</div>
                  </div>
                </div>
                <ProgressRing value={p.progress} color={p.color} />
              </div>
              <p className="mt-4 text-[13px] text-[#8B93A7] line-clamp-2 leading-relaxed">{p.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className={`text-[11px] px-2 py-1 rounded-full border ${statusBadge[p.status]}`}>{p.status}</span>
                <AvatarStack ids={p.memberIds} size={26} />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="text-[11px] uppercase tracking-wider text-[#8B93A7] bg-white/[0.02]">
              <tr>
                <th className="text-left px-5 py-3">Project</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Progress</th>
                <th className="text-left px-5 py-3">Members</th>
                <th className="text-left px-5 py-3">Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-8 rounded-full" style={{ background: p.color }} />
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-[12px] text-[#8B93A7]">{p.taskCount} tasks</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className={`text-[11px] px-2 py-1 rounded-full border ${statusBadge[p.status]}`}>{p.status}</span></td>
                  <td className="px-5 py-3.5 w-48">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: p.color }} />
                      </div>
                      <span className="text-[12px] text-[#8B93A7] w-9 text-right">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><AvatarStack ids={p.memberIds} size={24} /></td>
                  <td className="px-5 py-3.5 text-[#8B93A7]">{p.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CreateModal open={open} onClose={()=>setOpen(false)} onCreate={(p)=>setItems([p, ...items])} />
    </div>
  );
}
