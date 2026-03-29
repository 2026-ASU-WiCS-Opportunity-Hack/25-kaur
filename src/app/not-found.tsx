import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 px-6 text-center">
      <div>
        <p className="text-sm font-medium text-emerald-800">AidBridge</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Page not found</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          That URL does not exist in this app. Use one of the links below, or open the site from the home page.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-9 items-center justify-center rounded-xl bg-emerald-700 px-4 text-sm font-medium text-white hover:bg-emerald-800"
        >
          Home / Sign in
        </Link>
        <Link
          href="/login"
          className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
        >
          Login
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
        >
          Dashboard
        </Link>
      </div>
      <p className="text-xs text-muted-foreground">
        Tip: start the app with <code className="rounded bg-white px-1.5 py-0.5">npm run dev</code>, then open{" "}
        <code className="rounded bg-white px-1.5 py-0.5">http://localhost:3000</code> (or the port shown in your terminal).
      </p>
    </div>
  )
}
