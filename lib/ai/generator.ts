import { AI_SYSTEM_PROMPT, getGenerationPrompt } from './prompts';

export interface AIInput {
    // 1. Target Info (The Core)
    targetRole: string;
    companyName: string;
    jobDescription: string;
    seniorityLevel: string;
    targetCountry: string;

    // 2. High-Level Context
    keywordsToEmphasize?: string;
    gapContext?: string;

    // 3. Language & Tone
    language: 'English' | 'German';
    tone: 'Formal' | 'Semi-formal' | 'Technical' | 'Enthusiastic';
}

export const generateCoverLetterAI = async (cvData: any, inputs: AIInput): Promise<string> => {
    const prompt = getGenerationPrompt(cvData, inputs);

    console.log('[AI Generator v3.0] System Prompt:', AI_SYSTEM_PROMPT);
    console.log('[AI Generator v3.0] User Prompt:', prompt);

    // MOCK GENERATION for demonstration
    return new Promise((resolve) => {
        setTimeout(() => {
            const isGerman = inputs.language === 'German';
            const mockContent = isGerman
                ? `Sehr geehrte Damen und Herren,\n\nmit großem Interesse bewerbe ich mich auf die Position als ${inputs.targetRole} bei ${inputs.companyName || '[Unternehmen]'}. Dank meiner fundierten Kenntnisse in Bereichen wie ${inputs.keywordsToEmphasize || 'einschlägigen Technologien'} und meiner bisherigen Erfahrung bin ich überzeugt...`
                : `Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${inputs.targetRole} position at ${inputs.companyName || '[Company]'}. With my solid background in areas like ${inputs.keywordsToEmphasize || 'relevant technologies'} and my previous experience, I am confident...`;

            resolve(mockContent);
        }, 2000);
    });
};
