import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Filter, KanbanSquare, List, Plus, X, CalendarDays, MessageSquare } from "lucide-react";
import { tasks as seedTasks, projects, members, memberById, projectById, priorityColor, statusColor, type Task, type Status } from "../data/mock";
import { UserAvatar } from "../components/Avatar";
import { toast } from "sonner";

const columns: Status[] = ["Todo", "In Progress", "Review", "Done"];

function TaskCard({ task, onOpen, onDragStart }: { task: Task; onOpen: () => void; onDragStart: (e: React.DragEvent) => void }) {
  const p = projectById(task.projectId);
  return (
    <motion.div
      layout
      draggable
      onDragStart={onDragStart}
      onClick={onOpen}
      whileHover={{ y: -2 }}
      className="rounded-xl bg-[#161A23] border border-white/5 p-3.5 cursor-pointer hover:border-white/10 transition-colors group"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] px-1.5 py-0.5 rounded-md font-medium" style={{ background: `${priorityColor[task.priority]}22`, color: priorityColor[task.priority] }}>
          {task.priority}
        </span>
        <span className="text-[11px] text-[#8B93A7]">{task.dueDate.slice(5)}</span>
      </div>
      <div className="mt-2 text-[14px] font-medium leading-snug">{task.title}</div>
      <div className="mt-1 text-[12px] text-[#8B93A7] line-clamp-2">{task.description}</div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-[#8B93A7]">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="truncate max-w-[120px]">{p.name}</span>
        </div>
        <UserAvatar id={task.assigneeId} size={22} />
      </div>
    </motion.div>
  );
}

