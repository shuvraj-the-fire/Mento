'use server';

/**
 * @fileOverview A career recommendation AI agent.
 *
 * - getCareerRecommendations - A function that provides career recommendations.
 * - CareerRecommendationsInput - The input type for the getCareerRecommendations function.
 * - CareerRecommendationsOutput - The return type for the getCareerRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerRecommendationsInputSchema = z.object({
  studentProfile: z
    .string()
    .describe('The student profile, including academic performance, skills, interests, and behavioral patterns.'),
});
export type CareerRecommendationsInput = z.infer<typeof CareerRecommendationsInputSchema>;

const CareerRecommendationsOutputSchema = z.object({
  careerPaths: z.array(z.string()).describe('Recommended career paths for the student.'),
  requiredSkills: z.array(z.string()).describe('Skills required for the recommended career paths.'),
  trainingPrograms: z.array(z.string()).describe('Relevant training programs to acquire the required skills.'),
});
export type CareerRecommendationsOutput = z.infer<typeof CareerRecommendationsOutputSchema>;

export async function getCareerRecommendations(
  input: CareerRecommendationsInput
): Promise<CareerRecommendationsOutput> {
  return getCareerRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerRecommendationsPrompt',
  input: {schema: CareerRecommendationsInputSchema},
  output: {schema: CareerRecommendationsOutputSchema},
  prompt: `You are a career counselor providing personalized career recommendations to students.

  Based on the student's profile, suggest potential career paths, required skills, and relevant training programs.

  Student Profile: {{{studentProfile}}}

  Provide the career recommendations in the following format:
  {
    careerPaths: ["Career Path 1", "Career Path 2"],
    requiredSkills: ["Skill 1", "Skill 2"],
    trainingPrograms: ["Training Program 1", "Training Program 2"]
  }`,
});

const getCareerRecommendationsFlow = ai.defineFlow(
  {
    name: 'getCareerRecommendationsFlow',
    inputSchema: CareerRecommendationsInputSchema,
    outputSchema: CareerRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
