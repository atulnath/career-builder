'use client';

import React, { useState } from 'react';
import {
    Plus,
    MessageSquare,
    Trash2,
    Save,
    Search,
    BookOpen,
    HelpCircle,
    Lightbulb,
    X
} from 'lucide-react';
import { CVData, Note } from '@/lib/types';

interface InterviewPrepProps {
    cvData: CVData;
    setCVData: (data: any) => void;
}

const InterviewPrep: React.FC<InterviewPrepProps> = ({ cvData, setCVData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

    const activeNote = cvData.interviewPrep?.find(n => n.id === activeNoteId);

    const addNote = () => {
        const newNote: Note = {
            id: `note-${Date.now()}`,
            title: 'New Interview Question',
            content: 'Question: Tell me about yourself.\n\nAnswer/Strategy: focus on Computer Vision and Automotive Software Engineering projects...',
        };

        setCVData((prev: CVData) => ({
            ...prev,
            interviewPrep: [newNote, ...(prev.interviewPrep || [])]
        }));
        setActiveNoteId(newNote.id);
    };

    const updateNote = (id: string, updates: Partial<Note>) => {
        setCVData((prev: CVData) => ({
            ...prev,
            interviewPrep: prev.interviewPrep.map(n => n.id === id ? { ...n, ...updates } : n)
        }));
    };

    const deleteNote = (id: string) => {
        setCVData((prev: CVData) => ({
            ...prev,
            interviewPrep: prev.interviewPrep.filter(n => n.id !== id)
        }));
        if (activeNoteId === id) setActiveNoteId(null);
    };

    const filteredNotes = (cvData.interviewPrep || []).filter(n =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-black text-white mb-2 leading-tight">Interview <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Prep</span></h2>
                    <p className="text-slate-400 text-lg">Centralize your research and master commonly asked questions.</p>
                </div>
                <button
                    onClick={addNote}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-xl shadow-blue-500/20"
                >
                    <Plus size={18} />
                    ADD PREP NOTE
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
                <div className="space-y-6">
                    {/* Internal Search */}
                    <div className="relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search your notes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-900/40 border border-slate-800/50 rounded-[28px] py-5 pl-16 pr-6 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium text-lg shadow-xl"
                        />
                    </div>

                    {/* Notes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredNotes.length > 0 ? (
                            filteredNotes.map((note) => (
                                <div
                                    key={note.id}
                                    onClick={() => setActiveNoteId(note.id)}
                                    className={`p-6 rounded-[32px] border transition-all cursor-pointer group relative ${activeNoteId === note.id
                                            ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-500/30 translate-y-[-4px]'
                                            : 'bg-slate-900/40 border-slate-800/50 text-slate-400 hover:border-slate-700 hover:bg-slate-800/40'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-2 rounded-xl ${activeNoteId === note.id ? 'bg-white/20' : 'bg-blue-500/10'}`}>
                                            <HelpCircle size={20} className={activeNoteId === note.id ? 'text-white' : 'text-blue-400'} />
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                                            className={`p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${activeNoteId === note.id ? 'text-white hover:bg-white/10' : 'text-slate-500 hover:text-red-400'}`}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <h4 className="font-black text-lg mb-2 leading-snug">{note.title}</h4>
                                    <p className={`text-sm line-clamp-3 leading-relaxed ${activeNoteId === note.id ? 'text-blue-100' : 'text-slate-500'}`}>
                                        {note.content}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-slate-900/20 rounded-[40px] border-2 border-dashed border-slate-800/50">
                                <BookOpen size={48} className="text-slate-700 mx-auto mb-6" />
                                <p className="text-slate-500 font-bold italic">No notes found. Create your first interview prep card!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Focus Mode / Editor */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-[40px] p-8 h-fit lg:sticky lg:top-32 shadow-2xl">
                    {activeNote ? (
                        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                            <div className="flex items-center gap-3 mb-2">
                                <Lightbulb className="text-yellow-400" size={18} />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Focus Mode Editor</span>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={activeNote.title}
                                    spellCheck={false}
                                    onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-4 px-6 text-white font-black text-xl focus:outline-none focus:border-blue-500/50 transition-all"
                                    placeholder="Note Title"
                                />
                                <textarea
                                    value={activeNote.content}
                                    spellCheck={false}
                                    rows={15}
                                    onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-3xl py-6 px-6 text-slate-300 focus:outline-none focus:border-blue-500/30 transition-all font-medium leading-relaxed resize-none custom-scrollbar"
                                    placeholder="Detailed prep material..."
                                />
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                                <span>Created {new Date().toLocaleDateString()}</span>
                                <span className="text-slate-700 italic">Antigravity AI Assisted Prep</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Edit2 size={24} className="text-slate-600" />
                            </div>
                            <h4 className="text-lg font-black text-white">Select Note</h4>
                            <p className="text-sm text-slate-500 mt-2 px-6">Click on any card to enter focus mode and edit your interview strategy.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Edit2 = ({ size, className }: { size: number, className: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
);

export default InterviewPrep;
