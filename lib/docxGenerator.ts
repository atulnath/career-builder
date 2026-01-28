import { CVData } from './types';

export const generateCV_DOCX = (cvData: CVData) => {
    const isGerman = cvData.language === 'de';
    const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>CV - ${cvData.fullName}</title>
        <style>
            @page { margin: 1in; }
            body { font-family: 'Calibri', 'Arial', sans-serif; line-height: 1.4; color: #1a1a1a; font-size: 11pt; }
            .header { text-align: center; border-bottom: 2pt solid #2563eb; padding-bottom: 10pt; margin-bottom: 20pt; }
            .name { font-size: 24pt; font-weight: bold; color: #1e40af; margin-bottom: 5pt; text-transform: uppercase; letter-spacing: 1pt; }
            .contact { font-size: 10pt; color: #4b5563; }
            
            .section-header { border-bottom: 1pt solid #e5e7eb; margin-top: 15pt; margin-bottom: 8pt; padding-top: 5pt; }
            .section-title { font-size: 14pt; font-weight: bold; color: #1e40af; text-transform: uppercase; letter-spacing: 0.5pt; }
            
            .item-table { width: 100%; border-collapse: collapse; margin-bottom: 8pt; }
            .item-title { font-weight: bold; font-size: 11pt; color: #111827; }
            .item-meta { font-style: italic; color: #4b5563; font-size: 10pt; text-align: right; }
            .item-company { font-weight: bold; color: #374151; font-size: 10.5pt; }
            
            .bullet { margin-left: 20pt; color: #4b5563; font-size: 10.5pt; margin-bottom: 2pt; }
            .skill-table { width: 100%; border-collapse: collapse; }
            .skill-cat { font-weight: bold; width: 30%; vertical-align: top; padding-top: 4pt; }
            .skill-items { width: 70%; vertical-align: top; padding-top: 4pt; color: #374151; }
        </style>
        </head>
        <body>
            <div class='header'>
                <div class='name'>${cvData.fullName}</div>
                <div class='contact'>
                    ${cvData.location} | ${cvData.phone} | ${cvData.email}<br/>
                    ${cvData.address}
                </div>
            </div>

            ${cvData.aboutMe ? `
                <div class='section-header'><span class='section-title'>${isGerman ? 'Über mich' : 'Professional Summary'}</span></div>
                <p style='color: #374151; text-align: justify;'>${cvData.aboutMe}</p>
            ` : ''}

            <div class='section-header'><span class='section-title'>${isGerman ? 'Berufserfahrung' : 'Experience'}</span></div>
            ${(cvData.experience || []).map(exp => `
                <table class='item-table'>
                    <tr>
                        <td class='item-title'>${exp.position}</td>
                        <td class='item-meta'>${exp.dates}</td>
                    </tr>
                    <tr>
                        <td colspan='2' class='item-company'>${exp.company}</td>
                    </tr>
                </table>
                <div style='margin-left: 5pt;'>
                    ${(exp.bullets || []).map(b => `<div class='bullet'>• ${b}</div>`).join('')}
                </div>
                <div style='height: 8pt;'></div>
            `).join('')}

            <div class='section-header'><span class='section-title'>${isGerman ? 'Ausbildung' : 'Education'}</span></div>
            ${(cvData.education || []).map(edu => `
                <table class='item-table'>
                    <tr>
                        <td class='item-title'>${edu.degree}</td>
                        <td class='item-meta'>${edu.dates}</td>
                    </tr>
                    <tr>
                        <td colspan='2' class='item-company'>${edu.university} ${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</td>
                    </tr>
                </table>
                <div style='height: 5pt;'></div>
            `).join('')}

            <div class='section-header'><span class='section-title'>${isGerman ? 'Kenntnisse' : 'Skills'}</span></div>
            <table class='skill-table'>
                ${(cvData.skills || []).map(skill => `
                    <tr>
                        <td class='skill-cat'>${skill.category}</td>
                        <td class='skill-items'>${skill.items}</td>
                    </tr>
                `).join('')}
            </table>
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cvData.fullName.replace(/\s+/g, '_')}_CV.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const generateLetter_DOCX = (cvData: CVData, letter: any) => {
    const isGerman = cvData.language === 'de';
    const today = letter.customDate || new Date().toLocaleDateString(isGerman ? 'de-DE' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Cover Letter - ${letter.company}</title>
        <style>
            @page { margin: 1in; }
            body { font-family: 'Calibri', 'Arial', sans-serif; line-height: 1.5; color: #1a1a1a; font-size: 11pt; }
            .sender { margin-bottom: 30pt; font-weight: bold; border-left: 3pt solid #2563eb; padding-left: 10pt; }
            .recipient { margin-bottom: 40pt; margin-top: 20pt; }
            .date-line { text-align: right; margin-bottom: 20pt; }
            .subject { font-weight: bold; font-size: 14pt; margin-bottom: 20pt; color: #1e40af; text-transform: uppercase; }
            .closing { margin-top: 40pt; }
            .signature-name { font-size: 16pt; font-weight: bold; color: #1e40af; margin-top: 10pt; }
        </style>
        </head>
        <body>
            <div class='sender'>
                ${cvData.fullName}<br>
                ${cvData.address}<br>
                ${cvData.phone} | ${cvData.email}
            </div>

            <table style='width: 100%; border-collapse: collapse;'>
                <tr>
                    <td style='width: 50%; vertical-align: top;'>
                        <div class='recipient'>
                            <b>${letter.company || (isGerman ? '[Unternehmen]' : '[Company Name]')}</b><br>
                            ${letter.recipientName || (isGerman ? '[Ansprechpartner]' : '[Contact Person]')}<br>
                            ${letter.recipientAddress || (isGerman ? '[Straße Hausnummer]' : '[Street Address]')}<br>
                            ${letter.recipientCity || (isGerman ? '[PLZ Ort]' : '[City, Zip]')}
                        </div>
                    </td>
                    <td style='width: 50%; vertical-align: top; text-align: right;'>
                        <div class='date-line'>
                            ${letter.senderCity || (cvData.location ? cvData.location.split(',')[0] : (isGerman ? 'Berlin' : 'New York'))}, ${today}
                        </div>
                    </td>
                </tr>
            </table>

            <div class='subject'>
                ${isGerman ? 'Bewerbung als' : 'Application for'} ${letter.title.replace('Cover Letter', '').trim()}
            </div>

            <p>${letter.salutation || (isGerman ? 'Sehr geehrte Damen und Herren,' : 'Dear Hiring Manager,')}</p>

            <div style='text-align: justify;'>
                ${(letter.content || '').split('\n').map((p: string) => `<p>${p}</p>`).join('')}
            </div>

            <div class='closing'>
                ${letter.closing || (isGerman ? 'Mit freundlichen Grüßen' : 'Best regards')}<br><br>
                <div class='signature-name'>${cvData.fullName}</div>
            </div>
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filenameSuffix = isGerman ? 'Anschreiben' : 'Cover_Letter';
    link.download = `${(letter.company || 'Letter').replace(/\s+/g, '_')}_${filenameSuffix}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
