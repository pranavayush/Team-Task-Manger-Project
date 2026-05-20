import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Clock, ListTodo, AlertTriangle } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { activityFeed, memberById, projects, sparkline, tasks, priorityColor, projectById } from "../data/mock";
import { UserAvatar, AvatarStack } from "../components/Avatar";

interface StatProps { label: string; value: string; delta: string; up: boolean; icon: any; color: string; seed: number; }
function StatCard({ label, value, delta, up, icon: Icon, color, seed }: StatProps) {
  const data = sparkline(seed);
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
      className="glass rounded-2xl p-5 relative overflow-hidden"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[12px] text-[#8B93A7] uppercase tracking-wider">{label}</div>
          <div className="mt-2 text-[28px] font-semibold tracking-tight">{value}</div>
          <div className={`mt-1 text-[12px] flex items-center gap-1 ${up ? "text-[#10B981]" : "text-[#F43F5E]"}`}>
            {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {delta} vs last week
          </div>
        </div>
        <div className="w-9 h-9 rounded-lg grid place-items-center" style={{ background: `${color}22`, color }}>
          <Icon size={18} />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-14 opacity-80 pointer-events-none">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`g-${seed}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="y" stroke={color} strokeWidth={2} fill={`url(#g-${seed})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function Dashboard() {
  const todayStr = new Date().toISOString().slice(0,10);
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const dueToday = tasks.filter(t => t.dueDate === todayStr && t.status !== "Done").length;
  const overdue = tasks.filter(t => t.dueDate < todayStr && t.status !== "Done").length;
  const myTasks = tasks.filter(t => t.assigneeId === "u1").slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[13px] text-[#8B93A7]">Welcome back, Ada</div>
        <h2 className="text-[24px] font-semibold tracking-tight mt-1">Here's what's moving today.</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Tasks" value={String(tasks.length * 7)} delta="+12%" up icon={ListTodo} color="#7C3AED" seed={1} />
        <StatCard label="In Progress" value={String(inProgress * 4)} delta="+4%" up icon={Clock} color="#38BDF8" seed={2} />
        <StatCard label="Due Today" value={String(dueToday + 3)} delta="-8%" up={false} icon={CheckCircle2} color="#10B981" seed={3} />
        <StatCard label="Overdue" value={String(overdue + 2)} delta="-2%" up icon={AlertTriangle} color="#F43F5E" seed={4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-semibold">Project progress</h3>
              <div className="text-[12px] text-[#8B93A7]">Across {projects.length} active projects</div>
            </div>
          </div>
          <div className="space-y-4">
            {projects.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-4">
                <div className="w-2 h-10 rounded-full" style={{ background: p.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[14px] font-medium truncate">{p.name}</div>
                    <div className="text-[12px] text-[#8B93A7]">{p.progress}%</div>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.progress}%` }}
                      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}99)` }}
                    />
                  </div>
                </div>
                <AvatarStack ids={p.memberIds} size={24} max={3} />
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h3 className="text-[15px] font-semibold mb-4">Recent activity</h3>
          <div className="space-y-4">
            {activityFeed.map((a) => {
              const m = memberById(a.authorId);
              return (
                <div key={a.id} className="flex gap-3">
                  <UserAvatar id={a.authorId} size={28} />
                  <div className="flex-1 min-w-0 text-[13px] leading-snug">
                    <span className="font-medium">{m.name}</span>{" "}
                    <span className="text-[#8B93A7]">{a.verb}</span>{" "}
                    <span className="text-[#E6E8EE]">{a.target}</span>
                    <div className="text-[11px] text-[#8B93A7] mt-0.5">{a.at}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-semibold">My tasks</h3>
          <a href="/tasks" className="text-[12px] text-[#A78BFA] hover:underline">View all →</a>
        </div>
        <div className="divide-y divide-white/5">
          {myTasks.map((t) => (
            <div key={t.id} className="py-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ background: priorityColor[t.priority] }} />
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium truncate">{t.title}</div>
                <div className="text-[12px] text-[#8B93A7]">{projectById(t.projectId).name} · Due {t.dueDate}</div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-[#8B93A7]">{t.status}</span>
              <UserAvatar id={t.assigneeId} size={26} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
