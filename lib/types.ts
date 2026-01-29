/**
 * Career Hub - Type Definitions
 *
 * This file contains all TypeScript interfaces and types used throughout
 * the Career Hub application for CV building, job tracking, and career management.
 */

// =============================================================================
// ENUMS & BASIC TYPES
// =============================================================================

/** Supported languages for CV content and UI labels */
export type CVLanguage = 'en' | 'de';

/** Job application pipeline stages */
export type ApplicationStatus =
    | 'Interested'
    | 'Applied'
    | 'Phone Screen'
    | 'Technical'
    | 'Final Round'
    | 'Offer'
    | 'Rejected'
    | 'Ghosted';

// =============================================================================
// CV CONTENT INTERFACES
// =============================================================================

/** Language proficiency entry (e.g., "English - Fluent") */
export interface Language {
    name: string;
    level: string;
}

/** Skill category with comma-separated items (e.g., "Programming: Python, Java, C++") */
export interface Skill {
    category: string;
    items: string;
}

/** Educational qualification entry */
export interface Education {
    university: string;
    dates: string;       // e.g., "2018-2022" or "2022-Present"
    degree: string;      // e.g., "Master of Science (M.Sc.)"
    field: string;       // e.g., "Computer Science"
    gpa: string;         // e.g., "3.8" or "1.5" (German scale)
}

/** Work experience entry with bullet points */
export interface Experience {
    company: string;
    dates: string;
    position: string;
    bullets: string[];   // Markdown-supported bullet points
}

// =============================================================================
// CAREER HUB FEATURES
// =============================================================================

/** Job application tracking entry */
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
    profileId?: string;  // Link to which CV profile was used
}

/** Cover letter document */
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
    language?: CVLanguage;
    variant?: 'modern' | 'classic';
}

/** Interview preparation note */
export interface Note {
    id: string;
    title: string;
    content: string;
}

/** Saved job link bookmark for later review */
export interface Bookmark {
    id: string;
    title: string;
    url: string;
    notes?: string;
    createdAt: string;
    tags?: string[];
}

// =============================================================================
// CV PROFILE & DATA STRUCTURES
// =============================================================================

/** 
 * CV Profile - A tailored version of skills and summary for specific job types.
 * Users can create multiple profiles (e.g., "Full Stack Developer", "Data Scientist")
 */
export interface CVProfile {
    id: string;
    name: string;
    aboutMe: string;
    skills: Skill[];
}

/**
 * Main CV Data Structure
 * 
 * Contains all user data including personal info, CV content, 
 * and career hub features (applications, cover letters, bookmarks).
 * This is the primary data model synced with Firebase.
 */
export interface CVData {
    // Personal Information
    fullName: string;
    language: CVLanguage;
    photoUrl: string;
    address: string;
    location: string;
    phone: string;
    email: string;
    dateOfBirth: string;

    // Professional Links
    leetcode: string;
    github: string;
    portfolio: string;

    // Language proficiencies
    languages: Language[];

    // Profile Management
    activeProfileId: string;
    profiles: CVProfile[];

    // Active profile data (synced with activeProfileId)
    skills: Skill[];
    aboutMe: string;

    // CV Content
    education: Education[];
    experience: Experience[];

    // Career Hub Features
    applications: JobApplication[];
    coverLetters: CoverLetter[];
    interviewPrep: Note[];
    bookmarks: Bookmark[];
    topSkills: string[];

    // Metadata
    updatedAt?: string;
}
