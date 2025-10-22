'use client';

import { getRecommendationsAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { mockStudentProfile } from '@/lib/mock-data';
import { ArrowRight, Briefcase, Lightbulb, Loader2, Star, GraduationCap } from 'lucide-react';
import { useState, useTransition } from 'react';

type Recommendations = {
  careerPaths: string[];
  requiredSkills: string[];
  trainingPrograms: string[];
};

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGetRecommendations = () => {
    startTransition(async () => {
      const result = await getRecommendationsAction(mockStudentProfile.summary);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      } else if (result.data) {
        setRecommendations(result.data);
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl md:text-4xl">Career Recommendations</h1>
        <p className="text-muted-foreground max-w-2xl">
          Leverage AI to discover personalized career paths, identify skill gaps, and find relevant training programs based on your unique profile.
        </p>
      </div>

      {!recommendations && (
        <div className="flex flex-col items-center justify-center text-center bg-card border-dashed border-2 rounded-lg p-12 min-h-[400px]">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Lightbulb className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Ready to explore your future?</h2>
          <p className="text-muted-foreground mb-6">Click the button below to generate your personalized career report.</p>
          <Button size="lg" onClick={handleGetRecommendations} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate My Career Path
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      )}

      {isPending && !recommendations && (
        <div className="flex items-center justify-center text-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-lg">Analyzing your profile and generating recommendations...</p>
        </div>
      )}

      {recommendations && (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 animate-fade-in-up">
          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="text-primary" />
                Recommended Career Paths
              </CardTitle>
              <CardDescription>Top career suggestions based on your profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recommendations.careerPaths.map((path) => (
                  <li key={path} className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>{path}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="text-accent" />
                Required Skills
              </CardTitle>
              <CardDescription>Key skills to excel in these roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recommendations.requiredSkills.map((skill) => (
                  <li key={skill} className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-accent mt-1 mr-2 flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="text-muted-foreground" />
                Suggested Training
              </CardTitle>
              <CardDescription>Programs to help you acquire these skills.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recommendations.trainingPrograms.map((program) => (
                  <li key={program} className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-muted-foreground mt-1 mr-2 flex-shrink-0" />
                    <span>{program}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
