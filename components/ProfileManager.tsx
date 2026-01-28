'use client';

import React from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { CVData, CVProfile } from '@/lib/types';

interface ProfileManagerProps {
    cvData: CVData;
    addProfile: () => void;
    switchProfile: (id: string) => void;
    removeProfile: (id: string) => void;
    updateProfileName: (id: string, name: string) => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({
    cvData,
    addProfile,
    switchProfile,
    removeProfile,
    updateProfileName
}) => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-700/50 p-6 mb-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Briefcase className="text-white w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Application Type / Profile</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Switch profiles to tailor your CV</p>
                    </div>
                </div>
                <button
                    onClick={addProfile}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-[11px] font-black tracking-widest transition-all shadow-lg shadow-blue-500/20"
                >
                    <Plus size={14} /> NEW PROFILE
                </button>
            </div>

            <div className="flex flex-wrap gap-3">
                {cvData.profiles.map((profile: CVProfile) => (
                    <div
                        key={profile.id}
                        className={`group relative flex items-center gap-3 p-1.5 pl-5 rounded-2xl border transition-all duration-500 ${cvData.activeProfileId === profile.id
                                ? 'bg-blue-600/15 border-blue-500/50 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.15)] ring-1 ring-blue-500/30'
                                : 'bg-slate-800/40 border-slate-700/50 text-slate-500 hover:border-slate-600 hover:bg-slate-800/60'
                            }`}
                    >
                        <button
                            onClick={() => switchProfile(profile.id)}
                            className="flex items-center gap-2 py-1.5"
                        >
                            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${cvData.activeProfileId === profile.id ? 'bg-blue-400 scale-125 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'bg-slate-700'}`}></div>
                            <span className={`text-[11px] font-black tracking-widest uppercase transition-colors ${cvData.activeProfileId === profile.id ? 'text-white' : 'group-hover:text-slate-300'}`}>
                                {profile.name}
                            </span>
                        </button>

                        {cvData.activeProfileId === profile.id && (
                            <div className="flex items-center gap-2 border-l border-slate-700/50 pl-2 ml-1">
                                <input
                                    type="text"
                                    defaultValue={profile.name}
                                    onBlur={(e) => updateProfileName(profile.id, e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                                    className="bg-slate-950/50 border border-slate-700/50 rounded-xl px-3 py-1.5 text-[10px] font-bold text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 w-36 transition-all"
                                    placeholder="Application title..."
                                />
                                {cvData.profiles.length > 1 && (
                                    <button
                                        onClick={() => removeProfile(profile.id)}
                                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                                        title="Delete Profile"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileManager;
