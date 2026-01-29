/**
 * useCVData Hook
 * 
 * Custom React hook for managing CV data state with Firebase synchronization.
 * Handles loading, saving, and profile switching operations.
 * 
 * @module hooks/useCVData
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CVData, CVProfile } from '@/lib/types';

/** Save operation status types */
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

/**
 * Main CV Data Management Hook
 * 
 * Provides state management for CV data with Firebase persistence.
 * Automatically loads data when language changes and syncs profile edits.
 * 
 * @param initialData - Default CV data to use before Firebase load
 * @param userId - Firebase user ID for data isolation (null if not logged in)
 * @returns CV data state and management functions
 */
export const useCVData = (initialData: CVData, userId: string | null) => {
    const [cvData, setCVData] = useState<CVData>(initialData);
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

    // =========================================================================
    // FIREBASE DATA LOADING
    // =========================================================================

    /**
     * Load CV data from Firebase when language changes.
     * Data is stored per-language: users/{userId}/cvs/{language}
     */
    useEffect(() => {
        const loadCVData = async () => {
            if (!userId) return;

        try {
          console.log(`[Firebase] Loading data for language: ${cvData.language}`);
          const docRef = doc(db, 'users', userId, 'cvs', cvData.language);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
              const data = docSnap.data() as CVData;
            console.log(`[Firebase] Data loaded successfully`);

            setCVData(prev => {
              // Merge loaded data with current state
              const merged: CVData = {
                  ...prev,
                  ...data,
                language: prev.language, // Keep current language
                // Ensure arrays are never undefined
                applications: data.applications || [],
                coverLetters: data.coverLetters || [],
                interviewPrep: data.interviewPrep || [],
                bookmarks: data.bookmarks || [],
                topSkills: data.topSkills || [],
                experience: data.experience || [],
                education: data.education || [],
                skills: data.skills || [],
                profiles: data.profiles || prev.profiles,
            };

              // Sync active profile data
              const activeProfile = merged.profiles.find(
                  (p: CVProfile) => p.id === merged.activeProfileId
              ) || merged.profiles[0];

              if (activeProfile) {
                  merged.aboutMe = activeProfile.aboutMe;
                  merged.skills = activeProfile.skills;
              }

              return merged;
          });
        } else {
              console.warn(`[Firebase] No document found for: ${cvData.language}`);
          }
      } catch (error) {
          console.error('[Firebase] Error loading CV:', error);
      }
    };

      loadCVData();
  }, [cvData.language, userId]);

    // =========================================================================
    // PROFILE DATA SYNCHRONIZATION
    // =========================================================================

    /**
     * Keep active profile in sync when aboutMe or skills are edited.
     * This ensures profile data stays consistent with the form.
     */
    useEffect(() => {
        setCVData((prev: CVData) => {
        const profileIndex = prev.profiles.findIndex(
            (p: CVProfile) => p.id === prev.activeProfileId
        );
        if (profileIndex === -1) return prev;

        const activeProfile = prev.profiles[profileIndex];

        // Only update if there are actual changes
        const hasChanges =
            activeProfile.aboutMe !== prev.aboutMe ||
            JSON.stringify(activeProfile.skills) !== JSON.stringify(prev.skills);

        if (!hasChanges) return prev;

        // Update the profile with current data
        const updatedProfiles = [...prev.profiles];
        updatedProfiles[profileIndex] = {
            ...activeProfile,
            aboutMe: prev.aboutMe,
          skills: prev.skills,
      };

        return { ...prev, profiles: updatedProfiles };
    });
  }, [cvData.aboutMe, cvData.skills]);

    // =========================================================================
    // FIREBASE SAVE OPERATIONS
    // =========================================================================

    /**
     * Save current CV data to Firebase.
     * Updates the document at users/{userId}/cvs/{language}
     */
    const saveToCloud = async (): Promise<void> => {
        if (!userId) {
        console.error('Cannot save: No user ID provided');
        return;
    }

      console.log(`[Firebase] Saving data for language: ${cvData.language}`);
      setSaveStatus('saving');

      try {
          const docRef = doc(db, 'users', userId, 'cvs', cvData.language);
          await setDoc(docRef, {
              ...cvData,
          updatedAt: new Date().toISOString(),
      });

        console.log('[Firebase] Save successful');
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
          console.error('[Firebase] Error saving CV:', error);
          setSaveStatus('error');
          setTimeout(() => setSaveStatus('idle'), 3000);
      }
  };

    // =========================================================================
    // PROFILE MANAGEMENT
    // =========================================================================

    /** Switch to a different CV profile */
    const switchProfile = useCallback((profileId: string): void => {
        setCVData((prev: CVData) => {
        const selectedProfile = prev.profiles.find(
            (p: CVProfile) => p.id === profileId
        );
        if (!selectedProfile) return prev;

        return {
            ...prev,
            activeProfileId: profileId,
            aboutMe: selectedProfile.aboutMe,
            skills: selectedProfile.skills,
        };
    });
  }, []);

    /** Create a new profile based on current data */
    const addProfile = useCallback((): void => {
        const newId = `profile-${Date.now()}`;

      setCVData((prev: CVData) => {
          const newProfile: CVProfile = {
              id: newId,
              name: 'New Application',
              aboutMe: prev.aboutMe,
          skills: JSON.parse(JSON.stringify(prev.skills)), // Deep copy
      };

        return {
            ...prev,
            profiles: [...prev.profiles, newProfile],
            activeProfileId: newId,
        };
    });
  }, []);

    /** Delete a profile (cannot delete the last one) */
    const removeProfile = useCallback((profileId: string): void => {
        setCVData((prev: CVData) => {
        if (prev.profiles.length <= 1) return prev; // Keep at least one

        const updatedProfiles = prev.profiles.filter(
            (p: CVProfile) => p.id !== profileId
        );
        const newActiveId =
            profileId === prev.activeProfileId
                ? updatedProfiles[0].id
                : prev.activeProfileId;
        const nextProfile = updatedProfiles.find(
            (p: CVProfile) => p.id === newActiveId
        )!;

        return {
            ...prev,
            profiles: updatedProfiles,
            activeProfileId: newActiveId,
            aboutMe: nextProfile.aboutMe,
            skills: nextProfile.skills,
        };
    });
  }, []);

    /** Rename a profile */
    const updateProfileName = useCallback((profileId: string, name: string): void => {
        setCVData((prev: CVData) => ({
            ...prev,
        profiles: prev.profiles.map((p: CVProfile) =>
            p.id === profileId ? { ...p, name } : p
        ),
    }));
  }, []);

    // =========================================================================
    // GENERIC FIELD UPDATE
    // =========================================================================

    /** Update any field in CV data */
    const updateField = useCallback(<K extends keyof CVData>(
        field: K,
        value: CVData[K]
    ): void => {
        setCVData(prev => ({ ...prev, [field]: value }));
    }, []);

    // =========================================================================
    // RETURN API
    // =========================================================================

    return {
      // State
      cvData,
      setCVData,
      saveStatus,

      // Firebase operations
      saveToCloud,

      // Profile management
      switchProfile,
      addProfile,
      removeProfile,
      updateProfileName,

      // Generic update
      updateField,
  };
};
