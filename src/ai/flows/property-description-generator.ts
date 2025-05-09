'use server';

/**
 * @fileOverview Generates compelling property descriptions from key features and amenities.
 *
 * - generatePropertyDescription - A function that generates a property description.
 * - GeneratePropertyDescriptionInput - The input type for the generatePropertyDescription function.
 * - GeneratePropertyDescriptionOutput - The return type for the generatePropertyDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePropertyDescriptionInputSchema = z.object({
  propertyType: z.string().describe('The type of property (e.g., house, apartment, condo).'),
  location: z.string().describe('The location of the property (city, neighborhood).'),
  bedrooms: z.number().int().min(1).describe('The number of bedrooms in the property.'),
  bathrooms: z.number().min(1).describe('The number of bathrooms in the property.'),
  squareFootage: z.number().describe('The square footage of the property.'),
  amenities: z
    .string()
    .describe('A comma-separated list of key features and amenities (e.g., hardwood floors, granite countertops, stainless steel appliances, swimming pool, garage).'),
  additionalDetails: z.string().optional().describe('Any additional details about the property.'),
});

export type GeneratePropertyDescriptionInput = z.infer<typeof GeneratePropertyDescriptionInputSchema>;

const GeneratePropertyDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling and engaging property description.'),
});

export type GeneratePropertyDescriptionOutput = z.infer<typeof GeneratePropertyDescriptionOutputSchema>;

export async function generatePropertyDescription(
  input: GeneratePropertyDescriptionInput
): Promise<GeneratePropertyDescriptionOutput> {
  return generatePropertyDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePropertyDescriptionPrompt',
  input: {schema: GeneratePropertyDescriptionInputSchema},
  output: {schema: GeneratePropertyDescriptionOutputSchema},
  prompt: `You are a real estate expert. Generate a compelling and engaging property description based on the following details:

Property Type: {{{propertyType}}}
Location: {{{location}}}
Bedrooms: {{{bedrooms}}}
Bathrooms: {{{bathrooms}}}
Square Footage: {{{squareFootage}}}
Amenities: {{{amenities}}}

{{#if additionalDetails}}
Additional Details: {{{additionalDetails}}}
{{/if}}

Write a description that highlights the key features and benefits of the property, targeting potential buyers. Make it sound attractive and inviting. Focus on creating a sense of desire and aspiration.
`,
});

const generatePropertyDescriptionFlow = ai.defineFlow(
  {
    name: 'generatePropertyDescriptionFlow',
    inputSchema: GeneratePropertyDescriptionInputSchema,
    outputSchema: GeneratePropertyDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
