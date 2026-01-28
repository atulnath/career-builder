'use client';

import React from 'react';
import { User, MapPin, Phone, Mail, Calendar, Link, Camera, Trash2, Upload, Globe } from 'lucide-react';
import { FormSection, InputField } from './FormComponents';
import { CVData } from '@/lib/types';

interface PersonalSectionProps {
    cvData: CVData;
    updateField: (field: keyof CVData, value: any) => void;
    labels: any;
}

export const PersonalSection: React.FC<PersonalSectionProps> = ({ cvData, updateField, labels }) => {
    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 400;
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height = (MAX_WIDTH / width) * height;
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                updateField('photoUrl', compressedBase64);
            };
        };
    };

    return (
        <FormSection title={labels.personal.title} icon={<User size={22} />} defaultOpen={true}>
            <div className="space-y-6 pt-4">
                <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                        <Camera size={14} />
                        {labels.personal.photo}
                    </label>
                    <div className="flex items-start gap-6">
                        <div className="relative group">
                            <div className="w-28 h-28 rounded-3xl overflow-hidden border-2 border-slate-700 bg-slate-900/80 flex-shrink-0 shadow-2xl transition-transform group-hover:scale-105 duration-300 flex items-center justify-center">
                                {cvData.photoUrl ? (
                                    <img src={cvData.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-600 bg-gradient-to-br from-slate-900 to-slate-800">
                                        <User size={40} />
                                    </div>
                                )}
                            </div>
                            {cvData.photoUrl && (
                                <button
                                    onClick={() => updateField('photoUrl', '')}
                                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors border-2 border-slate-900"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                        <div className="flex-1 space-y-3">
                            <div
                                className="border-2 border-dashed border-slate-700/50 rounded-3xl p-5 text-center transition-all cursor-pointer group/upload hover:border-blue-500/50 hover:bg-blue-500/5"
                                onClick={() => document.getElementById('photo-upload')?.click()}
                            >
                                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover/upload:bg-blue-600 transition-colors">
                                    <Upload size={20} className="text-slate-400 group-hover/upload:text-white" />
                                </div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover/upload:text-slate-200">
                                    {labels.actions.upload}
                                </p>
                                <p className="text-[10px] text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                            </div>
                            <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                        </div>
                    </div>
                </div>

                <InputField
                    label={labels.personal.fullName}
                    icon={<User size={12} />}
                    placeholder="John Doe"
                    value={cvData.fullName}
                    onChange={(e: any) => updateField('fullName', e.target.value)}
                />

                <InputField
                    label={labels.personal.address}
                    icon={<MapPin size={12} />}
                    placeholder="Reichenhainer Str. 51, 09126 Chemnitz"
                    value={cvData.address}
                    onChange={(e: any) => updateField('address', e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label={labels.personal.location} icon={<MapPin size={12} />} placeholder="Germany" value={cvData.location} onChange={(e: any) => updateField('location', e.target.value)} />
                    <InputField label={labels.personal.phone} icon={<Phone size={12} />} type="tel" placeholder="+49 123 456789" value={cvData.phone} onChange={(e: any) => updateField('phone', e.target.value)} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label={labels.personal.email} icon={<Mail size={12} />} type="email" placeholder="john@example.com" value={cvData.email} onChange={(e: any) => updateField('email', e.target.value)} />
                    <InputField label={labels.personal.dob} icon={<Calendar size={12} />} placeholder="01/01/1990 in Berlin, DE" value={cvData.dateOfBirth} onChange={(e: any) => updateField('dateOfBirth', e.target.value)} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label={labels.personal.github} icon={<Link size={12} />} placeholder="github.com/username" value={cvData.github} onChange={(e: any) => updateField('github', e.target.value)} />
                    <InputField label={labels.personal.leetcode} icon={<Link size={12} />} placeholder="leetcode.com/username" value={cvData.leetcode} onChange={(e: any) => updateField('leetcode', e.target.value)} />
                </div>

                <InputField label={labels.personal.portfolio} icon={<Globe size={12} />} placeholder="portfolio.com" value={cvData.portfolio} onChange={(e: any) => updateField('portfolio', e.target.value)} />
            </div>
        </FormSection>
    );
};
