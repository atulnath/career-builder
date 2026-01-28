'use client';

import React, { useCallback } from 'react';
import {
    FileText,
    GraduationCap,
    Wrench,
    Languages,
    Plus,
    Trash2
} from 'lucide-react';
import { LABELS } from '../lib/constants';
import { CVData } from '@/lib/types';
import { FormSection, TextAreaField } from './CVForm/FormComponents';
import { PersonalSection } from './CVForm/PersonalSection';
import { ExperienceSection } from './CVForm/ExperienceSection';

interface CVFormProps {
    cvData: CVData;
    setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

export default function CVForm({ cvData, setCVData }: CVFormProps) {
    const lang = cvData.language || 'en';
    const labels = LABELS[lang];

    const updateField = useCallback((field: keyof CVData, value: any) => {
        setCVData(prev => ({ ...prev, [field]: value }));
    }, [setCVData]);

    // Education Helpers
    const addEducation = () => {
        setCVData(prev => ({
            ...prev,
            education: [...prev.education, { university: '', dates: '', degree: '', field: '', gpa: '' }],
        }));
    };

    const updateEducation = (index: number, field: string, value: string) => {
        setCVData(prev => {
            const updated = [...prev.education];
            updated[index] = { ...updated[index], [field as any]: value };
            return { ...prev, education: updated };
        });
    };

    const removeEducation = (index: number) => {
        setCVData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index),
        }));
    };

    // Skill Helpers
    const addSkill = () => {
        setCVData(prev => ({ ...prev, skills: [...prev.skills, { category: '', items: '' }] }));
    };

    const updateSkill = (index: number, field: string, value: string) => {
        setCVData(prev => {
            const updated = [...prev.skills];
            updated[index] = { ...updated[index], [field as any]: value };
            return { ...prev, skills: updated };
        });
    };

    const removeSkill = (index: number) => {
        setCVData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="space-y-6">

            {/* 1. Personal Information */}
            <PersonalSection cvData={cvData} updateField={updateField} labels={labels} />

            {/* 2. Professional Summary */}
            <FormSection title={labels.sections.about} icon={<FileText size={22} />} defaultOpen={false}>
                <div className="pt-4">
                    <TextAreaField
                        label={labels.sections.about}
                        placeholder={labels.placeholders.summary}
                        value={cvData.aboutMe}
                        onChange={(e: any) => updateField('aboutMe', e.target.value)}
                    />
                </div>
            </FormSection>

            {/* 3. Experience */}
            <ExperienceSection cvData={cvData} setCVData={setCVData} labels={labels} />

            {/* 4. Education */}
            <FormSection title={labels.sections.education} icon={<GraduationCap size={22} />} defaultOpen={false}>
                <div className="pt-4 space-y-6">
                    {cvData.education?.map((edu, idx) => (
                        <div key={idx} className="bg-slate-900/50 rounded-[32px] p-6 border border-slate-700/50 space-y-5 relative group/edu shadow-2xl">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-600 opacity-0 group-hover/edu:opacity-100 transition-opacity"></div>
                            <div className="flex justify-between items-center border-b border-slate-700/50 pb-4">
                                <span className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-black text-xs">{idx + 1}</span>
                                <button onClick={() => removeEducation(idx)} className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder={labels.placeholders.university} value={edu.university} onChange={(e) => updateEducation(idx, 'university', e.target.value)} className="w-full px-5 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" />
                                <input type="text" placeholder={labels.placeholders.dates} value={edu.dates} onChange={(e) => updateEducation(idx, 'dates', e.target.value)} className="w-full px-5 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type="text" placeholder={labels.placeholders.degree} value={edu.degree} onChange={(e) => updateEducation(idx, 'degree', e.target.value)} className="w-full px-5 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" />
                                <input type="text" placeholder="Specialization" value={edu.field} onChange={(e) => updateEducation(idx, 'field', e.target.value)} className="w-full px-5 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" />
                                <input type="text" placeholder={labels.placeholders.gpa} value={edu.gpa} onChange={(e) => updateEducation(idx, 'gpa', e.target.value)} className="w-full px-5 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" />
                            </div>
                        </div>
                    ))}
                    <button onClick={addEducation} className="w-full flex items-center justify-center gap-3 text-purple-400 hover:text-purple-300 text-sm font-black py-5 border-2 border-dashed border-slate-700/50 rounded-[32px] hover:bg-purple-500/5 hover:border-purple-500/30 transition-all uppercase tracking-widest"><Plus size={20} /> Add Education Record</button>
                </div>
            </FormSection>

            {/* 5. Skills */}
            <FormSection title={labels.sections.skills} icon={<Wrench size={22} />} defaultOpen={false}>
                <div className="pt-4 space-y-6">
                    {cvData.skills?.map((skill, idx) => (
                        <div key={idx} className="bg-slate-900/50 rounded-[32px] p-6 border border-slate-700/50 space-y-4 shadow-2xl">
                            <div className="flex justify-between items-center border-b border-slate-700/50 pb-4">
                                <span className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-black text-xs">{idx + 1}</span>
                                <button onClick={() => removeSkill(idx)} className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                            </div>
                            <input type="text" placeholder={labels.placeholders.category} value={skill.category} onChange={(e) => updateSkill(idx, 'category', e.target.value)} className="w-full px-5 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all" />
                            <textarea placeholder={labels.placeholders.skills} value={skill.items} onChange={(e) => updateSkill(idx, 'items', e.target.value)} className="w-full px-5 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all min-h-[60px] resize-none" />
                        </div>
                    ))}
                    <button onClick={addSkill} className="w-full flex items-center justify-center gap-3 text-emerald-400 hover:text-emerald-300 text-sm font-black py-5 border-2 border-dashed border-slate-700/50 rounded-[32px] hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all uppercase tracking-widest"><Plus size={20} /> Add Skill Category</button>
                </div>
            </FormSection>

            {/* 6. Languages */}
            <FormSection title={labels.sections.languages} icon={<Languages size={22} />} defaultOpen={false}>
                <div className="pt-4 space-y-6">
                    {cvData.languages?.map((langItem, idx) => (
                        <div key={idx} className="bg-slate-900/50 rounded-[32px] p-6 border border-slate-700/50 space-y-4 shadow-2xl">
                            <div className="flex justify-between items-center border-b border-slate-700/50 pb-4">
                                <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-black text-xs">{idx + 1}</span>
                                <button onClick={() => updateField('languages', cvData.languages.filter((_, i) => i !== idx))} className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={18} /></button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Language" value={langItem.name} onChange={(e) => {
                                    const updated = [...cvData.languages];
                                    updated[idx].name = e.target.value;
                                    updateField('languages', updated);
                                }} className="w-full px-5 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" />
                                <input type="text" placeholder="Proficiency" value={langItem.level} onChange={(e) => {
                                    const updated = [...cvData.languages];
                                    updated[idx].level = e.target.value;
                                    updateField('languages', updated);
                                }} className="w-full px-5 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => updateField('languages', [...(cvData.languages || []), { name: '', level: '' }])} className="w-full flex items-center justify-center gap-3 text-blue-400 hover:text-blue-300 text-sm font-black py-5 border-2 border-dashed border-slate-700/50 rounded-[32px] hover:bg-blue-500/5 hover:border-blue-500/30 transition-all uppercase tracking-widest"><Plus size={20} /> Add New Language</button>
                </div>
            </FormSection>
        </div>
    );
}
