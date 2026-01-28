import { jsPDF } from 'jspdf';
import { CVData, CoverLetter } from './types';

export const generateLetterPDF = async (cvData: CVData, letter: CoverLetter) => {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = 210;
    const margin = 25;
    const rightMargin = 185;
    let y = 30;

    const isGerman = cvData.language === 'de';
    const lang = cvData.language || 'en';

    // 1. SENDER BLOCK
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(cvData.fullName, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    y += 5;
    doc.text(cvData.address || '', margin, y);
    y += 4;
    doc.text(`${cvData.phone} | ${cvData.email}`, margin, y);

    // 2. RECIPIENT BLOCK (Starts at ~50mm)
    y = 55;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(isGerman ? 'Empfänger' : 'Recipient', margin, y);
    doc.line(margin, y + 1, margin + 40, y + 1);

    y += 8;
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.setFont('helvetica', 'italic');
    doc.text(letter.company || (isGerman ? '[Unternehmen]' : '[Company Name]'), margin, y);
    y += 5;
    doc.text(letter.recipientName || (isGerman ? '[Ansprechpartner]' : '[Contact Person]'), margin, y);
    y += 5;
    doc.text(letter.recipientAddress || (isGerman ? '[Straße Hausnummer]' : '[Street Address]'), margin, y);
    y += 5;
    doc.text(letter.recipientCity || (isGerman ? '[PLZ Ort]' : '[City, Zip]'), margin, y);

    // 3. DATE LINE
    y = 55;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0);
    const dateStr = letter.customDate || new Date().toLocaleDateString(isGerman ? 'de-DE' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const location = letter.senderCity || (cvData.location ? cvData.location.split(',')[0] : (isGerman ? 'Berlin' : 'New York'));
    doc.text(`${location}, ${dateStr}`, rightMargin, y, { align: 'right' });

    // 4. SUBJECT LINE
    y = 95;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    const subjectPrefix = isGerman ? 'Bewerbung als' : 'Application for';
    doc.text(`${subjectPrefix} ${letter.title.replace('Cover Letter', '').trim() || (isGerman ? '[Position]' : '[Position]')}`, margin, y);

    // 5. SALUTATION
    y += 15;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(letter.salutation || (isGerman ? 'Sehr geehrte Damen und Herren,' : 'Dear Hiring Manager,'), margin, y);

    // 6. BODY CONTENT
    y += 10;
    const splitText = doc.splitTextToSize(letter.content, pageWidth - (margin * 2));
    doc.text(splitText, margin, y);

    // Estimate new Y after body
    y += (splitText.length * 6);

    // 7. CLOSING
    y += 15;
    doc.text(letter.closing || (isGerman ? 'Mit freundlichen Grüßen' : 'Best regards'), margin, y);

    y += 15;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    // Signature simulation font if possible, otherwise bold
    doc.text(cvData.fullName, margin, y);

    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(isGerman ? 'Handschriftliche Unterschrift' : 'Digital Signature', margin, y);

    // 8. ATTACHMENTS
    y = 260;
    doc.setDrawColor(230);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(isGerman ? 'ANLAGEN' : 'ATTACHMENTS', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(isGerman ? '- Lebenslauf (CV)' : '- Curriculum Vitae (CV)', margin, y);
    y += 4;
    doc.text(isGerman ? '- Zeugnisse & Zertifikate' : '- Certificates & Transcripts', margin, y);

    const filenameSuffix = isGerman ? 'Anschreiben' : 'Cover_Letter';
    doc.save(`${letter.company?.replace(/\s+/g, '_')}_${filenameSuffix}_${cvData.fullName.replace(/\s+/g, '_')}.pdf`);
};
