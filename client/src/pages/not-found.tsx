import { Link } from "wouter";
import { NeonButton } from "@/components/NeonButton";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <AlertTriangle className="w-24 h-24 text-destructive animate-pulse" />
            <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full" />
          </div>
        </div>
        
        <h1 className="text-8xl font-display font-black text-white">404</h1>
        <h2 className="text-xl font-mono text-destructive uppercase tracking-widest">
          System Error: Path Not Found
        </h2>
        
        <p className="text-muted-foreground font-mono text-sm">
          The requested trajectory does not exist in the current timeline. 
          Return to base immediately.
        </p>

        <div className="pt-8">
          <Link href="/">
            <NeonButton>Return to Base</NeonButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
