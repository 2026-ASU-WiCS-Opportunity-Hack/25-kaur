import type { ReactNode } from "react"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type PageHeroProps = {
  title: string
  subtitle?: string
  badge?: ReactNode
  actions?: ReactNode
  variant?: "default" | "compact"
  className?: string
}

export function PageHero({
  title,
  subtitle,
  badge,
  actions,
  variant = "default",
  className,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        "relative mb-8 overflow-hidden rounded-3xl border border-emerald-200/50 bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white shadow-xl shadow-emerald-900/20",
        variant === "compact" ? "px-6 py-6 md:px-8 md:py-7" : "px-8 py-9 md:py-10",
        className
      )}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/10 bg-white/5" />
      <div className="absolute bottom-0 right-16 h-24 w-24 rounded-full bg-amber-400/10 blur-2xl" />
      <div className="relative flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-2">
          {badge ?? (
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              AidBridge
            </p>
          )}
          <h1
            className={cn(
              "font-extrabold tracking-tight",
              variant === "compact" ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
            )}
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="text-sm text-emerald-100/90 md:text-base">{subtitle}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2 pt-2 md:pt-0">{actions}</div> : null}
      </div>
    </div>
  )
}
