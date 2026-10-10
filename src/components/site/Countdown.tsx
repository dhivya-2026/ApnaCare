import { useEffect, useState } from "react";

export function Countdown({ endsAt }: { endsAt: string }) {
  const end = new Date(endsAt).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = now === null ? 0 : Math.max(0, end - now);
  const h = Math.floor(left / 3.6e6), m = Math.floor((left % 3.6e6) / 6e4), s = Math.floor((left % 6e4) / 1000);
  if (now !== null && left === 0) return <p className="text-sm font-semibold">This offer has ended.</p>;
  return (
    <div role="timer" aria-label="Offer countdown" className="flex items-center gap-3">
      <span className="text-sm font-semibold">Offer Closes Soon In:</span>
      {[[h, "Hours"], [m, "Min"], [s, "Sec"]].map(([v, l]) => (
        <span key={l as string} className="min-w-14 rounded-xl bg-card px-2 py-1.5 text-center text-foreground">
          <span className="block font-display text-lg font-semibold tabular-nums">{now === null ? "--" : String(v).padStart(2, "0")}</span>
          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">{l}</span>
        </span>
      ))}
    </div>
  );
}
