
import { KeyRound } from 'lucide-react';

export function KeyForgeLogo() {
  return (
    <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2 border border-primary/20">
          <KeyRound className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground font-headline tracking-tighter">
          KeyForge
        </h1>
    </div>
  )
}
