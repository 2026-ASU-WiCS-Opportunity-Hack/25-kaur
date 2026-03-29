export function AmbientBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-teal-300/12 blur-3xl" />
      <div className="absolute bottom-20 left-1/4 h-72 w-72 rounded-full bg-lime-200/15 blur-3xl" />
      <div className="absolute bottom-0 right-1/3 h-px w-full bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent" />
    </div>
  )
}
