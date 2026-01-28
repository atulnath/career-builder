'use client';

import React from 'react';
import { CVData, CoverLetter } from '@/lib/types';

interface GermanLetterPreviewProps {
    cvData: CVData;
    activeLetter: CoverLetter;
}

const LetterPreview: React.FC<GermanLetterPreviewProps> = ({ cvData, activeLetter }) => {
    const lang = activeLetter.language || cvData.language || 'en';
    const variant = activeLetter.variant || 'modern';
    const isGerman = lang === 'de';

    const today = activeLetter.customDate || new Date().toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    if (variant === 'modern') {
        return (
            <div className="bg-white text-slate-900 shadow-2xl mx-auto flex flex-col" style={{ width: '210mm', minHeight: '297mm', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
                {/* Modern Header */}
                <div className="bg-[#2c3e50] text-white p-[15mm] flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight uppercase mb-2">{cvData.fullName}</h1>
                        <p className="text-blue-200 text-sm tracking-widest font-medium uppercase">{activeLetter.title.replace('Cover Letter', '').trim() || (isGerman ? 'Bewerbung' : 'Application')}</p>
                    </div>
                    <div className="text-right text-xs text-slate-300 leading-relaxed font-light">
                        <p>{cvData.address}</p>
                        <p>{cvData.location}</p>
                        <p className="font-medium text-white mt-1">{cvData.email} • {cvData.phone}</p>
                    </div>
                </div>

                <div className="p-[20mm] pt-[10mm] flex-1 relative">
                    {/* Date - Right Aligned (DIN Position) */}
                    <div className="absolute right-[20mm] top-[15mm] text-slate-500 text-sm">
                        {activeLetter.senderCity || (cvData.location ? cvData.location.split(',')[0] : '')}, {today}
                    </div>

                    {/* Recipient Block - DIN 5008 Position (approx 45mm from top of page, here relative to container) */}
                    {/* Since header is ~40-50mm, we need to adjust. The header replaces the top margin.
                        DIN 5008 Type B: Address starts 45mm from top edge.
                        If Header is ~40mm, address starts 5mm below header?
                        Let's just place it nicely for "Modern" look, but maintain window area structure if possible.
                        Actually, modern designs often break strict DIN for the header but keep the address window valid.
                        Address Window: 85mm x 40mm.
                    */}
                    <div className="mt-[15mm] mb-[20mm] h-[40mm] w-[85mm] text-sm">
                        <p className="text-[7pt] text-slate-400 border-b border-slate-200 mb-2 uppercase tracking-widest pb-1 w-max">
                            {isGerman ? 'Empfänger' : 'Recipient'}
                        </p>
                        <div className="text-slate-800 leading-snug">
                            <span className="font-bold">{activeLetter.company || (isGerman ? '[Unternehmen]' : '[Company Name]')}</span><br />
                            {activeLetter.recipientName || (isGerman ? '[Ansprechpartner]' : '[Contact Person]')}<br />
                            {activeLetter.recipientAddress || (isGerman ? '[Straße Hausnummer]' : '[Street Address]')}<br />
                            {activeLetter.recipientCity || (isGerman ? '[PLZ Ort]' : '[City, Zip]')}
                        </div>
                    </div>

                    {/* Subject Line */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-[#2c3e50]">
                            {isGerman ? 'Bewerbung als' : 'Application for'} {activeLetter.title.replace('Cover Letter', '').trim() || (isGerman ? '[Position]' : '[Position]')}
                        </h2>
                        {/* Optional Ref number or line */}
                        <div className="w-12 h-1 bg-blue-500 mt-2"></div>
                    </div>

                    {/* Salutation */}
                    <div className="mb-6 text-slate-700">
                        {activeLetter.salutation || (isGerman ? 'Sehr geehrte Damen und Herren,' : 'Dear Hiring Manager,')}
                    </div>

                    {/* Body */}
                    <div className="space-y-4 text-slate-600 text-[10.5pt] leading-relaxed whitespace-pre-wrap text-justify">
                        {activeLetter.content || (isGerman ? '[Inhalt hier einfügen]' : '[Insert content here]')}
                    </div>

                    {/* Closing */}
                    <div className="mt-12">
                        <p className="text-slate-700 mb-8">{activeLetter.closing || (isGerman ? 'Mit freundlichen Grüßen' : 'Best regards')}</p>
                        <div className="relative">
                            {/* Signature Placeholder */}
                            <p className="font-bold text-xl text-[#2c3e50]" style={{ fontFamily: '"Great Vibes", cursive' }}>{cvData.fullName}</p>
                        </div>
                    </div>

                    {/* Attachments */}
                    <div className="mt-16 pt-6 border-t border-slate-100 flex gap-8">
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                {isGerman ? 'Anlagen' : 'Attachments'}
                            </p>
                            <ul className="text-[10px] text-slate-500 font-medium space-y-1">
                                <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                    {isGerman ? 'Lebenslauf (CV)' : 'Curriculum Vitae (CV)'}
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                    {isGerman ? 'Zeugnisse' : 'Certificates'}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Footer Decoration */}
                <div className="h-2 bg-gradient-to-r from-[#2c3e50] to-blue-600 w-full mt-auto"></div>
            </div>
        );
    }

    // Classic Fallback
    return (
        <div className="bg-white text-slate-900 p-[20mm] shadow-2xl mx-auto" style={{ width: '210mm', minHeight: '297mm', fontFamily: '"Arial", "Helvetica", sans-serif', fontSize: '11pt', lineHeight: '1.5' }}>
            {/* SENDER ADDRESS */}
            <div className="mb-12">
                <p className="font-bold text-lg">{cvData.fullName}</p>
                <p className="text-sm text-slate-600">{cvData.address}</p>
                <p className="text-sm text-slate-600">{cvData.phone} | {cvData.email}</p>
            </div>

            {/* RECIPIENT & DATE LINE */}
            <div className="flex justify-between mb-16">
                <div className="w-1/2 min-h-[40mm]">
                    <p className="text-[8pt] text-slate-400 border-b border-slate-200 mb-2 uppercase tracking-widest">
                        {isGerman ? 'Empfänger' : 'Recipient'}
                    </p>
                    <div className="text-slate-800 font-medium">
                        {activeLetter.company || (isGerman ? '[Unternehmen]' : '[Company Name]')}<br />
                        {activeLetter.recipientName || (isGerman ? '[Ansprechpartner]' : '[Contact Person]')}<br />
                        {activeLetter.recipientAddress || (isGerman ? '[Straße Hausnummer]' : '[Street Address]')}<br />
                        {activeLetter.recipientCity || (isGerman ? '[PLZ Ort]' : '[City, Zip]')}
                    </div>
                </div>
                <div className="text-right">
                    <p>{activeLetter.senderCity || (cvData.location ? cvData.location.split(',')[0] : '')}, {today}</p>
                </div>
            </div>

            {/* SUBJECT LINE */}
            <div className="mb-10">
                <h2 className="text-lg font-bold">
                    {isGerman ? 'Bewerbung als' : 'Application for'} {activeLetter.title.replace('Cover Letter', '').trim() || (isGerman ? '[Position]' : '[Position]')}
                </h2>
            </div>

            {/* SALUTATION */}
            <div className="mb-6">
                <p>{activeLetter.salutation || (isGerman ? 'Sehr geehrte Damen und Herren,' : 'Dear Hiring Manager,')}</p>
            </div>

            {/* BODY */}
            <div className="space-y-6 text-left whitespace-pre-wrap">
                {activeLetter.content || (isGerman ? '[Inhalt hier einfügen]' : '[Insert content here]')}
            </div>

            {/* CLOSING */}
            <div className="mt-12 space-y-8">
                <div>
                    <p>{activeLetter.closing || (isGerman ? 'Mit freundlichen Grüßen' : 'Best regards')}</p>
                </div>

                <div className="pt-4">
                    <p className="font-bold text-lg" style={{ fontFamily: '"Great Vibes", cursive' }}>{cvData.fullName}</p>
                    <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest">
                        {isGerman ? 'Handschriftliche Unterschrift' : 'Digital Signature'}
                    </p>
                </div>
            </div>

            {/* ATTACHMENTS */}
            <div className="mt-20 pt-8 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {isGerman ? 'Anlagen' : 'Attachments'}
                </p>
                <ul className="text-xs text-slate-500 space-y-1">
                    <li>{isGerman ? 'Lebenslauf (CV)' : 'Curriculum Vitae (CV)'}</li>
                    <li>{isGerman ? 'Zeugnisse & Zertifikate' : 'Certificates & Transcripts'}</li>
                </ul>
            </div>
        </div>
    );
};

export default LetterPreview;

