'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FormSectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const FormSection = ({ title, icon, children, defaultOpen = true }: FormSectionProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`transition-all duration-300 ${isOpen ? 'bg-slate-800/40' : 'bg-slate-800/10'} backdrop-blur-md rounded-3xl border border-slate-700/50 overflow-hidden shadow-lg`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-700/30 transition-all group"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-110' : 'bg-slate-800 text-slate-400 group-hover:text-blue-400'}`}>
                        {icon}
                    </div>
                    <div className="text-left">
                        <h3 className={`text-lg font-black transition-colors ${isOpen ? 'text-white' : 'text-slate-300'}`}>{title}</h3>
                        {!isOpen && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Click to expand</p>}
                    </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-800/50 border border-slate-700/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={16} className="text-slate-400" />
                </div>
            </button>
            {isOpen && (
                <div className="p-6 pt-2 border-t border-slate-700/30 animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
                    {children}
                </div>
            )}
        </div>
    );
};

export const InputField = ({ label, icon, language = 'en', ...props }: any) => (
    <div className="space-y-2 group">
        <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1 transition-colors group-focus-within:text-blue-400">
            {icon && <span>{icon}</span>}
            {label}
        </label>
        <div className="relative">
            <input
                spellCheck={false}
                lang={language}
                {...props}
                className="w-full px-5 py-4 bg-slate-900/40 border border-slate-700/50 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all shadow-inner font-medium text-sm"
            />
        </div>
    </div>
);

export const TextAreaField = ({ label, icon, language = 'en', ...props }: any) => (
    <div className="space-y-2 group">
        <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1 transition-colors group-focus-within:text-blue-400">
            {icon && <span>{icon}</span>}
            {label}
        </label>
        <div className="relative">
            <textarea
                spellCheck={false}
                lang={language}
                {...props}
                className="w-full px-5 py-4 bg-slate-900/40 border border-slate-700/50 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all resize-none shadow-inner font-medium text-sm min-h-[120px]"
            />
        </div>
    </div>
);
