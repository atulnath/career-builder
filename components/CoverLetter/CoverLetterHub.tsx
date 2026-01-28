'use client';

import React, { useState } from 'react';
import {
    Plus,
    FileText,
    Trash2,
    Copy,
    Download,
    Building2,
    Briefcase,
    Layers,
    Search,
    CheckCircle2,
    X,
    Calendar,
    User,
    // Sparkles, // Removed
    // Loader2, // Removed
    // Globe, // Removed
    // Target // Removed
} from 'lucide-react';

import { CVData, CoverLetter } from '@/lib/types';
import LetterPreview from './LetterPreview';
import { generateLetterPDF } from '@/lib/letterGenerator';
import { generateLetter_DOCX } from '@/lib/docxGenerator';
import { LABELS } from '@/lib/constants';
// import { generateCoverLetterAI, AIInput } from '@/lib/ai/generator'; // Removed




interface CoverLetterHubProps {
    cvData: CVData;
    setCVData: (data: any) => void;
}

const CoverLetterHub: React.FC<CoverLetterHubProps> = ({ cvData, setCVData }) => {
    const [activeLetterId, setActiveLetterId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    // AI State removed


    const lang = cvData.language || 'en';
    const labels = LABELS[lang];


    const activeLetter = cvData.coverLetters?.find(l => l.id === activeLetterId);

    // handleAIGenerate removed


    const addLetter = () => {
        const newLetter: CoverLetter = {
            id: `cl-${Date.now()}`,
            title: 'Computer Vision Engineer',
            company: 'Innovate AI GmbH',
            content: 'I am highly interested in the position as [Role] at [Company]. Given my background in [Your Key Skill] and my research experience at [University]...',
            lastModified: new Date().toISOString().split('T')[0],
        };

        setCVData((prev: CVData) => ({
            ...prev,
            coverLetters: [newLetter, ...(prev.coverLetters || [])]
        }));
        setActiveLetterId(newLetter.id);
    };

    const updateLetter = (id: string, updates: Partial<CoverLetter>) => {
        setCVData((prev: CVData) => ({
            ...prev,
            coverLetters: prev.coverLetters.map(l => l.id === id ? { ...l, ...updates, lastModified: new Date().toISOString().split('T')[0] } : l)
        }));
    };

    const deleteLetter = (id: string) => {
        setCVData((prev: CVData) => ({
            ...prev,
            coverLetters: prev.coverLetters.filter(l => l.id !== id)
        }));
        if (activeLetterId === id) setActiveLetterId(null);
    };

    const filteredLetters = (cvData.coverLetters || []).filter(l =>
        l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (l.company || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-[calc(100vh-160px)] animate-in fade-in duration-500">
            {/* Header Actions */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-4xl font-black text-white mb-2 leading-tight">Industry <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{labels.sections.coverLetter}</span></h2>
                    <p className="text-slate-400 text-lg">Format: {lang === 'de' ? 'Deutscher DIN 5008 Standard' : 'Professional DIN 5008 Standard'} • Optimized for ATS</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* AI Button Removed */}
                    <button
                        onClick={addLetter}
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-8 py-4 rounded-2xl font-black text-sm transition-all border border-slate-700/50"
                    >
                        <Plus size={18} />
                        NEW BLANK
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[400px_1fr_500px] gap-8 min-h-0">
                {/* Navigation & List */}
                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-[32px] p-6 flex flex-col min-h-0">
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                            type="text"
                            placeholder="Filter by role or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-950/50 border border-slate-800/50 rounded-2xl py-3 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/30 transition-all font-medium"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
                        {filteredLetters.map((letter) => (
                            <button
                                key={letter.id}
                                onClick={() => setActiveLetterId(letter.id)}
                                className={`w-full text-left p-5 rounded-2xl border transition-all group relative overflow-hidden ${activeLetterId === letter.id
                                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl shadow-emerald-500/10'
                                    : 'bg-slate-800/20 border-slate-800/50 text-slate-400 hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`p-2 rounded-lg ${activeLetterId === letter.id ? 'bg-white/20' : 'bg-emerald-500/10'}`}>
                                        <FileText size={16} className={activeLetterId === letter.id ? 'text-white' : 'text-emerald-400'} />
                                    </div>
                                    <span className="text-[10px] font-bold opacity-60 uppercase">{letter.lastModified}</span>
                                </div>
                                <p className="font-black text-sm mb-1 truncate">{letter.title}</p>
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${activeLetterId === letter.id ? 'text-emerald-100' : 'text-slate-500'}`}>
                                    {letter.company || 'Direct Application'}
                                </p>
                            </button>
                        ))}
                        {filteredLetters.length === 0 && (
                            <div className="text-center py-20 opacity-30">
                                <Layers size={40} className="mx-auto mb-4" />
                                <p className="text-xs font-black uppercase tracking-widest">No Documents Found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Professional Editor */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-[40px] flex flex-col shadow-2xl overflow-hidden min-h-0">
                    {activeLetter ? (
                        <div className="flex flex-col h-full animate-in fade-in slide-in-from-left-4 duration-300">
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                                <div className="space-y-8 animate-in fade-in duration-300">
                                    {/* Essential Role & Company Container */}
                                    <div className="bg-slate-800/20 border border-slate-700/30 rounded-[32px] p-6 space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Target Position</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                                                    <input
                                                        type="text"
                                                        value={activeLetter.title}
                                                        onChange={(e) => updateLetter(activeLetter.id, { title: e.target.value })}
                                                        className="w-full bg-slate-900/40 border border-slate-700/50 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all font-bold"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Company Name</label>
                                                <div className="relative">
                                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. BMW Group"
                                                        value={activeLetter.company || ''}
                                                        onChange={(e) => updateLetter(activeLetter.id, { company: e.target.value })}
                                                        className="w-full bg-slate-900/40 border border-slate-700/50 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all font-bold"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Logistics & Recipient Container */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-slate-800/10 border border-slate-700/20 rounded-[32px] p-6 space-y-4">
                                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                <Calendar size={14} /> Logistics
                                            </h4>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400/50 uppercase tracking-widest pl-1">Your Current City</label>
                                                <input
                                                    type="text"
                                                    placeholder={cvData.location || "City Name"}
                                                    value={activeLetter.senderCity || ''}
                                                    onChange={(e) => updateLetter(activeLetter.id, { senderCity: e.target.value })}
                                                    className="w-full bg-slate-950/30 border border-slate-700/30 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-emerald-500/30 font-medium"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400/50 uppercase tracking-widest pl-1">Letter Date</label>
                                                <input
                                                    type="date"
                                                    value={activeLetter.customDate || ''}
                                                    onChange={(e) => updateLetter(activeLetter.id, { customDate: e.target.value })}
                                                    className="w-full bg-slate-950/30 border border-slate-700/30 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-emerald-500/30 font-medium color-scheme-dark"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400/50 uppercase tracking-widest pl-1">Salutation</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Dear Manager,"
                                                        value={activeLetter.salutation || ''}
                                                        onChange={(e) => updateLetter(activeLetter.id, { salutation: e.target.value })}
                                                        className="w-full bg-slate-950/30 border border-slate-700/30 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-emerald-500/30 font-medium"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400/50 uppercase tracking-widest pl-1">Closing</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Sincerely,"
                                                        value={activeLetter.closing || ''}
                                                        onChange={(e) => updateLetter(activeLetter.id, { closing: e.target.value })}
                                                        className="w-full bg-slate-950/30 border border-slate-700/30 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-emerald-500/30 font-medium"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-800/10 border border-slate-700/20 rounded-[32px] p-6 space-y-4">
                                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                <User size={14} /> Recipient
                                            </h4>
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    placeholder="Recipient Name (e.g. Jane Doe)"
                                                    value={activeLetter.recipientName || ''}
                                                    onChange={(e) => updateLetter(activeLetter.id, { recipientName: e.target.value })}
                                                    className="w-full bg-slate-950/30 border border-slate-700/30 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-emerald-500/30 font-medium"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Address"
                                                    value={activeLetter.recipientAddress || ''}
                                                    onChange={(e) => updateLetter(activeLetter.id, { recipientAddress: e.target.value })}
                                                    className="w-full bg-slate-950/30 border border-slate-700/30 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-emerald-500/30 font-medium"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="City/ZIP"
                                                    value={activeLetter.recipientCity || ''}
                                                    onChange={(e) => updateLetter(activeLetter.id, { recipientCity: e.target.value })}
                                                    className="w-full bg-slate-950/30 border border-slate-700/30 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-emerald-500/30 font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Professional Content (Body)</label>
                                        <textarea
                                            value={activeLetter.content}
                                            onChange={(e) => updateLetter(activeLetter.id, { content: e.target.value })}
                                            className="min-h-[500px] w-full bg-slate-800/20 border border-slate-700/30 rounded-[32px] p-8 text-slate-300 focus:outline-none focus:border-emerald-500/30 transition-all font-sans text-sm leading-relaxed resize-none custom-scrollbar"
                                            placeholder="Write your cover letter here..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-950/20 border-t border-slate-800 shrink-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-emerald-500" size={16} />
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                                            Letter is saved and ready
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigator.clipboard.writeText(activeLetter.content)}
                                            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-[10px] font-black transition-all border border-slate-700/50"
                                        >
                                            <Copy size={14} /> COPY CONTENT
                                        </button>
                                        <button
                                            onClick={() => deleteLetter(activeLetter.id)}
                                            className="p-3 text-slate-600 hover:text-red-400 transition-colors bg-red-500/5 rounded-2xl border border-red-500/10"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                            <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[40px] flex items-center justify-center mb-8 border border-slate-800/50 shadow-2xl">
                                <FileText size={40} className="text-slate-600" />
                            </div>
                            <h2 className="text-2xl font-black text-white mb-4">Select Template</h2>
                            <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                                Choose an existing letter or generate a new industry-grade context.
                            </p>
                        </div>
                    )}
                </div>

                {/* Live A4 DIN 5008 Preview */}
                <div className="hidden lg:flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">A4 Canvas Preview</h4>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => activeLetter && generateLetterPDF(cvData, activeLetter)}
                                className="text-emerald-400 hover:text-emerald-300 transition-colors p-1"
                                title="Download PDF"
                            >
                                <Download size={16} />
                            </button>
                            <button
                                onClick={() => activeLetter && generateLetter_DOCX(cvData, activeLetter)}
                                className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                                title="Download Word (DOC)"
                            >
                                <FileText size={16} />
                            </button>
                        </div>


                    </div>
                    <div className="flex-1 overflow-hidden rounded-[32px] bg-slate-950/50 border border-slate-800/50 shadow-2xl relative group">
                        <div className="p-8 h-full overflow-auto custom-scrollbar flex justify-center">
                            <div className="transform scale-[0.45] origin-top transition-transform duration-500 group-hover:scale-[0.46]">
                                {activeLetter ? (
                                    <LetterPreview cvData={cvData} activeLetter={activeLetter} />
                                ) : (
                                    <div className="w-[210mm] h-[297mm] bg-white opacity-5 flex items-center justify-center">
                                        <p className="text-black text-4xl font-black uppercase opacity-20">Preview Ready</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full border border-slate-700/50 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">Germany (DE) Format</span>
                            <div className="w-px h-3 bg-slate-700"></div>
                            <span className="text-[10px] font-bold text-slate-500">ISO 216 / DIN 5008</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* AI Generation Modal - REMOVED */}

        </div>
    );
};


export default CoverLetterHub;
