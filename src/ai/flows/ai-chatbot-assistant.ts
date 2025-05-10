// src/ai/flows/ai-chatbot-assistant.ts
'use server';

/**
 * @fileOverview An AI-powered chatbot assistant for answering real estate questions, guiding users on the website,
 * supporting multiple languages, and providing simulated global real estate data.
 *
 * - aiChatbotAssistant - A function that handles the chatbot assistance.
 * - AIChatbotAssistantInput - The input type for the aiChatbotAssistant function.
 * - AIChatbotAssistantOutput - The return type for the aiChatbotAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { APP_NAME } from '@/lib/constants';

const AIChatbotAssistantInputSchema = z.object({
  query: z.string().describe('The user query about real estate, website navigation, or global property data. Can be in English, Hindi, or Gujarati.'),
  userLanguageHint: z.string().optional().describe('Optional hint for user preferred language (e.g., "en", "hi", "gu"). LLM should prioritize this if provided, otherwise auto-detect.'),
});
export type AIChatbotAssistantInput = z.infer<typeof AIChatbotAssistantInputSchema>;

const AIChatbotAssistantOutputSchema = z.object({
  response: z.string().describe('The main answer from the AI chatbot. If the query is irrelevant, this will be a polite refusal. If it is website guidance, this will be a summary of the guidance. Response should be in the detected or hinted language of the input query.'),
  isRelevant: z.boolean().describe('True if the query is related to real estate, navigating the ResiGuide website, or global property data, false otherwise.'),
  guidance: z.string().optional().describe('Specific step-by-step guidance for navigating the website, if applicable. This is provided if the user asks how to do something on the site. Response should be in the detected or hinted language.'),
  detectedLanguage: z.string().describe('The language detected from the user query or the language used for the response (e.g., "English", "Hindi", "Gujarati").'),
});
export type AIChatbotAssistantOutput = z.infer<typeof AIChatbotAssistantOutputSchema>;


const GetGlobalRealEstateDataInputSchema = z.object({
  location: z.string().describe("The city or country for which real estate data is requested (e.g., 'Paris, France', 'Tokyo', 'Canada')."),
  dataType: z.enum(['sale', 'rent', 'general trends']).describe("The type of data requested: 'sale' for property sale prices, 'rent' for rental prices, or 'general trends' for overall market information."),
});

const GetGlobalRealEstateDataOutputSchema = z.object({
  dataSummary: z.string().describe("A summary of the requested real estate data. This data is simulated and for informational purposes only."),
  sourceDescription: z.string().default("Simulated Global Market Data").describe("Describes the source of the data, indicating it's simulated."),
});


const getGlobalRealEstateDataTool = ai.defineTool(
  {
    name: 'getGlobalRealEstateDataTool',
    description: 'Fetches simulated global real estate data, such as average property sale prices or rental costs for a specified international location. Use this if the user asks about property markets outside the primary service area of ResiGuide or for general global trends. This tool provides SIMULATED data for informational purposes only and cannot access live market data from external websites.',
    inputSchema: GetGlobalRealEstateDataInputSchema,
    outputSchema: GetGlobalRealEstateDataOutputSchema,
  },
  async (input) => {
    // Simulate fetching data. In a real application, this would call an API.
    let summary = `Fetching simulated data for ${input.dataType} in ${input.location}... `;
    const randomFactor = Math.random();
    const basePriceRent = 1000 + randomFactor * 4000; // e.g., 1000 to 5000
    const basePriceSale = 100000 + randomFactor * 900000; // e.g., 100k to 1M
    let currency = 'USD';

    // Basic currency guessing
    const locationLower = input.location.toLowerCase();
    if (locationLower.includes('europe') || locationLower.includes('paris') || locationLower.includes('germany') || locationLower.includes('france') || locationLower.includes('spain') || locationLower.includes('italy')) {
      currency = 'EUR';
    } else if (locationLower.includes('uk') || locationLower.includes('london')) {
      currency = 'GBP';
    } else if (locationLower.includes('japan') || locationLower.includes('tokyo')) {
      currency = 'JPY';
      // Adjust JPY prices as they are typically higher numerically
      summary = `Fetching simulated data for ${input.dataType} in ${input.location}... `; // Reset summary for JPY
      const basePriceRentJPY = 80000 + randomFactor * 220000; // e.g., 80k to 300k JPY
      const basePriceSaleJPY = 30000000 + randomFactor * 70000000; // e.g., 30M to 100M JPY
      if (input.dataType === 'rent') {
        summary += `The average simulated rent for a standard 2-bedroom apartment in ${input.location} is around ${currency} ${basePriceRentJPY.toLocaleString()} - ${(basePriceRentJPY * 1.5).toLocaleString()} per month. `;
      } else if (input.dataType === 'sale') {
        summary += `Simulated average sale prices for a 3-bedroom home in ${input.location} range from ${currency} ${basePriceSaleJPY.toLocaleString()} to ${currency} ${(basePriceSaleJPY * 1.8).toLocaleString()}. `;
      } else {
         summary += `The real estate market in ${input.location} is showing simulated dynamic trends. For specific figures, please ask about sale prices or rental costs. `;
      }
    } else if (locationLower.includes('india')) {
        currency = 'INR';
        summary = `Fetching simulated data for ${input.dataType} in ${input.location}... `;
        const basePriceRentINR = 15000 + randomFactor * 35000; // e.g., 15k to 50k INR
        const basePriceSaleINR = 5000000 + randomFactor * 15000000; // e.g., 50L to 2Cr INR
        if (input.dataType === 'rent') {
            summary += `The average simulated rent for a standard 2-bedroom apartment in ${input.location} is around ${currency} ${basePriceRentINR.toLocaleString()} - ${(basePriceRentINR * 1.5).toLocaleString()} per month. `;
        } else if (input.dataType === 'sale') {
            summary += `Simulated average sale prices for a 3-bedroom home in ${input.location} range from ${currency} ${basePriceSaleINR.toLocaleString()} to ${currency} ${(basePriceSaleINR * 1.8).toLocaleString()}. `;
        } else {
            summary += `The real estate market in ${input.location} is showing simulated dynamic trends. For specific figures, please ask about sale prices or rental costs. `;
        }
    }
    
    // General cases if not JPY or INR
    if (currency !== 'JPY' && currency !== 'INR') {
        if (input.dataType === 'rent') {
          summary += `The average simulated rent for a standard 2-bedroom apartment in ${input.location} is around ${currency} ${basePriceRent.toLocaleString(undefined, {maximumFractionDigits: 0})} - ${(basePriceRent * 1.5).toLocaleString(undefined, {maximumFractionDigits: 0})} per month. `;
        } else if (input.dataType === 'sale') {
          summary += `Simulated average sale prices for a 3-bedroom home in ${input.location} range from ${currency} ${basePriceSale.toLocaleString(undefined, {maximumFractionDigits: 0})} to ${currency} ${(basePriceSale * 1.8).toLocaleString(undefined, {maximumFractionDigits: 0})}. `;
        } else { // general trends
          summary += `The real estate market in ${input.location} is showing simulated dynamic trends. For specific figures, please ask about sale prices or rental costs. `;
        }
    }
    
    summary += `Please note: This information is based on **simulated global market data** and should be used for general guidance only. It does not reflect live market rates from any specific external website. For precise and up-to-date figures, consulting a local real estate expert in ${input.location} is highly recommended.`;
    
    return {
      dataSummary: summary,
      sourceDescription: "Simulated Global Market Data via ResiGuide AI (Not live data from external websites)",
    };
  }
);


export async function aiChatbotAssistant(input: AIChatbotAssistantInput): Promise<AIChatbotAssistantOutput> {
  return aiChatbotAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotAssistantPrompt',
  input: {schema: AIChatbotAssistantInputSchema},
  output: {schema: AIChatbotAssistantOutputSchema},
  tools: [getGlobalRealEstateDataTool],
  prompt: `You are ${APP_NAME} AI, a specialized multilingual assistant for the ${APP_NAME} real estate website.
Your supported languages for interaction are English, Hindi, and Gujarati.
Leverage your general real estate knowledge and the information provided in the current query. 
**Important Limitation**: You **cannot** browse external websites (like 99acres, Zillow, etc.) for live, real-time market data or property listings. You also cannot be "trained" on specific user feedback or data beyond the context of this current conversation.

**Core Responsibilities:**
1.  **Language Handling**:
    *   Detect the language of the user's query (English, Hindi, or Gujarati). If a \`userLanguageHint\` is provided (e.g., "hi" for Hindi, "gu" for Gujarati, "en" for English), prioritize responding in that language. Otherwise, auto-detect.
    *   Always respond in the detected or hinted language. Set the \`detectedLanguage\` field in your output to the language you are using for the response (e.g., "English", "Hindi", "Gujarati").
2.  **Answer Real Estate Questions**: Address user questions about general real estate topics (buying, selling, renting, market trends, property features, mortgage basics, etc.), primarily focused on ${APP_NAME}'s operational scope but also general knowledge.
3.  **Website Navigation**: Guide users on how to navigate and use the ${APP_NAME} website.
4.  **Global Real Estate Data (Simulated)**:
    *   If the user asks about property prices, rental costs, or market trends in **international locations** (outside of ${APP_NAME}'s primary operational area) or for broad global data, use the \`getGlobalRealEstateDataTool\`. This includes queries like "average rent in Paris", "property prices in Canada", "real estate trends in Tokyo", "cost of living in London for housing".
    *   When presenting data from this tool, **ALWAYS explicitly state that it is SIMULATED or EXAMPLE data** and for general informational purposes only. Emphasize that you cannot access live external data. Mention the source as indicated by the tool. Example phrasing: "Based on simulated global market data from ResiGuide AI, in [Location]..." or "According to our simulated data sources, which are not live feeds from external websites like 99acres..."

**Website Information (${APP_NAME}):**
The website has the following main sections and functionalities:
-   **Homepage ("/")**: Displays featured properties, an overview of ${APP_NAME}, and a quick property search bar. Users can start their property search here. To search, they type keywords (like city, neighborhood, or address) into the search bar and press Enter or click the "Search" button. Results appear below the search bar or on a new results section/page.
-   **Properties Page ("/properties")**: Shows all available property listings. Users can browse these listings. Clicking on a property card takes them to its detail page.
-   **Property Detail Page ("/properties/[id]")**: Accessed by clicking on a property. Shows detailed information about a specific property, including description, price, amenities, photos, and listing agent details. Users can find buttons to "Inquire About Property" or "Schedule a Visit" which typically open an email or lead to a contact form/agent details.
-   **Agents Page ("/agents")**: Lists all ${APP_NAME} real estate agents with their profiles, expertise, and contact information (email, phone).
-   **Blog Page ("/blog")**: Contains articles, news, and tips related to real estate.
-   **Blog Post Page ("/blog/[slug]")**: Displays individual blog articles when a user clicks on a blog post from the blog page.
-   **Contact Page ("/contact")**: Provides a contact form for general inquiries, along with company address, email, and phone number. Users can send messages directly through the form.
-   **About Page ("/about")**: Contains information about ${APP_NAME}, its mission, values, and team.
-   **AI Chat (Widget / "/chat" page)**: This is you! Users can ask real estate questions or get help navigating the site. The widget is usually at the bottom-right of the screen.

**Handling User Queries:**

User query: {{{query}}}
{{#if userLanguageHint}}User language hint: {{{userLanguageHint}}}{{/if}}

1.  **Determine Relevance & Language**:
    *   First, identify the language of the query. Respond in this language. Set \`detectedLanguage\` accordingly (e.g., "English", "Hindi", "Gujarati").
    *   If the query is about real estate (local or general), ${APP_NAME} website navigation, or specific requests for global/international property data (like "average rent in London", "house prices in Tokyo", "market trends in Canada"), it's relevant. Set \`isRelevant\` to true.
    *   If the query is clearly NOT related to these topics (e.g., "What's the weather like?", "Tell me a joke", "Who won the game last night?"), set \`isRelevant\` to false.

2.  **Formulate Response Based on Output Schema (ensure response is in the correct language)**:
    *   **If \`isRelevant\` is true AND the query is about real estate (local or general, not requiring global tool)**:
        *   Provide a comprehensive answer in the \`response\` field.
        *   \`guidance\` field can be empty or a brief pointer if a site page is relevant.
    *   **If \`isRelevant\` is true AND the query is about website navigation/information**:
        *   Provide clear, step-by-step instructions in the \`guidance\` field.
        *   Provide a concise summary in the \`response\` field.
    *   **If \`isRelevant\` is true AND the query requires global real estate data (e.g., asking about prices/rent in a specific international city/country)**:
        *   Use the \`getGlobalRealEstateDataTool\` to get the information. Pass the location and type of data ('sale', 'rent', or 'general trends') to the tool.
        *   Incorporate the tool's output (dataSummary and sourceDescription) into your \`response\`. Remember to **strongly emphasize that the data is simulated/example data for informational purposes only, not live data from external sites**, and it is recommended to consult local experts for precise figures.
        *   \`guidance\` field should be empty unless directly asked for website navigation related to this.
    *   **If \`isRelevant\` is false**:
        *   Set \`response\` to a polite refusal in the detected language.
            *   English: "I'm ${APP_NAME} AI, here to help with real estate questions and guide you through our website. I can't assist with topics outside of that, nor can I access live data from external real estate portals. How can I help you with general real estate topics or ${APP_NAME} today?"
            *   Hindi: "मैं ${APP_NAME} AI हूँ, रियल एस्टेट संबंधी प्रश्नों और हमारी वेबसाइट पर मार्गदर्शन के लिए यहाँ हूँ। मैं इससे बाहर के विषयों पर सहायता नहीं कर सकता, न ही मैं बाहरी रियल एस्टेट पोर्टलों से लाइव डेटा तक पहुँच सकता हूँ। आज मैं सामान्य रियल एस्टेट विषयों या ${APP_NAME} के संबंध में आपकी क्या मदद कर सकता हूँ?"
            *   Gujarati: "હું ${APP_NAME} AI છું, રિયલ એસ્ટેટ સંબંધિત પ્રશ્નો અને અમારી વેબસાઇટ પર માર્ગદર્શન માટે અહીં છું. હું આ સિવાયના વિષયો પર સહાય કરી શકતો નથી, કે હું બાહ્ય રિયલ એસ્ટેટ પોર્ટલ પરથી લાઇવ ડેટા એક્સેસ કરી શકતો નથી. આજે હું સામાન્ય રિયલ એસ્ટેટ વિષયો અથવા ${APP_NAME} સંબંધિત તમારી શી મદદ કરી શકું?"
        *   \`guidance\` field should be empty.

**Important Instructions:**
-   Be friendly, professional, and helpful.
-   If a real estate question is too broad, you can ask for clarification, but try to provide a general answer first.
-   When providing website guidance, be specific about page names and access methods.
-   Do not make up information about properties or agents not listed on the website. Refer to general functionalities.
-   Ensure your output strictly follows the schema.
-   Prioritize responding in the language of the input query (English, Hindi, or Gujarati). If \`userLanguageHint\` is given, use that. If the query is mixed, attempt to determine the primary language or default to English if uncertain.
-   **Reiterate: You cannot access external websites like 99acres, Zillow, etc., for real-time market data. Any market data you provide for international locations is from a simulated tool.**
  `,
});

const aiChatbotAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatbotAssistantFlow',
    inputSchema: AIChatbotAssistantInputSchema,
    outputSchema: AIChatbotAssistantOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    // Determine fallback language based on hint or default to English
    let fallbackLang = 'English';
    if (input.userLanguageHint === 'hi') fallbackLang = 'Hindi';
    else if (input.userLanguageHint === 'gu') fallbackLang = 'Gujarati';

    if (!output) {
      let fallbackMessage = "I'm sorry, I encountered an issue processing your request. Please try again.";
      if (fallbackLang === 'Hindi') fallbackMessage = "क्षमा करें, आपके अनुरोध को संसाधित करने में मुझे एक समस्या आई। कृपया पुनः प्रयास करें।";
      if (fallbackLang === 'Gujarati') fallbackMessage = "માફ કરશો, તમારી વિનંતી પર પ્રક્રિયા કરવામાં મને સમસ્યા આવી. કૃપા કરીને ફરી પ્રયાસ કરો।";
      
      return {
        response: fallbackMessage,
        isRelevant: false,
        detectedLanguage: fallbackLang,
      };
    }
    // Ensure detectedLanguage is set, default to English or hint if LLM missed it
    if (!output.detectedLanguage) {
        output.detectedLanguage = fallbackLang;
    }
    return output;
  }
);
