'use client';

import { useState, useEffect, useCallback } from 'react';

import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CVData, CVProfile } from '@/lib/types';

export const useCVData = (initialData: CVData, userId: string | null) => {
    const [cvData, setCVData] = useState<CVData>(initialData);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

    // Load CV data from Firebase when language changes
    useEffect(() => {
        const loadCVData = async () => {
            if (!userId) return;

            try {
                console.log(`[Firebase] Attempting to load data for language: ${cvData.language}`);
                // Path: users/{userId}/cvs/{language}
                const docRef = doc(db, 'users', userId, 'cvs', cvData.language);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as CVData;
                    console.log(`[Firebase] Data loaded successfully for: ${cvData.language}`);

                    setCVData(prev => {
                        const merged = {
                            ...prev,
                            ...data,
                            language: prev.language, // Keep the language user just switched to
                            // Safeguards for arrays
                            applications: data.applications || [],
                            coverLetters: data.coverLetters || [],
                            interviewPrep: data.interviewPrep || [],
                            topSkills: data.topSkills || [],
                            experience: data.experience || [],
                            education: data.education || [],
                            skills: data.skills || []
                        };

                        const activeProfile = merged.profiles.find((p: CVProfile) => p.id === merged.activeProfileId) || merged.profiles[0];
                        if (activeProfile) {
                            merged.aboutMe = activeProfile.aboutMe;
                            merged.skills = activeProfile.skills;
                        }

                        return merged;
                    });

                } else {
                    console.warn(`[Firebase] No document found for: ${cvData.language}. Keeping current state but switching language.`);
                    setCVData(prev => ({ ...prev, language: prev.language })); // Force trigger state consistency if needed
                }
            } catch (error) {
                console.error("[Firebase] Error loading CV:", error);
            }

        };
        loadCVData();
    }, [cvData.language, userId]);

    // Sync active profile data when aboutMe or skills change
    useEffect(() => {
        setCVData((prev: CVData) => {
            const profileIndex = prev.profiles.findIndex((p: CVProfile) => p.id === prev.activeProfileId);
            if (profileIndex === -1) return prev;

            const activeProfile = prev.profiles[profileIndex];
            if (activeProfile.aboutMe === prev.aboutMe &&
                JSON.stringify(activeProfile.skills) === JSON.stringify(prev.skills)) {
                return prev;
            }

            const updatedProfiles = [...prev.profiles];
            updatedProfiles[profileIndex] = {
                ...activeProfile,
                aboutMe: prev.aboutMe,
                skills: prev.skills
            };

            return { ...prev, profiles: updatedProfiles };
        });
    }, [cvData.aboutMe, cvData.skills]);

    const saveToCloud = async () => {
        if (!userId) {
            console.error("Cannot save: No user ID provided");
            return;
        }

        console.log(`[Firebase] Starting save to cloud for language: ${cvData.language}`);
        setSaveStatus('saving');
        try {
            const docRef = doc(db, 'users', userId, 'cvs', cvData.language);
            await setDoc(docRef, {
                ...cvData,
                updatedAt: new Date().toISOString()
            });
            console.log(`[Firebase] Save successful for: ${cvData.language}`);
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 3000);
        } catch (error) {
            console.error("[Firebase] Error saving CV:", error);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 3000);
        }
    };

    const switchProfile = useCallback((profileId: string) => {
        setCVData((prev: CVData) => {
            const selectedProfile = prev.profiles.find((p: CVProfile) => p.id === profileId);
            if (!selectedProfile) return prev;
            return {
                ...prev,
                activeProfileId: profileId,
                aboutMe: selectedProfile.aboutMe,
                skills: selectedProfile.skills
            };
        });
    }, []);

    const addProfile = useCallback(() => {
        const newId = `profile-${Date.now()}`;
        setCVData((prev: CVData) => {
            const newProfile: CVProfile = {
                id: newId,
                name: 'New Application',
                aboutMe: prev.aboutMe,
                skills: JSON.parse(JSON.stringify(prev.skills)),
            };
            return {
                ...prev,
                profiles: [...prev.profiles, newProfile],
                activeProfileId: newId
            };
        });
    }, []);

    const removeProfile = useCallback((profileId: string) => {
        setCVData((prev: CVData) => {
            if (prev.profiles.length <= 1) return prev;
            const updatedProfiles = prev.profiles.filter((p: CVProfile) => p.id !== profileId);
            const newActiveId = profileId === prev.activeProfileId ? updatedProfiles[0].id : prev.activeProfileId;
            const nextProfile = updatedProfiles.find((p: CVProfile) => p.id === newActiveId)!;

            return {
                ...prev,
                profiles: updatedProfiles,
                activeProfileId: newActiveId,
                aboutMe: nextProfile.aboutMe,
                skills: nextProfile.skills
            };
        });
    }, []);

    const updateProfileName = useCallback((profileId: string, name: string) => {
        setCVData((prev: CVData) => ({
            ...prev,
            profiles: prev.profiles.map((p: CVProfile) => p.id === profileId ? { ...p, name } : p)
        }));
    }, []);

    const updateField = useCallback((field: keyof CVData, value: any) => {
        setCVData(prev => ({ ...prev, [field]: value }));
    }, []);

    return {
        cvData,
        setCVData,
        saveStatus,
        saveToCloud,
        switchProfile,
        addProfile,
        removeProfile,
        updateProfileName,
        updateField
    };
};
