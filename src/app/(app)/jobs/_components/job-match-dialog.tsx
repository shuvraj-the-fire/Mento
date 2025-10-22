'use client';

import { getJobMatchAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import type { Job } from '@/lib/types';
import { Bot, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useState, useTransition } from 'react';

type MatchResult = {
  matchScore: number;
  justification: string;
};

export function JobMatchDialog({ job, studentProfile }: { job: Job; studentProfile: string }) {
  const [open, setOpen] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleMatch = () => {
    startTransition(async () => {
      const result = await getJobMatchAction(studentProfile, job.description);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      } else if (result.data) {
        setMatchResult(result.data);
      }
    });
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setMatchResult(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full group">
          <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:scale-125" />
          Check AI Match
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
            <Bot className="text-primary"/> AI Match Analysis
          </DialogTitle>
          <DialogDescription>
            Analyzing your profile against the requirements for the <span className="font-semibold text-foreground">{job.title}</span> role.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {!matchResult && !isPending && (
            <div className="flex flex-col items-center justify-center text-center p-8">
                <p className="mb-4 text-muted-foreground">Click the button below to start the AI analysis.</p>
                <Button onClick={handleMatch} disabled={isPending}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Start Analysis
                </Button>
            </div>
          )}
          {isPending && (
            <div className="flex flex-col items-center justify-center space-y-4 p-8">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground">Our AI is working its magic...</p>
            </div>
          )}
          {matchResult && (
            <div className="space-y-4 animate-fade-in-up">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold">Match Score</p>
                  <p className="text-xl font-bold text-primary">
                    {Math.round(matchResult.matchScore * 100)}%
                  </p>
                </div>
                <Progress value={matchResult.matchScore * 100} className="h-3" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Justification</h4>
                <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">
                  {matchResult.justification}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