function DetailPanel({ task, onClose, onChange }: { task: Task | null; onClose: () => void; onChange: (t: Task) => void }) {
  return (
    <AnimatePresence>
      {task && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[460px] bg-[#0F1117] border-l border-white/5 shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="text-[11px] px-2 py-1 rounded-md font-medium" style={{ background: `${priorityColor[task.priority]}22`, color: priorityColor[task.priority] }}>
                  {task.priority} priority
                </span>
                <button onClick={onClose} className="p-1.5 rounded-md hover:bg-white/5" aria-label="Close"><X size={16} /></button>
              </div>
              <h2 className="text-[20px] font-semibold leading-tight">{task.title}</h2>
              <p className="mt-2 text-[13px] text-[#8B93A7] leading-relaxed">{task.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-4 text-[13px]">
                <div>
                  <div className="text-[11px] text-[#8B93A7] uppercase tracking-wider mb-1.5">Assignee</div>
                  <div className="flex items-center gap-2"><UserAvatar id={task.assigneeId} size={24} /><span>{memberById(task.assigneeId).name}</span></div>
                </div>
                <div>
                  <div className="text-[11px] text-[#8B93A7] uppercase tracking-wider mb-1.5">Project</div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: projectById(task.projectId).color }} />
                    <span>{projectById(task.projectId).name}</span>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#8B93A7] uppercase tracking-wider mb-1.5">Due date</div>
                  <div className="flex items-center gap-2"><CalendarDays size={14} className="text-[#8B93A7]" />{task.dueDate}</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#8B93A7] uppercase tracking-wider mb-1.5">Status</div>
                  <select
                    value={task.status}
                    onChange={(e)=>onChange({...task, status: e.target.value as Status})}
                    className="bg-[#1C2230] border border-white/5 rounded-md px-2 py-1 text-[13px] outline-none"
                  >
                    {columns.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-7">
                <h3 className="text-[13px] font-semibold mb-3 flex items-center gap-2"><MessageSquare size={14} /> Comments</h3>
                <div className="space-y-3">
                  {task.comments.length === 0 && <div className="text-[12px] text-[#8B93A7]">No comments yet.</div>}
                  {task.comments.map(c => (
                    <div key={c.id} className="flex gap-2.5">
                      <UserAvatar id={c.authorId} size={26} />
                      <div className="flex-1 rounded-lg bg-[#1C2230] p-3">
                        <div className="text-[12px] font-medium">{memberById(c.authorId).name} <span className="text-[#8B93A7] font-normal ml-2">{c.at}</span></div>
                        <div className="text-[13px] mt-1">{c.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <input placeholder="Write a comment…" className="flex-1 bg-[#1C2230] border border-white/5 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#7C3AED]" />
                  <button className="px-3 rounded-lg text-[12px] bg-[#7C3AED] hover:opacity-90 transition-opacity">Send</button>
                </div>
              </div>

              <div className="mt-7">
                <h3 className="text-[13px] font-semibold mb-3">Activity</h3>
                <div className="space-y-2 text-[12px] text-[#8B93A7]">
                  {task.activity.length === 0 ? <div>No activity yet.</div> : task.activity.map(a => <div key={a.id}>· {a.text} — {a.at}</div>)}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function Tasks() {
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [list, setList] = useState<Task[]>(seedTasks);
  const [active, setActive] = useState<Task | null>(null);
  const [filterProject, setFilterProject] = useState<string>("");
  const [filterAssignee, setFilterAssignee] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");

  const filtered = useMemo(() => list.filter(t =>
    (!filterProject || t.projectId === filterProject) &&
    (!filterAssignee || t.assigneeId === filterAssignee) &&
    (!filterPriority || t.priority === filterPriority)
  ), [list, filterProject, filterAssignee, filterPriority]);

  const byStatus = (s: Status) => filtered.filter(t => t.status === s);

  const onDrop = (e: React.DragEvent, status: Status) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    setList(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    toast.success(`Moved to ${status}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <h2 className="text-[22px] font-semibold tracking-tight">Tasks</h2>
          <div className="text-[13px] text-[#8B93A7]">{filtered.length} of {list.length} tasks</div>
        </div>
        <div className="flex items-center bg-[#1C2230] border border-white/5 rounded-lg p-0.5">
          <button onClick={()=>setView("kanban")} className={`p-1.5 rounded-md transition-colors ${view==="kanban" ? "bg-white/10 text-white" : "text-[#8B93A7]"}`} aria-label="Kanban view"><KanbanSquare size={16} /></button>
          <button onClick={()=>setView("list")} className={`p-1.5 rounded-md transition-colors ${view==="list" ? "bg-white/10 text-white" : "text-[#8B93A7]"}`} aria-label="List view"><List size={16} /></button>
        </div>
        <button className="h-10 px-4 rounded-lg text-[13px] font-medium bg-gradient-to-r from-[#7C3AED] to-[#10B981] hover:opacity-90 transition-opacity flex items-center gap-1.5" onClick={()=>toast("Coming soon — wire up Supabase to persist tasks.")}>
          <Plus size={15} /> New task
        </button>
      </div>

      <div className="glass rounded-xl p-3 flex flex-wrap items-center gap-2 text-[13px]">
        <div className="flex items-center gap-1.5 text-[#8B93A7] pl-1"><Filter size={13} /> Filters</div>
        <select value={filterProject} onChange={(e)=>setFilterProject(e.target.value)} className="bg-[#1C2230] border border-white/5 rounded-md px-2.5 py-1.5 outline-none">
          <option value="">All projects</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={filterAssignee} onChange={(e)=>setFilterAssignee(e.target.value)} className="bg-[#1C2230] border border-white/5 rounded-md px-2.5 py-1.5 outline-none">
          <option value="">All assignees</option>
          {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <select value={filterPriority} onChange={(e)=>setFilterPriority(e.target.value)} className="bg-[#1C2230] border border-white/5 rounded-md px-2.5 py-1.5 outline-none">
          <option value="">Any priority</option>
          {["Low","Medium","High","Urgent"].map(p => <option key={p}>{p}</option>)}
        </select>
        {(filterProject || filterAssignee || filterPriority) && (
          <button onClick={()=>{setFilterProject("");setFilterAssignee("");setFilterPriority("");}} className="text-[12px] text-[#A78BFA] hover:underline ml-auto">Clear all</button>
        )}
      </div>

      {view === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {columns.map(col => (
            <div
              key={col}
              onDragOver={(e)=>e.preventDefault()}
              onDrop={(e)=>onDrop(e, col)}
              className="rounded-2xl bg-white/[0.02] border border-white/5 p-3 min-h-[400px]"
            >
              <div className="flex items-center justify-between px-1 mb-3">
                <div className="flex items-center gap-2 text-[13px] font-semibold">
                  <span className="w-2 h-2 rounded-full" style={{ background: statusColor[col] }} />
                  {col}
                  <span className="text-[11px] text-[#8B93A7] font-normal">{byStatus(col).length}</span>
                </div>
                <button className="text-[#8B93A7] hover:text-white p-1 rounded-md hover:bg-white/5" aria-label="Add to column"><Plus size={14} /></button>
              </div>
              <div className="space-y-2.5">
                {byStatus(col).map(t => (
                  <TaskCard key={t.id} task={t} onOpen={()=>setActive(t)} onDragStart={(e)=>e.dataTransfer.setData("text/plain", t.id)} />
                ))}
                {byStatus(col).length === 0 && (
                  <div className="text-center py-10 text-[12px] text-[#8B93A7]">Drop tasks here</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="text-[11px] uppercase tracking-wider text-[#8B93A7] bg-white/[0.02]">
              <tr>
                <th className="text-left px-5 py-3">Task</th>
                <th className="text-left px-5 py-3">Project</th>
                <th className="text-left px-5 py-3">Assignee</th>
                <th className="text-left px-5 py-3">Priority</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(t => (
                <tr key={t.id} onClick={()=>setActive(t)} className="hover:bg-white/[0.02] cursor-pointer transition-colors">
                  <td className="px-5 py-3.5 font-medium">{t.title}</td>
                  <td className="px-5 py-3.5"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{background: projectById(t.projectId).color}} />{projectById(t.projectId).name}</span></td>
                  <td className="px-5 py-3.5"><span className="flex items-center gap-2"><UserAvatar id={t.assigneeId} size={22} />{memberById(t.assigneeId).name}</span></td>
                  <td className="px-5 py-3.5"><span className="text-[11px] px-2 py-0.5 rounded-md" style={{background: `${priorityColor[t.priority]}22`, color: priorityColor[t.priority]}}>{t.priority}</span></td>
                  <td className="px-5 py-3.5"><span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-[#8B93A7]">{t.status}</span></td>
                  <td className="px-5 py-3.5 text-[#8B93A7]">{t.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DetailPanel task={active} onClose={()=>setActive(null)} onChange={(updated)=>{
        setList(prev => prev.map(t => t.id === updated.id ? updated : t));
        setActive(updated);
      }} />
    </div>
  );
}
