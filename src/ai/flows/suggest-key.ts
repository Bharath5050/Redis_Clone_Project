'use server';

/**
 * @fileOverview AI-powered key suggestion service.
 *
 * - suggestKey - A function that suggests a key for a given value.
 * - SuggestKeyInput - The input type for the suggestKey function.
 * - SuggestKeyOutput - The return type for the suggestKey function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestKeyInputSchema = z.string().describe('The value to generate a key for.');
export type SuggestKeyInput = z.infer<typeof SuggestKeyInputSchema>;

const SuggestKeyOutputSchema = z.string().describe('The suggested key for the value.');
export type SuggestKeyOutput = z.infer<typeof SuggestKeyOutputSchema>;

export async function suggestKey(value: SuggestKeyInput): Promise<SuggestKeyOutput> {
  return suggestKeyFlow(value);
}

const suggestKeyPrompt = ai.definePrompt({
  name: 'suggestKeyPrompt',
  input: {schema: SuggestKeyInputSchema},
  output: {schema: SuggestKeyOutputSchema},
  prompt: `You are an expert at generating keys for key-value stores.

  Given the following value, generate a short, readable, and catchy key for it:

  Value: {{{value}}}

  Key:`,
});

const suggestKeyFlow = ai.defineFlow(
  {
    name: 'suggestKeyFlow',
    inputSchema: SuggestKeyInputSchema,
    outputSchema: SuggestKeyOutputSchema,
  },
  async value => {
    const {output} = await suggestKeyPrompt(value);
    return output!;
  }
);
