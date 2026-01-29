'use client';

import React from 'react';
import { CVData } from '@/lib/types';

const renderWithLinks = (text: string) => {
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const rawUrlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = markdownLinkRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(
            <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold">
                {match[1]}
            </a>
        );
        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
        const remaining = text.substring(lastIndex);
        const rawParts = remaining.split(rawUrlRegex);
        rawParts.forEach((part, i) => {
            if (part.match(rawUrlRegex)) {
                parts.push(
                    <a key={`raw-${i}`} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {part}
                    </a>
                );
            } else {
                parts.push(part);
            }
        });
    }
    return parts;
};

export const PreviewMain: React.FC<{ cvData: CVData; labels: any }> = ({ cvData, labels }) => (
    <div className="p-10 space-y-12 bg-white">
        {cvData.aboutMe && (
            <section id="preview-about">
                <h2 className="text-[14px] font-black text-[#2c3e50] uppercase tracking-[0.25em] mb-4 flex items-center">
                    <span className="w-8 h-[2px] bg-[#2c3e50] mr-4"></span>
                    {labels.sections.about}
                </h2>
                <p className="text-[14px] text-slate-600 leading-[1.8] text-left font-medium px-4 border-l-2 border-slate-100 italic">

                    "{cvData.aboutMe}"
                </p>
            </section>
        )}

        <section id="preview-experience">
            <h2 className="text-[14px] font-black text-[#2c3e50] uppercase tracking-[0.25em] mb-8 flex items-center">
                <span className="w-8 h-[2px] bg-[#2c3e50] mr-4"></span>
                {labels.sections.experience}
            </h2>
            <div className="space-y-10">
                {cvData.experience?.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-slate-100 hover:border-blue-500 transition-colors">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-500"></div>
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="font-black text-lg text-slate-900 tracking-tight">{exp.company}</h3>
                            <span className="text-[12px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-widest">{exp.dates}</span>
                        </div>
                        <p className="text-[14px] font-bold text-blue-600 mb-3 uppercase tracking-wider">{exp.position}</p>
                        <ul className="space-y-2 text-[13.5px] text-slate-600 leading-relaxed font-medium">
                            {exp.bullets?.filter(b => b.trim()).map((bullet, bIdx) => (
                                <li key={bIdx} className="flex items-start">
                                    <span className="text-blue-500 mr-3 mt-[6px] font-bold">›</span>
                                    <span>{renderWithLinks(bullet)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>

        <section id="preview-education">
            <h2 className="text-[14px] font-black text-[#2c3e50] uppercase tracking-[0.25em] mb-8 flex items-center">
                <span className="w-8 h-[2px] bg-[#2c3e50] mr-4"></span>
                {labels.sections.education}
            </h2>
            <div className="grid grid-cols-1 gap-6">
                {cvData.education?.map((edu, idx) => (
                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl transition-all group">
                        <div className="flex justify-between items-start mb-2">
                            <div className="space-y-1">
                                <h3 className="font-black text-[16px] text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{edu.university}</h3>
                                <p className="text-[15px] font-bold text-slate-800">{edu.degree}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-[12px] font-black text-slate-400 bg-white px-3 py-1 rounded-full shadow-sm">{edu.dates}</span>
                                {edu.gpa && <span className="text-[12px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full shadow-sm whitespace-nowrap">GPA: {edu.gpa}</span>}
                            </div>
                        </div>
                        {edu.field && <p className="text-[14px] text-slate-500 font-medium tracking-wide">Specialization in {edu.field}</p>}
                    </div>
                ))}
            </div>
        </section>
    </div>
);
