export type CVLanguage = 'en' | 'de';

export type ApplicationStatus = 'Interested' | 'Applied' | 'Phone Screen' | 'Technical' | 'Final Round' | 'Offer' | 'Rejected' | 'Ghosted';

export interface Language {
    name: string;
    level: string;
}

export interface Skill {
    category: string;
    items: string;
}

export interface Education {
    university: string;
    dates: string;
    degree: string;
    field: string;
    gpa: string;
}

export interface Experience {
    company: string;
    dates: string;
    position: string;
    bullets: string[];
}

export interface JobApplication {
    id: string;
    company: string;
    role: string;
    location: string;
    status: ApplicationStatus;
    appliedDate: string;
    link: string;
    salary?: string;
    notes: string;
    profileId?: string; // Link to which CV profile was used
}

export interface CoverLetter {
    id: string;
    title: string;
    company?: string;
    recipientName?: string;
    recipientAddress?: string;
    recipientCity?: string;
    salutation?: string;
    closing?: string;
    customDate?: string;
    senderCity?: string;
    content: string;
    lastModified: string;
}




export interface Note {
    id: string;
    title: string;
    content: string;
}

export interface CVProfile {
    id: string;
    name: string;
    aboutMe: string;
    skills: Skill[];
}

export interface CVData {
    fullName: string;
    language: CVLanguage;
    photoUrl: string;
    address: string;
    location: string;
    phone: string;
    leetcode: string;
    github: string;
    portfolio: string;
    email: string;
    dateOfBirth: string;
    languages: Language[];
    activeProfileId: string;
    profiles: CVProfile[];
    // Shared fields that reflect the active profile for easy access
    skills: Skill[];
    aboutMe: string;
    education: Education[];
    experience: Experience[];
    // New Career Hub features
    applications: JobApplication[];
    coverLetters: CoverLetter[];
    interviewPrep: Note[];
    topSkills: string[]; // For dashboard matrix
    updatedAt?: string;
}

