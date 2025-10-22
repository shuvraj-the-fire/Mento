'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { generateProfileAction, updateProfileAction } from '@/app/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { mockStudentProfile } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bot, User as UserIcon, Wand2, Edit, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import { Input } from '@/components/ui/input';

function GenerateAIButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          {' '}
          <Wand2 className="mr-2 h-4 w-4" /> Generate with AI{' '}
        </>
      )}
    </Button>
  );
}

function UpdateProfileButton() {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </>
        )}
      </Button>
    );
  }

export default function ProfilePage() {
  const { user, loading } = useUser();
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');
  
  const [profileSummary, setProfileSummary] = useState(mockStudentProfile.summary);
  const [displayName, setDisplayName] = useState('');

  const { toast } = useToast();

  const [generateState, generateFormAction] = useActionState(generateProfileAction, { error: null, data: null });
  const [updateState, updateFormAction] = useActionState(updateProfileAction, { error: null, success: false });

  useEffect(() => {
    if (user?.displayName) {
        setDisplayName(user.displayName);
    }
  }, [user]);

  useEffect(() => {
    if (generateState.data?.profileText) {
      setProfileSummary(generateState.data.profileText);
      toast({
        title: 'Profile Updated',
        description: 'Your AI-generated summary has been created.',
      });
    } else if (generateState.error) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: generateState.error,
      });
    }
  }, [generateState, toast]);

  useEffect(() => {
    if (updateState.success) {
      toast({
        title: 'Profile Saved',
        description: 'Your profile has been updated successfully.',
      });
    } else if (updateState.error) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: updateState.error,
      });
    }
  }, [updateState, toast]);

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>
  }


  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <Avatar className="h-24 w-24 border-4 border-primary/50">
          <AvatarImage src={user.photoURL ?? userAvatar?.imageUrl} alt="User Avatar" data-ai-hint={userAvatar?.imageHint} />
          <AvatarFallback className="text-3xl">{displayName?.charAt(0) ?? 'A'}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-headline text-3xl md:text-4xl">{displayName}</h1>
          <p className="text-muted-foreground text-lg">{user.email}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Edit />
                Edit Your Profile
                </CardTitle>
                <CardDescription>
                Update your name and personal summary.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={updateFormAction} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="displayName">Display Name</label>
                        <Input
                            id="displayName"
                            name="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="text-base"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="summary">Profile Summary</label>
                        <Textarea
                            id="summary"
                            name="summary"
                            value={profileSummary}
                            onChange={(e) => setProfileSummary(e.target.value)}
                            className="min-h-[150px] text-base"
                        />
                    </div>
                    <div className="flex justify-end">
                        <UpdateProfileButton />
                    </div>
                </form>
            </CardContent>
          </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    <Bot /> AI-Powered Summary
                    </CardTitle>
                    <CardDescription>
                    Let AI craft a compelling profile summary for you. Describe your skills and interests below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={generateFormAction} className="space-y-4">
                    <Textarea
                        name="prompt"
                        placeholder="e.g., 'Final year computer science student specializing in machine learning...'"
                        className="min-h-[120px]"
                        required
                    />
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-muted-foreground">
                        The more detail you provide, the better the AI will perform.
                        </p>
                        <GenerateAIButton />
                    </div>
                    </form>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {mockStudentProfile.skills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {mockStudentProfile.interests.map((interest) => (
                <Badge key={interest} variant="outline">{interest}</Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockStudentProfile.experience.map((exp) => (
                <div key={exp.role}>
                  <h4 className="font-semibold">{exp.role}</h4>
                  <p className="text-sm text-muted-foreground">{exp.organization} | {exp.duration}</p>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
