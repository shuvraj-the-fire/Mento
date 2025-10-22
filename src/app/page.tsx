import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#29ABE233_1px,transparent_1px)] [background-size:32px_32px]"></div>
      <Card className="w-full max-w-md animate-fade-in-up border-primary/20 shadow-2xl shadow-primary/10">
        <CardHeader className="items-center text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-4xl tracking-tighter text-primary">
            Mento
          </CardTitle>
          <CardDescription className="text-foreground/80">
            Your AI-driven path to academic and career success.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-muted-foreground">
            Unlock your potential with personalized career recommendations, automated job matching, and insightful analytics.
          </p>
          <Button asChild size="lg" className="w-full group">
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Mento. All rights reserved.</p>
      </footer>
    </div>
  );
}
