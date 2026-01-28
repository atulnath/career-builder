/**
 * Industry-standard localized labels and configuration for the CV Builder.
 * Centralizing these allows for easy multi-language support and consistent section naming
 * across Form, Preview, and PDF Export.
 */

export type CVLanguage = 'en' | 'de';

export interface CVLabels {
    title: string;
    subtitle: string;
    personal: {
        title: string;
        fullName: string;
        photo: string;
        address: string;
        location: string;
        phone: string;
        email: string;
        dob: string;
        github: string;
        leetcode: string;
        portfolio: string;
    };
    sections: {
        about: string;
        experience: string;
        education: string;
        skills: string;
        languages: string;
        coverLetter: string;
    };
    actions: {
        addEducation: string;
        addExperience: string;
        addBullet: string;
        addSkill: string;
        addLanguage: string;
        remove: string;
        upload: string;
    };
    placeholders: {
        summary: string;
        category: string;
        skills: string;
        university: string;
        degree: string;
        dates: string;
        company: string;
        position: string;
        bullet: string;
        gpa: string;
    };
}

export const LABELS: Record<CVLanguage, CVLabels> = {
    en: {
        title: 'Curriculum Vitae',
        subtitle: 'Professional Curriculum Vitae',
        personal: {
            title: 'Personal Information',
            fullName: 'Full Name',
            photo: 'Profile Photo',
            address: 'Address',
            location: 'Location',
            phone: 'Phone',
            email: 'Email Address',
            dob: 'Date of Birth',
            github: 'GitHub',
            leetcode: 'LeetCode',
            portfolio: 'Portfolio',
        },
        sections: {
            about: 'Professional Profile',
            experience: 'Professional Experience',
            education: 'Educational Background',
            skills: 'Core Skills',
            languages: 'Languages',
            coverLetter: 'Cover Letter',
        },
        actions: {
            addEducation: 'Add Education',
            addExperience: 'Add Experience',
            addBullet: 'Add Bullet Point',
            addSkill: 'Add Skill Category',
            addLanguage: 'Add Language',
            remove: 'Remove',
            upload: 'Click to upload photo',
        },
        placeholders: {
            summary: 'Write a brief summary about yourself...',
            category: 'Category (e.g., Programming)',
            skills: 'Skills (e.g., C/C++, Python, Java)',
            university: 'University/Institution',
            degree: 'Degree/Certificate',
            dates: 'Dates (e.g., 2018–Present)',
            company: 'Company/Organization',
            position: 'Position/Role',
            bullet: 'Detailed achievement or responsibility...',
            gpa: 'GPA (e.g., 1.9)',
        }
    },
    de: {
        title: 'Lebenslauf',
        subtitle: 'Professioneller Lebenslauf',
        personal: {
            title: 'Persönliche Daten',
            fullName: 'Vollständiger Name',
            photo: 'Profilbild',
            address: 'Anschrift',
            location: 'Wohnort',
            phone: 'Telefon',
            email: 'E-Mail Adresse',
            dob: 'Geburtsdatum',
            github: 'GitHub',
            leetcode: 'LeetCode',
            portfolio: 'Portfolio',
        },
        sections: {
            about: 'Kurzprofil',
            experience: 'Berufliche Praxiserfahrung',
            education: 'Akademischer Werdegang',
            skills: 'Qualifikationen',
            languages: 'Sprachkenntnisse',
            coverLetter: 'Anschreiben',
        },
        actions: {
            addEducation: 'Ausbildung hinzufügen',
            addExperience: 'Erfahrung hinzufügen',
            addBullet: 'Aufgabe hinzufügen',
            addSkill: 'Kompetenzbereich hinzufügen',
            addLanguage: 'Sprache hinzufügen',
            remove: 'Entfernen',
            upload: 'Foto hochladen',
        },
        placeholders: {
            summary: 'Schreiben Sie ein kurzes Profil über sich...',
            category: 'Kategorie (z.B. Programmierung)',
            skills: 'Kenntnisse (z.B. C/C++, Python, Java)',
            university: 'Universität/Einrichtung',
            degree: 'Abschluss/Zertifikat',
            dates: 'Zeitraum (z.B. 2018–Heute)',
            company: 'Unternehmen/Organisation',
            position: 'Position/Rolle',
            bullet: 'Detaillierte Leistung oder Verantwortung...',
            gpa: 'Notenschnitt (z.B. 1.9)',
        }
    }
};
