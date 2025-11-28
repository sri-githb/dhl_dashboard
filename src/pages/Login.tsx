import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
});

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate mobile number
      loginSchema.parse({ mobile });

      // Auto-generate password (last 6 digits)
      const password = mobile.slice(-6);

      // Simulate login (in production, this would call an API)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store session
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("userMobile", mobile);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-4 animate-glow">
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">DHL Robot Monitor</h1>
            <p className="text-muted-foreground">Enter your mobile number to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-foreground">
                Mobile Number
              </Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="1234567890"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="glass-input h-12 text-lg"
                maxLength={10}
                required
              />
              <p className="text-xs text-muted-foreground">
                Password will be auto-generated from last 6 digits
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,204,0,0.3)]"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground">
              DHL Supply Chain © 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
