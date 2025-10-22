'use server';

/**
 * @fileOverview A flow for generating a student profile from a text prompt.
 *
 * - generateProfileFromPrompt - A function that generates a student profile based on a given prompt.
 * - GenerateProfileFromPromptInput - The input type for the generateProfileFromPrompt function.
 * - GenerateProfileFromPromptOutput - The return type for the generateProfileFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfileFromPromptInputSchema = z.object({
  prompt: z
    .string()
    .describe(
      'A detailed prompt describing the student’s skills, interests, experiences, and desired profile content.'
    ),
});
export type GenerateProfileFromPromptInput = z.infer<typeof GenerateProfileFromPromptInputSchema>;

const GenerateProfileFromPromptOutputSchema = z.object({
  profileText: z
    .string()
    .describe(
      'The generated student profile text based on the provided prompt.'
    ),
});
export type GenerateProfileFromPromptOutput = z.infer<typeof GenerateProfileFromPromptOutputSchema>;

export async function generateProfileFromPrompt(
  input: GenerateProfileFromPromptInput
): Promise<GenerateProfileFromPromptOutput> {
  return generateProfileFromPromptFlow(input);
}

const generateProfilePrompt = ai.definePrompt({
  name: 'generateProfilePrompt',
  input: {schema: GenerateProfileFromPromptInputSchema},
  output: {schema: GenerateProfileFromPromptOutputSchema},
  prompt: `You are an AI assistant designed to generate student profiles.

  Based on the provided prompt, create a comprehensive and engaging student profile.

  Prompt: {{{prompt}}}

  Profile:`,
});

const generateProfileFromPromptFlow = ai.defineFlow(
  {
    name: 'generateProfileFromPromptFlow',
    inputSchema: GenerateProfileFromPromptInputSchema,
    outputSchema: GenerateProfileFromPromptOutputSchema,
  },
  async input => {
    const {output} = await generateProfilePrompt(input);
    return output!;
  }
);
