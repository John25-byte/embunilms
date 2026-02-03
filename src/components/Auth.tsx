
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")

  // Clear error when tab changes or inputs change
  useEffect(() => {
    setError(null)
  }, [email, password, activeTab])

  const validateInputs = () => {
    if (!email.trim()) {
      setError("Email is required")
      return false
    }
    
    if (!password.trim()) {
      setError("Password is required")
      return false
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return false
    }
    
    return true
  }

  const handleAuth = async (action: "signin" | "signup") => {
    if (!validateInputs()) {
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      if (action === "signin") {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
    } catch (error) {
      console.error("Authentication error:", error)
      setError(error instanceof Error ? error.message : "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[400px] p-6 mx-auto">
      <Tabs defaultValue="signin" onValueChange={(value) => setActiveTab(value as "signin" | "signup")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <TabsContent value="signin" className="space-y-4">
          <div className="space-y-4 pt-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
            />
            <Button
              className="w-full"
              onClick={() => handleAuth("signin")}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="signup" className="space-y-4">
          <div className="space-y-4 pt-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="new-password"
            />
            <Button
              className="w-full"
              onClick={() => handleAuth("signup")}
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              By default, new accounts are registered as students
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
