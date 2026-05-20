export type Role = "Admin" | "Member";
export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Status = "Todo" | "In Progress" | "Review" | "Done";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarColor: string;
  initials: string;
  taskCount: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  status: "On Track" | "At Risk" | "Delayed" | "Completed";
  progress: number;
  taskCount: number;
  memberIds: string[];
  dueDate: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  comments: { id: string; authorId: string; text: string; at: string }[];
  activity: { id: string; text: string; at: string }[];
}

export interface Activity {
  id: string;
  authorId: string;
  verb: string;
  target: string;
  at: string;
}

export const members: Member[] = [
  { id: "u1", name: "Ada Lovelace", email: "ada@northwind.io", role: "Admin", avatarColor: "#7C3AED", initials: "AL", taskCount: 12 },
  { id: "u2", name: "Linus Park", email: "linus@northwind.io", role: "Member", avatarColor: "#10B981", initials: "LP", taskCount: 8 },
  { id: "u3", name: "Mei Tanaka", email: "mei@northwind.io", role: "Member", avatarColor: "#38BDF8", initials: "MT", taskCount: 14 },
  { id: "u4", name: "Jordan Reyes", email: "jordan@northwind.io", role: "Member", avatarColor: "#F59E0B", initials: "JR", taskCount: 5 },
  { id: "u5", name: "Sasha Kim", email: "sasha@northwind.io", role: "Admin", avatarColor: "#F43F5E", initials: "SK", taskCount: 9 },
  { id: "u6", name: "Noor Ahmed", email: "noor@northwind.io", role: "Member", avatarColor: "#A78BFA", initials: "NA", taskCount: 11 },
];

export const projects: Project[] = [
  { id: "p1", name: "Atlas Mobile 2.0", description: "Rebuild the customer-facing mobile app with React Native.", color: "#7C3AED", status: "On Track", progress: 68, taskCount: 42, memberIds: ["u1","u2","u3","u6"], dueDate: "2026-07-12" },
  { id: "p2", name: "Billing Migration", description: "Move legacy billing from Stripe to internal ledger.", color: "#10B981", status: "At Risk", progress: 41, taskCount: 28, memberIds: ["u1","u4","u5"], dueDate: "2026-06-30" },
  { id: "p3", name: "Marketing Site Redesign", description: "Refresh public marketing site for the Q3 launch.", color: "#38BDF8", status: "On Track", progress: 82, taskCount: 19, memberIds: ["u3","u4","u6"], dueDate: "2026-06-01" },
  { id: "p4", name: "AI Insights Beta", description: "Ship internal beta of AI-powered project insights.", color: "#F59E0B", status: "Delayed", progress: 22, taskCount: 35, memberIds: ["u1","u2","u5","u6"], dueDate: "2026-08-20" },
  { id: "p5", name: "SOC2 Compliance", description: "Complete annual SOC2 Type II audit prep.", color: "#F43F5E", status: "On Track", progress: 55, taskCount: 24, memberIds: ["u1","u5"], dueDate: "2026-07-01" },
  { id: "p6", name: "Onboarding Flow v3", description: "Redesigned product onboarding with checklist.", color: "#A78BFA", status: "Completed", progress: 100, taskCount: 18, memberIds: ["u2","u3"], dueDate: "2026-05-10" },
];

const today = new Date();
const offset = (d: number) => {
  const x = new Date(today); x.setDate(x.getDate() + d); return x.toISOString().slice(0,10);
};

