// Provider-agnostic analytics. Register adapters (GA, GTM, Meta Pixel) without touching components.
type Props = Record<string, unknown>;
type Adapter = (event: string, props: Props) => void;

const adapters: Adapter[] = [
  (event, props) => {
    if (typeof window === "undefined") return;
    const w = window as unknown as { dataLayer?: unknown[] };
    (w.dataLayer ||= []).push({ event, ...props });
  },
];

export function registerAnalyticsAdapter(a: Adapter) { adapters.push(a); }
export function track(event: string, props: Props = {}) {
  for (const a of adapters) { try { a(event, props); } catch { /* ignore */ } }
}
