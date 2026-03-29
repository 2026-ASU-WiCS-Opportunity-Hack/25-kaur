"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeartPulse, UserCircle2, Briefcase } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<"client" | "staff">("client")
  const [mode, setMode] = useState<"login" | "signup">("login")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      // Set the mock session role in localStorage to emulate RBAC
      localStorage.setItem("userRole", role)
      
      // Redirect based on role
      if (role === "client") {
        router.push("/client-portal")
      } else {
        router.push("/dashboard")
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-slate-50">
      
      {/* Visual / 3D Asset Side */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-zinc-900 relative overflow-hidden">
        
        {/* New Text Logo Overlay (Top Left) */}
        <div className="absolute top-8 left-8 z-30 flex flex-col items-start gap-0.5 pt-4 pl-4 drop-shadow-sm">
          <h1 className="text-5xl font-extrabold tracking-tight text-[#115024]">
            AIDBRIDGE
          </h1>
          <p className="text-[1.05rem] font-medium tracking-wide text-[#1A6D33] opacity-90">
            Empowering Nonprofits. Strengthening Communities.
          </p>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 opacity-30 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <Image
              src="/hero-3d.png?v=5"
              alt="3D Glowing Hands holding a green plant"
              layout="fill"
              objectFit="cover"
              priority
              className="z-0 opacity-100"
           />
        </div>
        
        {/* Text Overlay Box (Disabled to highlight new top-left logo, or kept minimal) */}
        <div className="z-20 p-12 mt-auto text-left w-full glass-panel border border-white/20 m-8 rounded-2xl max-w-xl self-start mb-16 shadow-2xl bg-white/40 backdrop-blur-md hidden">
          {/* This earlier block is hidden so the pure image and new top-left logo take focus */}
        </div>
      </div>

      {/* Auth Form Side / Right Side */}
      <div className="flex flex-col items-center justify-center pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden h-screen overflow-y-auto">
        
        {/* The Form */}
        <div className="w-full max-w-md space-y-8 z-10 relative mb-12">
          <div className="text-center lg:hidden">
            <HeartPulse className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">AidBridge</h2>
          </div>

          <Card className="glass-panel border-white/40 shadow-2xl relative overflow-visible mt-8 lg:mt-0 bg-white/80 backdrop-blur-xl">
            
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
                
                {/* Role Switcher */}
                <Tabs defaultValue="client" className="w-full" onValueChange={(v) => setRole(v as any)}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="client" className="gap-2">
                      <UserCircle2 className="h-4 w-4" /> Client
                    </TabsTrigger>
                    <TabsTrigger value="staff" className="gap-2">
                      <Briefcase className="h-4 w-4" /> Staff / Admin
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

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
                        <a href="#" className="text-xs text-primary font-medium hover:underline">
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                </div>

                <Button className="w-full shadow-lg shadow-primary/30 font-medium" type="submit" disabled={isLoading}>
                  {isLoading 
                    ? "Authenticating..." 
                    : mode === "login" 
                        ? `Sign in as ${role === 'client' ? 'Client' : 'Staff'}` 
                        : "Create Account"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col border-t px-6 py-4 bg-slate-50/50">
              <p className="text-sm text-center text-muted-foreground mt-2">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <button 
                  type="button" 
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-primary font-semibold hover:underline"
                >
                  {mode === "login" ? "Sign up" : "Sign in"}
                </button>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
