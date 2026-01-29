'use client';

import React from 'react';
import { CVData } from '@/lib/types';

const HomeIcon = () => (
    <svg className="w-3.5 h-3.5 inline-block mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const LocationIcon = () => (
    <svg className="w-3.5 h-3.5 inline-block mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const PhoneIcon = () => (
    <svg className="w-3.5 h-3.5 inline-block mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const MailIcon = () => (
    <svg className="w-3.5 h-3.5 inline-block mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-3.5 h-3.5 inline-block mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const LinkIcon = () => (
    <svg className="w-3.5 h-3.5 inline-block mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);

const LeetcodeIcon = () => (
    <svg className="w-3.5 h-3.5 inline-block mr-2 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-4.377 4.406a.549.549 0 0 0 .005.772l.982.903a.451.451 0 0 0 .593.03l4.362-4.307a.549.549 0 0 1 .774.006l8.581 8.665a.549.549 0 0 1 0 .778l-14.656 14.853a.549.549 0 0 1-.778 0l-4.483-4.541a.549.549 0 0 1 0-.778l2.42-2.435a.549.549 0 0 1 .778 0l1.372 1.33a.451.451 0 0 0 .546.035l.004-.004c.158-.126.144-.333.028-.485L6.442 16.03a.549.549 0 0 0-.78 0l-2.422 2.456a.549.549 0 0 0 0 .782l4.483 4.541a1.374 1.374 0 0 0 1.954 0l14.656-14.853a1.374 1.374 0 0 0 0-1.957L15.426.414A1.374 1.374 0 0 0 13.483 0z" />
    </svg>
);

export const PreviewSidebar: React.FC<{ cvData: CVData; labels: any }> = ({ cvData, labels }) => (
    <div className="bg-[#f8fafc] p-8 space-y-12 border-r border-slate-200">
        <section id="preview-personal">
            <h2 className="text-[11px] font-black text-[#2c3e50] uppercase tracking-[0.2em] mb-6 border-b-2 border-[#2c3e50] pb-1 inline-block">
                {labels.personal.title}
            </h2>
            <div className="space-y-4 text-[12.5px] text-slate-600">
                {cvData.address && (
                    <div className="group">
                        <p className="font-bold text-slate-900 flex items-center mb-1 group-hover:text-blue-600 transition-colors"><HomeIcon /> {labels.personal.address}</p>
                        <p className="pl-6 leading-relaxed">{cvData.address}</p>
                    </div>
                )}
                {cvData.location && (
                    <div>
                        <p className="font-bold text-slate-900 flex items-center mb-1"><LocationIcon /> {labels.personal.location}</p>
                        <p className="pl-6">{cvData.location}</p>
                    </div>
                )}
                {cvData.phone && (
                    <div>
                        <p className="font-bold text-slate-900 flex items-center mb-1"><PhoneIcon /> {labels.personal.phone}</p>
                        <p className="pl-6">{cvData.phone}</p>
                    </div>
                )}
                {cvData.email && (
                    <div className="break-all">
                        <p className="font-bold text-slate-900 flex items-center mb-1"><MailIcon /> {labels.personal.email}</p>
                        <p className="pl-6">{cvData.email}</p>
                    </div>
                )}
                {cvData.dateOfBirth && (
                    <div>
                        <p className="font-bold text-slate-900 flex items-center mb-1"><CalendarIcon /> {labels.personal.dob}</p>
                        <p className="pl-6">{cvData.dateOfBirth}</p>
                    </div>
                )}
                {cvData.github && (
                    <div className="break-all">
                        <p className="font-bold text-slate-900 flex items-center mb-1"><LinkIcon /> GitHub</p>
                        <p className="pl-6">
                            <a href={`https://${cvData.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                                {cvData.github}
                            </a>
                        </p>
                    </div>
                )}
                {cvData.leetcode && (
                    <div className="break-all">
                        <p className="font-bold text-slate-900 flex items-center mb-1"><LeetcodeIcon /> LeetCode</p>
                        <p className="pl-6">
                            <a href={`https://${cvData.leetcode}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                                {cvData.leetcode.replace('https://', '')}
                            </a>
                        </p>
                    </div>
                )}
                {cvData.portfolio && (
                    <div className="break-all">
                        <p className="font-bold text-slate-900 flex items-center mb-1"><LinkIcon /> Portfolio</p>
                        <p className="pl-6">
                            <a href={`https://${cvData.portfolio}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                                {cvData.portfolio.replace('https://', '')}
                            </a>
                        </p>
                    </div>
                )}

            </div>
        </section>

        <section id="preview-skills">
            <h2 className="text-[11px] font-black text-[#2c3e50] uppercase tracking-[0.2em] mb-6 border-b-2 border-[#2c3e50] pb-1 inline-block">
                {labels.sections.skills}
            </h2>
            <div className="space-y-5 text-[12.5px]">
                {cvData.skills?.map((skill, idx) => (
                    <div key={idx} className="space-y-1">
                        <p className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">{skill.category}</p>
                        <p className="text-slate-600 leading-relaxed font-medium">{skill.items}</p>
                    </div>
                ))}
            </div>
        </section>

        <section id="preview-languages">
            <h2 className="text-[11px] font-black text-[#2c3e50] uppercase tracking-[0.2em] mb-6 border-b-2 border-[#2c3e50] pb-1 inline-block">
                {labels.sections.languages}
            </h2>
            <div className="space-y-4">
                {cvData.languages?.map((langItem, idx) => (
                    <div key={idx} className="flex justify-between items-center group">
                        <div className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                            <span className="text-[13px] font-bold text-slate-900">{langItem.name}</span>
                        </div>
                        <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{langItem.level}</span>
                    </div>
                ))}
            </div>
        </section>
    </div>
);
