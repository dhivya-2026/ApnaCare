import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { type SupportedLanguage } from "@/data/regionalContent";

export function LanguageSelector({
  variant = "dropdown",
  className = "",
}: {
  variant?: "dropdown" | "pills" | "compact";
  className?: string;
}) {
  const { language, setLanguage, supportedLanguages } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  if (variant === "pills") {
    return (
      <div className={`flex items-center gap-1.5 flex-wrap ${className}`}>
        {supportedLanguages.map((l) => {
          const isSelected = language === l.code;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => setLanguage(l.code)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/60"
              }`}
            >
              <span>{l.nativeLabel}</span>
              {l.code !== "en" && <span className="opacity-70 text-[10px] ml-1">({l.label})</span>}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors shadow-2xs"
      >
        <Globe className="size-3.5 text-primary shrink-0" />
        <span className="font-bold">{currentLang.nativeLabel}</span>
        <ChevronDown className={`size-3 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-56 rounded-2xl border border-border bg-card p-1.5 shadow-lift z-50 animate-fade-in">
          <div className="px-3 py-1.5 border-b border-border/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Regional Language / மொழி / భాష / ಭಾಷೆ
          </div>
          <div className="py-1">
            {supportedLanguages.map((l) => {
              const isSelected = language === l.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setLanguage(l.code);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                    isSelected
                      ? "bg-primary-soft text-primary font-bold"
                      : "text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm leading-tight">{l.nativeLabel}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      {l.label} • {l.region}
                    </div>
                  </div>
                  {isSelected && <Check className="size-4 text-primary shrink-0 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
