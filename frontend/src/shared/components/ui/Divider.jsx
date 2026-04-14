export function Divider() {
    return (
      <div className="flex items-center gap-2.5 mb-4.5">
        <div className="flex-1 h-px bg-neutral-border" />
        <span className="text-[10px] text-neutral-muted tracking-widest uppercase">or email</span>
        <div className="flex-1 h-px bg-neutral-border" />
      </div>
    );
  }