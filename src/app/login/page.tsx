"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<"login" | "signup">("login")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      // Mock session directly to the dashboard
      localStorage.setItem("userRole", "staff")
      router.push("/dashboard")
    }, 1200)
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
        <div className="absolute left-6 top-4 z-10">
          <Image
            src="/aidbridge-wordmark.png"
            alt="AidBridge"
            width={290}
            height={80}
            className="h-auto w-[290px]"
            priority
          />
        </div>
        <div className="absolute bottom-8 left-6 z-10 max-w-[460px] rounded-2xl bg-white/90 px-6 py-5 shadow-lg">
          <h2 className="text-4xl font-bold leading-tight text-black">Welcome to AidBridge</h2>
          <p className="mt-3 text-2xl leading-snug text-black">
            Empowering nonprofits to deliver continuous care through AI-assisted case management and seamless client handoffs.
          </p>
        </div>
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
              <CardTitle className="text-2xl font-bold text-center">
                {mode === "login" ? "Welcome back" : "Create an account"}
              </CardTitle>
              <CardDescription className="text-center">
                Access your case management portal
              </CardDescription>
            </CardHeader>
            <CardContent>
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

                <Button className="w-full bg-black text-white hover:bg-black/90" type="submit" disabled={isLoading}>
                  {isLoading 
                    ? "Authenticating..." 
                    : mode === "login" 
                        ? "Sign in" 
                        : "Create Account"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col border-t bg-white px-6 py-4">
              <p className="text-sm text-center text-muted-foreground mt-2">
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
