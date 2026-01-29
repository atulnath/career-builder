/**
 * Default CV Data Templates
 * 
 * Provides empty templates for new users. Personal data is stored
 * exclusively in Firebase and never hardcoded in the application.
 * 
 * @module lib/defaultData
 */

import { CVData, CVProfile } from './types';

/**
 * Admin email address(es) - Only these users have access to all data
 * and administrative features.
 */
export const ADMIN_EMAILS: string[] = [
    'atul.chand.nath@gmail.com',
    // Add more admin emails here if needed
];

/**
 * Check if an email belongs to an admin user
 */
export const isAdminUser = (email: string | null | undefined): boolean => {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email.toLowerCase());
};

/**
 * Empty default profile for new users
 * Contains placeholder text to guide users on what to fill
 */
const DEFAULT_PROFILE: CVProfile = {
    id: 'default-profile',
    name: 'My CV Profile',
    aboutMe: '',
    skills: [
        { category: 'Technical Skills', items: '' },
    ],
};

/**
 * Empty CV template for new users
 * No personal data - users fill in their own information
 */
export const EMPTY_CV_DATA: CVData = {
    // Personal Information - All empty
    fullName: '',
    language: 'en',
    photoUrl: '',
    address: '',
    location: '',
    phone: '',
    email: '',
    dateOfBirth: '',

    // Professional Links - All empty
    leetcode: '',
    github: '',
    portfolio: '',

    // Default language proficiencies
    languages: [
        { name: 'English', level: '' },
    ],

    // Profile Management
    activeProfileId: 'default-profile',
    profiles: [DEFAULT_PROFILE],

    // Active profile data (synced with activeProfileId)
    skills: [
        { category: 'Technical Skills', items: '' },
    ],
    aboutMe: '',

    // CV Content - Empty arrays
    education: [],
    experience: [],

    // Career Hub Features - Empty arrays
    applications: [],
    coverLetters: [],
    interviewPrep: [],
    bookmarks: [],
    topSkills: [],
};

/**
 * Get the appropriate initial data based on user role
 * 
 * - Admin users: Data loaded from Firebase (handled by useCVData hook)
 * - Regular users: Empty template to start fresh
 * 
 * @param userEmail - The user's email address
 * @returns The initial CVData for this user type
 */
export const getInitialData = (userEmail: string | null | undefined): CVData => {
    // All users start with empty data
    // Firebase will load existing data for returning users
    return EMPTY_CV_DATA;
};
