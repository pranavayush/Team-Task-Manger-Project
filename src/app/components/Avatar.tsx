import { memberById } from "../data/mock";

export function UserAvatar({ id, size = 28, ring = false }: { id: string; size?: number; ring?: boolean }) {
  const m = memberById(id);
  return (
    <div
      title={m.name}
      className={`inline-flex items-center justify-center rounded-full text-white select-none ${ring ? "ring-2 ring-[#0F1117]" : ""}`}
      style={{ width: size, height: size, background: `linear-gradient(135deg, ${m.avatarColor}, ${m.avatarColor}99)`, fontSize: size * 0.4, fontWeight: 600 }}
    >
      {m.initials}
    </div>
  );
}

export function AvatarStack({ ids, max = 4, size = 28 }: { ids: string[]; max?: number; size?: number }) {
  const shown = ids.slice(0, max);
  const rest = ids.length - shown.length;
  return (
    <div className="flex -space-x-2">
      {shown.map((id) => <UserAvatar key={id} id={id} size={size} ring />)}
      {rest > 0 && (
        <div
          className="inline-flex items-center justify-center rounded-full bg-[#1C2230] text-[#8B93A7] ring-2 ring-[#0F1117]"
          style={{ width: size, height: size, fontSize: size * 0.38, fontWeight: 600 }}
        >
          +{rest}
        </div>
      )}
    </div>
  );
}
