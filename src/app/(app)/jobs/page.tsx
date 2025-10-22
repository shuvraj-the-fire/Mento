import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockJobs, mockStudentProfile } from '@/lib/mock-data';
import { Job } from '@/lib/types';
import { MapPin } from 'lucide-react';
import { JobMatchDialog } from './_components/job-match-dialog';

export default function JobsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl md:text-4xl">Internships & Jobs</h1>
        <p className="text-muted-foreground max-w-2xl">
          Discover opportunities perfectly aligned with your profile. Use our AI Match feature to see how you stack up.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockJobs.map((job: Job) => (
          <Card key={job.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {job.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <JobMatchDialog job={job} studentProfile={mockStudentProfile.summary} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
