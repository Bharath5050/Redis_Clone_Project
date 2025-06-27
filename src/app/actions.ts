
'use server';

import { suggestKey } from '@/ai/flows/suggest-key';
import { z } from 'zod';

const schema = z.string().min(1, { message: 'Value cannot be empty to suggest a key.' });

export async function getSuggestionAction(value: string): Promise<{ suggestedKey: string | null; error: string | null; }> {
  const parsed = schema.safeParse(value);

  if (!parsed.success) {
    return {
      suggestedKey: null,
      error: parsed.error.errors[0].message,
    };
  }
  
  try {
    const suggestedKey = await suggestKey(value);
    return {
      suggestedKey,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      suggestedKey: null,
      error: 'Could not generate a suggestion. Please try again.',
    };
  }
}
