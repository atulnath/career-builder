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

    const lang = cvData.language || 'en';
    const isGerman = (letter.language || lang) === 'de'; // Use letter language if available
    const variant = letter.variant || 'modern';

    if (variant === 'modern') {
        // --- MODERN LAYOUT ---
        const headerHeight = 45;
        const primaryColor = [44, 62, 80]; // #2c3e50

        // 1. Header Background
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.rect(0, 0, pageWidth, headerHeight, 'F');

        // 2. Header Content
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22); // ~3xl
        // doc.text(cvData.fullName.toUpperCase(), margin, 20);
        // Better positioning: 15mm padding
        doc.text(cvData.fullName.toUpperCase(), 15, 20);

        doc.setFontSize(10);
        doc.setTextColor(191, 219, 254); // blue-200
        doc.text((letter.title.replace('Cover Letter', '').trim() || (isGerman ? 'Bewerbung' : 'Application')).toUpperCase(), 15, 26, { charSpace: 1.5 });

        // Contact Info (Right aligned in header)
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(203, 213, 225); // slate-300

        const contactX = pageWidth - 15;
        let contactY = 18;
        doc.text(cvData.address || '', contactX, contactY, { align: 'right' });
        contactY += 5;
        doc.text(cvData.location || '', contactX, contactY, { align: 'right' });
        contactY += 6;
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(`${cvData.email} | ${cvData.phone}`, contactX, contactY, { align: 'right' });


        // 3. Sender City / Date (Right aligned below header)
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139); // slate-500
        const dateStr = letter.customDate || new Date().toLocaleDateString(isGerman ? 'de-DE' : 'en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const location = letter.senderCity || (cvData.location ? cvData.location.split(',')[0] : '');
        doc.text(`${location}, ${dateStr}`, rightMargin, headerHeight + 15, { align: 'right' });


        // 4. Recipient Block
        // Position approx 60mm from top (header 45 + 15)
        let rY = headerHeight + 15;
        doc.setFontSize(7);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text((isGerman ? 'EMPFÄNGER' : 'RECIPIENT').toUpperCase(), margin, rY);
        doc.setDrawColor(226, 232, 240); // slate-200
        doc.line(margin, rY + 1.5, margin + 25, rY + 1.5);

        rY += 8;
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59); // slate-800
        doc.setFont('helvetica', 'bold');
        doc.text(letter.company || (isGerman ? '[Unternehmen]' : '[Company Name]'), margin, rY);
        rY += 5;
        doc.setFont('helvetica', 'normal');
        doc.text(letter.recipientName || (isGerman ? '[Ansprechpartner]' : '[Contact Person]'), margin, rY);
        rY += 5;
        doc.text(letter.recipientAddress || (isGerman ? '[Straße Hausnummer]' : '[Street Address]'), margin, rY);
        rY += 5;
        doc.text(letter.recipientCity || (isGerman ? '[PLZ Ort]' : '[City, Zip]'), margin, rY);


        // 5. Subject Line
        let sY = 100; // Fixed approx position for subject

        doc.setFontSize(13); // xl
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(44, 62, 80); // primary
        const subjectPrefix = isGerman ? 'Bewerbung als' : 'Application for';
        doc.text(`${subjectPrefix} ${letter.title.replace('Cover Letter', '').trim() || (isGerman ? '[Position]' : '[Position]')}`, margin, sY);

        // Accent line
        doc.setFillColor(59, 130, 246); // blue-500
        doc.rect(margin, sY + 3, 12, 1, 'F');

        // 6. Body
        let bY = sY + 18;
        doc.setFontSize(10.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(71, 85, 105); // slate-600
        doc.text(letter.salutation || (isGerman ? 'Sehr geehrte Damen und Herren,' : 'Dear Hiring Manager,'), margin, bY);

        bY += 10;
        const splitText = doc.splitTextToSize(letter.content, pageWidth - (margin * 2));
        doc.text(splitText, margin, bY, { align: 'justify', maxWidth: pageWidth - (margin * 2) });
        bY += (splitText.length * 5) + 5;

        // 7. Closing
        bY += 10; // Spacing
        doc.setTextColor(51, 65, 85); // slate-700
        doc.text(letter.closing || (isGerman ? 'Mit freundlichen Grüßen' : 'Best regards'), margin, bY);

        bY += 15;
        doc.setFont('times', 'italic'); // Approximation for script
        doc.setFontSize(16);
        doc.setTextColor(44, 62, 80);
        doc.text(cvData.fullName, margin, bY);


        // 8. Attachments
        const footerY = 260;
        doc.setDrawColor(241, 245, 249); // slate-100
        doc.line(margin, footerY, pageWidth - margin, footerY);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text((isGerman ? 'ANLAGEN' : 'ATTACHMENTS'), margin, footerY + 8);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139); // slate-500

        // Simulating bullets with small circles? Standard text is fine.
        doc.text(isGerman ? '• Lebenslauf (CV)' : '• Curriculum Vitae (CV)', margin, footerY + 14);
        doc.text(isGerman ? '• Zeugnisse' : '• Certificates', margin, footerY + 19);

        // Footer Decoration
        // doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        // Gradient simulation? Just a solid bar
        doc.setFillColor(44, 62, 80);
        doc.rect(0, 295, pageWidth, 2, 'F'); // Bottom edge

    } else {
        // --- CLASSIC LAYOUT (Enhanced Metadata) ---
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
        const location = letter.senderCity || (cvData.location ? cvData.location.split(',')[0] : '');
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
    }

    const filenameSuffix = isGerman ? 'Anschreiben' : 'Cover_Letter';
    doc.save(`${letter.company?.replace(/\s+/g, '_')}_${filenameSuffix}_${cvData.fullName.replace(/\s+/g, '_')}.pdf`);
};
