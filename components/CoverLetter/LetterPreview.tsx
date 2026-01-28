'use client';

import React from 'react';
import { CVData, CoverLetter } from '@/lib/types';

interface GermanLetterPreviewProps {
    cvData: CVData;
    activeLetter: CoverLetter;
}

const LetterPreview: React.FC<GermanLetterPreviewProps> = ({ cvData, activeLetter }) => {
    const lang = cvData.language || 'en';

    const today = activeLetter.customDate || new Date().toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const isGerman = lang === 'de';

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
                    <p>{activeLetter.senderCity || cvData.location.split(',')[0]}, {today}</p>
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