export const tasks: Task[] = [
  { id: "t1", title: "Design auth flow wireframes", description: "Cover signup, login, magic link, and recovery.", projectId: "p1", assigneeId: "u3", priority: "High", status: "In Progress", dueDate: offset(0), comments: [{id:"c1",authorId:"u1",text:"Looks great — let's add a passkey option.",at:"2h ago"}], activity: [{id:"a1",text:"Mei moved this to In Progress",at:"yesterday"}] },
  { id: "t2", title: "Stripe webhook → ledger adapter", description: "Translate webhook events into internal ledger entries.", projectId: "p2", assigneeId: "u2", priority: "Urgent", status: "Todo", dueDate: offset(-1), comments: [], activity: [] },
  { id: "t3", title: "Hero section copy + visual", description: "Land the new positioning above the fold.", projectId: "p3", assigneeId: "u4", priority: "Medium", status: "Review", dueDate: offset(2), comments: [], activity: [] },
  { id: "t4", title: "Train baseline insights model", description: "Use Q1 data; report on accuracy across cohorts.", projectId: "p4", assigneeId: "u5", priority: "High", status: "In Progress", dueDate: offset(5), comments: [], activity: [] },
  { id: "t5", title: "Pen test scoping doc", description: "Finalize scope with the external assessor.", projectId: "p5", assigneeId: "u1", priority: "Medium", status: "Done", dueDate: offset(-3), comments: [], activity: [] },
  { id: "t6", title: "Onboarding checklist a11y pass", description: "Audit keyboard nav and screen reader labels.", projectId: "p6", assigneeId: "u3", priority: "Low", status: "Done", dueDate: offset(-7), comments: [], activity: [] },
  { id: "t7", title: "Push notifications service", description: "FCM + APNS abstraction with retry/backoff.", projectId: "p1", assigneeId: "u6", priority: "High", status: "Todo", dueDate: offset(7), comments: [], activity: [] },
  { id: "t8", title: "Refactor invoice PDF renderer", description: "Replace headless chrome with a server-side renderer.", projectId: "p2", assigneeId: "u4", priority: "Medium", status: "In Progress", dueDate: offset(0), comments: [], activity: [] },
  { id: "t9", title: "Pricing page A/B test", description: "Run a two-week test on annual-first pricing.", projectId: "p3", assigneeId: "u6", priority: "Medium", status: "Todo", dueDate: offset(10), comments: [], activity: [] },
  { id: "t10", title: "Insight cards in dashboard", description: "Render top-3 insights with confidence scores.", projectId: "p4", assigneeId: "u2", priority: "High", status: "Review", dueDate: offset(3), comments: [], activity: [] },
  { id: "t11", title: "Quarterly access review", description: "Confirm least-privilege across prod systems.", projectId: "p5", assigneeId: "u5", priority: "High", status: "In Progress", dueDate: offset(1), comments: [], activity: [] },
  { id: "t12", title: "Empty state illustrations", description: "Set of six on-brand SVGs for empty states.", projectId: "p3", assigneeId: "u3", priority: "Low", status: "Done", dueDate: offset(-2), comments: [], activity: [] },
  { id: "t13", title: "Crash analytics integration", description: "Wire Sentry into the mobile build pipeline.", projectId: "p1", assigneeId: "u2", priority: "Urgent", status: "In Progress", dueDate: offset(-1), comments: [], activity: [] },
  { id: "t14", title: "Cohort export CSV", description: "Admins should export filtered cohorts.", projectId: "p4", assigneeId: "u6", priority: "Medium", status: "Todo", dueDate: offset(6), comments: [], activity: [] },
  { id: "t15", title: "Founder note + changelog", description: "Polish the v3 launch changelog.", projectId: "p6", assigneeId: "u1", priority: "Low", status: "Done", dueDate: offset(-5), comments: [], activity: [] },
];

export const activityFeed: Activity[] = [
  { id: "f1", authorId: "u3", verb: "moved", target: "Design auth flow wireframes → In Progress", at: "12m ago" },
  { id: "f2", authorId: "u2", verb: "commented on", target: "Stripe webhook → ledger adapter", at: "38m ago" },
  { id: "f3", authorId: "u5", verb: "completed", target: "Pen test scoping doc", at: "1h ago" },
  { id: "f4", authorId: "u1", verb: "created project", target: "AI Insights Beta", at: "3h ago" },
  { id: "f5", authorId: "u6", verb: "assigned", target: "Cohort export CSV to themselves", at: "5h ago" },
  { id: "f6", authorId: "u4", verb: "uploaded", target: "Hero hero-v2.png to Marketing Redesign", at: "yesterday" },
];

export const sparkline = (seed: number) =>
  Array.from({ length: 12 }, (_, i) => ({
    x: i,
    y: Math.max(2, Math.round(20 + Math.sin(i * 0.7 + seed) * 8 + (i % 3) * 3 + seed)),
  }));

export const priorityColor: Record<Priority, string> = {
  Low: "#38BDF8",
  Medium: "#A78BFA",
  High: "#F59E0B",
  Urgent: "#F43F5E",
};

export const statusColor: Record<Status, string> = {
  Todo: "#8B93A7",
  "In Progress": "#7C3AED",
  Review: "#F59E0B",
  Done: "#10B981",
};

export const memberById = (id: string) => members.find(m => m.id === id)!;
export const projectById = (id: string) => projects.find(p => p.id === id)!;
