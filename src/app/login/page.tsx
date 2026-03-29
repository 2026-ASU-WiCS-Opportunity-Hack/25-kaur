"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.84h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [mode, setMode] = useState<"login" | "signup">("login")

  const completeSignIn = () => {
    localStorage.setItem("userRole", "staff")
    router.push("/dashboard")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      completeSignIn()
    }, 1200)
  }

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true)
    setTimeout(() => {
      setIsGoogleLoading(false)
      completeSignIn()
    }, 800)
  }

  return (
    <div className="grid min-h-screen w-full bg-white lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src="/login-left-exact.png"
          alt="AidBridge welcome hero"
          fill
          priority
          className="object-cover object-left"
          sizes="50vw"
        />
      </div>

      <div className="relative isolate flex min-h-screen flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 px-4 pb-8 pt-6 sm:px-8 lg:px-14">
        <div aria-hidden className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-40 left-0 h-48 w-48 rounded-full bg-teal-300/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/4 h-px w-[120%] bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent" />
        <div className="lg:hidden">
          <Image
            src="/aidbridge-wordmark.png"
            alt="AidBridge"
            width={260}
            height={74}
            className="h-auto w-[220px] sm:w-[260px]"
            priority
          />
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 items-center justify-center">
          <Card className="w-full border border-emerald-100/60 bg-white/90 shadow-xl shadow-emerald-900/5 backdrop-blur-sm transition-shadow hover:shadow-2xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-center text-2xl font-bold">
                {mode === "login" ? "Welcome back" : "Create an account"}
              </CardTitle>
              <CardDescription className="text-center">
                Access your case management portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mb-4 h-9 w-full gap-2 border border-slate-200 bg-white text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isLoading}
              >
                <GoogleIcon className="h-4 w-4 shrink-0" />
                {isGoogleLoading ? "Connecting…" : "Continue with Google"}
              </Button>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {mode === "signup" && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      {mode === "login" && (
                        <a href="#" className="text-xs font-medium text-black hover:underline">
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                </div>

                <Button
                  className="w-full bg-black text-white hover:bg-black/90"
                  type="submit"
                  disabled={isLoading || isGoogleLoading}
                >
                  {isLoading
                    ? "Authenticating..."
                    : mode === "login"
                      ? "Sign in"
                      : "Create Account"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col border-t bg-white px-6 py-4">
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="font-semibold text-black hover:underline"
                >
                  {mode === "login" ? "Sign up" : "Sign in"}
                </button>
              </p>
            </CardFooter>
          </Card>
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-md items-center justify-center">
          <Image
            src="/aidbridge-logo.png"
            alt="AidBridge logo"
            width={320}
            height={195}
            className="h-auto w-[320px] max-w-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}
