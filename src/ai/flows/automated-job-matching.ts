'use server';

/**
 * @fileOverview A flow for matching students with internships and job opportunities.
 *
 * - automatedJobMatching - A function that takes student profile and job description as input, and returns a matching score.
 * - AutomatedJobMatchingInput - The input type for the automatedJobMatching function.
 * - AutomatedJobMatchingOutput - The return type for the automatedJobMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedJobMatchingInputSchema = z.object({
  studentProfile: z
    .string()
    .describe('The profile of the student, including skills, interests, and experience.'),
  jobDescription: z.string().describe('The description of the job or internship opportunity.'),
});
export type AutomatedJobMatchingInput = z.infer<typeof AutomatedJobMatchingInputSchema>;

const AutomatedJobMatchingOutputSchema = z.object({
  matchScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating how well the student profile matches the job description.'
    ),
  justification: z
    .string()
    .describe('A brief explanation of why the student profile matches or does not match the job description.'),
});
export type AutomatedJobMatchingOutput = z.infer<typeof AutomatedJobMatchingOutputSchema>;

export async function automatedJobMatching(
  input: AutomatedJobMatchingInput
): Promise<AutomatedJobMatchingOutput> {
  return automatedJobMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automatedJobMatchingPrompt',
  input: {schema: AutomatedJobMatchingInputSchema},
  output: {schema: AutomatedJobMatchingOutputSchema},
  prompt: `You are an AI assistant specialized in matching student profiles with job descriptions.

You will receive a student profile and a job description. Your task is to determine how well the student's skills and experience align with the requirements of the job.

Based on your analysis, provide a match score between 0 and 1, where 1 indicates a perfect match and 0 indicates no match at all. Also, provide a brief justification for the score.

Student Profile: {{{studentProfile}}}
Job Description: {{{jobDescription}}}

Consider skills, experience, interests, and any other relevant information when determining the match score and justification.

Output in JSON format.
`,
});

const automatedJobMatchingFlow = ai.defineFlow(
  {
    name: 'automatedJobMatchingFlow',
    inputSchema: AutomatedJobMatchingInputSchema,
    outputSchema: AutomatedJobMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
