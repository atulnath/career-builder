/**
 * CVPreview Component
 * 
 * Real-time A4 CV preview that matches the PDF output.
 * Uses A4 dimensions (210mm × 297mm) with a two-column layout:
 * - Left sidebar: contact info, skills, languages
 * - Main content: summary, experience, education
 * 
 * Includes section IDs for auto-scroll synchronization with CVForm.
 * 
 * @module components/CVPreview
 */

'use client';

import React from 'react';
import { LABELS } from '../lib/constants';
import { CVData } from '@/lib/types';
import { PreviewSidebar } from './CVPreview/Sidebar';
import { PreviewMain } from './CVPreview/MainContent';

interface CVPreviewProps {
    cvData: CVData;
}

export default function CVPreview({ cvData }: CVPreviewProps) {
    const lang = cvData.language || 'en';
    const labels = LABELS[lang];

    return (
        <div className="bg-white shadow-2xl overflow-hidden print:shadow-none"
            style={{
                width: '210mm',
                minHeight: '297mm',
                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility'
            }}>

            {/* Professional Header */}
            <div className="bg-[#2c3e50] text-white p-10 flex justify-between items-center border-b-[6px] border-[#34495e]">
                <div className="space-y-1">
                    <h1 className="text-5xl font-extrabold tracking-tight uppercase leading-none">{cvData.fullName}</h1>
                    <p className="text-sm text-slate-300 font-bold tracking-[0.4em] uppercase opacity-90">{labels.subtitle}</p>
                </div>
                {cvData.photoUrl && (
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white flex-shrink-0 rotate-3 transform transition-transform hover:rotate-0">
                        <img src={cvData.photoUrl} alt={cvData.fullName} className="w-full h-full object-cover" />
                    </div>
                )}
                {!cvData.photoUrl && cvData.fullName && (
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-100 flex items-center justify-center text-slate-400 text-5xl font-bold rotate-3 transform transition-transform hover:rotate-0 flex-shrink-0">
                        {cvData.fullName.charAt(0)}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-[250px_1fr] min-h-[calc(297mm-150px)]">

                {/* Modular Sidebar */}
                <PreviewSidebar cvData={cvData} labels={labels} />

                {/* Modular Main Content */}
                <PreviewMain cvData={cvData} labels={labels} />
            </div>
        </div>
    );
}
