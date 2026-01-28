'use client';

import React from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { FormSection } from './FormComponents';
import { CVData } from '@/lib/types';

interface ExperienceSectionProps {
    cvData: CVData;
    setCVData: React.Dispatch<React.SetStateAction<CVData>>;
    labels: any;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ cvData, setCVData, labels }) => {
    const addExperience = () => {
        setCVData(prev => ({
            ...prev,
            experience: [...prev.experience, { company: '', position: '', dates: '', bullets: [''] }],
        }));
    };

    const updateExperience = (index: number, field: string, value: any) => {
        setCVData(prev => {
            const updated = [...prev.experience];
            updated[index] = { ...updated[index], [field as any]: value };
            return { ...prev, experience: updated };
        });
    };

    const removeExperience = (index: number) => {
        setCVData(prev => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index),
        }));
    };

    const addBullet = (expIndex: number) => {
        setCVData(prev => {
            const updated = [...prev.experience];
            updated[expIndex].bullets = [...updated[expIndex].bullets, ''];
            return { ...prev, experience: updated };
        });
    };

    const removeBullet = (expIndex: number, bulletIndex: number) => {
        setCVData(prev => {
            const updated = [...prev.experience];
            updated[expIndex].bullets = updated[expIndex].bullets.filter((_, i) => i !== bulletIndex);
            return { ...prev, experience: updated };
        });
    };

    return (
        <FormSection title={labels.sections.experience} icon={<Briefcase size={22} />} defaultOpen={false}>
            <div className="pt-4 space-y-8">
                {cvData.experience?.map((exp, expIdx) => (
                    <div key={expIdx} className="bg-slate-900/50 rounded-[32px] p-6 border border-slate-700/50 space-y-5 relative overflow-hidden group/card shadow-2xl">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                        <div className="flex justify-between items-center border-b border-slate-700/50 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-black text-xs">{expIdx + 1}</div>
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Experience Entry</h4>
                            </div>
                            <button onClick={() => removeExperience(expIdx)} className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300"><Trash2 size={18} /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder={labels.placeholders.company} value={exp.company} onChange={(e) => updateExperience(expIdx, 'company', e.target.value)} spellCheck={false} className="w-full px-5 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" />
                            <input type="text" placeholder={labels.placeholders.dates} value={exp.dates} onChange={(e) => updateExperience(expIdx, 'dates', e.target.value)} className="w-full px-5 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" />
                        </div>
                        <input type="text" placeholder={labels.placeholders.position} value={exp.position} onChange={(e) => updateExperience(expIdx, 'position', e.target.value)} spellCheck={false} className="w-full px-5 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" />
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Responsibilities & Achievements</p>
                            </div>
                            {exp.bullets.map((bullet, bIdx) => (
                                <div key={bIdx} className="flex gap-3 group/bullet">
                                    <textarea
                                        placeholder={labels.placeholders.bullet}
                                        value={bullet}
                                        onChange={(e) => {
                                            const updatedBullets = [...exp.bullets];
                                            updatedBullets[bIdx] = e.target.value;
                                            updateExperience(expIdx, 'bullets', updatedBullets);
                                        }}
                                        className="w-full px-5 py-4 bg-slate-800/20 border border-slate-700/30 rounded-2xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all min-h-[80px]"
                                        spellCheck={false}
                                    />
                                    <button onClick={() => removeBullet(expIdx, bIdx)} className="p-3 self-center text-slate-600 hover:text-red-400 opacity-0 group-hover/bullet:opacity-100 transition-all"><Trash2 size={16} /></button>
                                </div>
                            ))}
                            <button onClick={() => addBullet(expIdx)} className="flex items-center gap-2 text-xs font-black text-blue-400 hover:text-blue-300 transition-all bg-blue-500/5 px-4 py-2 rounded-xl border border-blue-500/10 hover:border-blue-500/30"><Plus size={16} /> ADD BULLET POINT</button>
                        </div>
                    </div>
                ))}
                <button onClick={addExperience} className="w-full flex items-center justify-center gap-3 text-blue-400 hover:text-blue-300 text-sm font-black py-5 border-2 border-dashed border-slate-700/50 rounded-[32px] hover:bg-blue-500/5 hover:border-blue-500/30 transition-all uppercase tracking-widest"><Plus size={20} /> Add Professional Experience</button>
            </div>
        </FormSection>
    );
};
