import { CVData } from './types';

export const generateCV_DOCX = (cvData: CVData) => {
    const isGerman = cvData.language === 'de';
    const labels = {
        personal: isGerman ? 'Persönliche Daten' : 'Contact',
        about: isGerman ? 'Über mich' : 'Professional Summary',
        experience: isGerman ? 'Berufserfahrung' : 'Experience',
        education: isGerman ? 'Ausbildung' : 'Education',
        skills: isGerman ? 'Kenntnisse' : 'Skills',
        languages: isGerman ? 'Sprachen' : 'Languages',
        address: isGerman ? 'Adresse' : 'Address',
        location: isGerman ? 'Standort' : 'Location',
        phone: isGerman ? 'Telefon' : 'Phone',
        email: 'E-Mail',
        dob: isGerman ? 'Geburtsdatum' : 'Date of Birth',
        subtitle: isGerman ? 'Maschinelles Lernen | Computer Vision' : 'Machine Learning | Computer Vision'
    };

    const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>CV - ${cvData.fullName}</title>
        <style>
            @page { size: A4; margin: 0; }
            body { font-family: 'Segoe UI', 'Arial', sans-serif; line-height: 1.3; color: #1a1a1a; font-size: 9pt; margin: 0; padding: 0; }
            
            /* Header - Dark Blue - Compact */
            .header { background-color: #2c3e50; color: white; padding: 15pt 20pt; border-bottom: 4pt solid #34495e; }
            .name { font-size: 22pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1pt; margin-bottom: 2pt; }
            .subtitle { font-size: 8pt; color: #94a3b8; text-transform: uppercase; letter-spacing: 2pt; font-weight: bold; }
            
            /* Two Column Layout */
            .main-layout { width: 100%; border-collapse: collapse; }
            .sidebar { width: 32%; background-color: #f8fafc; padding: 12pt; vertical-align: top; border-right: 1pt solid #e2e8f0; }
            .main-content { width: 68%; padding: 12pt 15pt; vertical-align: top; background-color: white; }
            
            /* Section Headers */
            .section-title { font-size: 8pt; font-weight: bold; color: #2c3e50; text-transform: uppercase; letter-spacing: 1pt; border-bottom: 1.5pt solid #2c3e50; padding-bottom: 2pt; margin-bottom: 6pt; margin-top: 8pt; display: inline-block; }
            .section-title-main { font-size: 9pt; font-weight: bold; color: #2c3e50; text-transform: uppercase; letter-spacing: 1.5pt; margin-bottom: 8pt; margin-top: 10pt; }
            .section-bar { display: inline-block; width: 18pt; height: 1.5pt; background-color: #2c3e50; margin-right: 6pt; vertical-align: middle; }
            
            /* Personal Info in Sidebar - Compact */
            .info-label { font-size: 7pt; font-weight: bold; color: #1e293b; margin-bottom: 1pt; text-transform: uppercase; letter-spacing: 0.3pt; }
            .info-value { font-size: 8pt; color: #475569; margin-bottom: 5pt; padding-left: 0pt; }
            
            /* Skills - Compact */
            .skill-category { font-size: 7pt; font-weight: bold; color: #1e293b; text-transform: uppercase; letter-spacing: 0.3pt; margin-top: 4pt; }
            .skill-items { font-size: 8pt; color: #475569; line-height: 1.3; margin-top: 1pt; }
            
            /* Languages - Compact */
            .language-row { margin: 3pt 0; }
            .language-name { font-size: 8pt; font-weight: bold; color: #1e293b; }
            .language-level { font-size: 6pt; font-weight: bold; color: #2563eb; background-color: #dbeafe; padding: 1pt 4pt; text-transform: uppercase; letter-spacing: 0.3pt; }
            
            /* Experience Timeline - Compact */
            .exp-item { margin-bottom: 10pt; padding-left: 10pt; border-left: 1.5pt solid #e2e8f0; }
            .exp-company { font-size: 10pt; font-weight: bold; color: #1e293b; margin-bottom: 1pt; }
            .exp-dates { font-size: 7pt; font-weight: bold; color: #94a3b8; background-color: #f8fafc; padding: 2pt 5pt; text-transform: uppercase; letter-spacing: 0.3pt; float: right; }
            .exp-position { font-size: 8pt; font-weight: bold; color: #2563eb; text-transform: uppercase; letter-spacing: 0.3pt; margin-bottom: 4pt; }
            .exp-bullet { font-size: 8pt; color: #475569; margin: 2pt 0; padding-left: 6pt; line-height: 1.3; }
            .exp-bullet-icon { color: #2563eb; font-weight: bold; margin-right: 3pt; }
            
            /* Education Cards - Compact */
            .edu-card { background-color: #f8fafc; padding: 8pt; margin-bottom: 6pt; border-left: 2pt solid #2563eb; }
            .edu-university { font-size: 9pt; font-weight: bold; color: #1e293b; text-transform: uppercase; letter-spacing: 0.3pt; }
            .edu-degree { font-size: 8pt; font-weight: bold; color: #374151; margin-top: 1pt; }
            .edu-dates { font-size: 7pt; font-weight: bold; color: #94a3b8; float: right; }
            .edu-gpa { font-size: 7pt; font-weight: bold; color: #2563eb; background-color: #dbeafe; padding: 1pt 4pt; margin-left: 5pt; }
            .edu-field { font-size: 8pt; color: #64748b; margin-top: 2pt; }
            
            /* About Section - Compact */
            .about-text { font-size: 8pt; color: #475569; line-height: 1.4; text-align: justify; font-style: italic; border-left: 1.5pt solid #e2e8f0; padding-left: 8pt; }
        </style>
        </head>
        <body>
            <!-- Header -->
            <div class='header'>
                <div class='name'>${cvData.fullName}</div>
                <div class='subtitle'>${labels.subtitle}</div>
            </div>

            <!-- Two Column Layout -->
            <table class='main-layout'>
                <tr>
                    <!-- Sidebar -->
                    <td class='sidebar'>
                        <div class='section-title'>${labels.personal}</div>
                        ${cvData.address ? `<div class='info-label'>${labels.address}</div><div class='info-value'>${cvData.address}</div>` : ''}
                        ${cvData.location ? `<div class='info-label'>${labels.location}</div><div class='info-value'>${cvData.location}</div>` : ''}
                        ${cvData.phone ? `<div class='info-label'>${labels.phone}</div><div class='info-value'>${cvData.phone}</div>` : ''}
                        ${cvData.email ? `<div class='info-label'>${labels.email}</div><div class='info-value'>${cvData.email}</div>` : ''}
                        ${cvData.dateOfBirth ? `<div class='info-label'>${labels.dob}</div><div class='info-value'>${cvData.dateOfBirth}</div>` : ''}
                        ${cvData.github ? `<div class='info-label'>GitHub</div><div class='info-value'>${cvData.github}</div>` : ''}
                        ${cvData.leetcode ? `<div class='info-label'>LeetCode</div><div class='info-value'>${cvData.leetcode}</div>` : ''}
                        ${cvData.portfolio ? `<div class='info-label'>Portfolio</div><div class='info-value'>${cvData.portfolio}</div>` : ''}

                        <div class='section-title'>${labels.skills}</div>
                        ${(cvData.skills || []).map(skill => `
                            <div class='skill-category'>${skill.category}</div>
                            <div class='skill-items'>${skill.items}</div>
                        `).join('')}

                        <div class='section-title'>${labels.languages}</div>
                        ${(cvData.languages || []).map(langItem => `
                            <div class='language-row'>
                                <span class='language-name'>● ${langItem.name}</span>
                                <span class='language-level'>${langItem.level}</span>
                            </div>
                        `).join('')}
                    </td>

                    <!-- Main Content -->
                    <td class='main-content'>
                        ${cvData.aboutMe ? `
                            <div class='section-title-main'><span class='section-bar'></span>${labels.about}</div>
                            <div class='about-text'>"${cvData.aboutMe}"</div>
                        ` : ''}

                        <div class='section-title-main'><span class='section-bar'></span>${labels.experience}</div>
                        ${(cvData.experience || []).map(exp => `
                            <div class='exp-item'>
                                <span class='exp-dates'>${exp.dates}</span>
                                <div class='exp-company'>${exp.company}</div>
                                <div class='exp-position'>${exp.position}</div>
                                ${(exp.bullets || []).filter(b => b.trim()).map(bullet => `
                                    <div class='exp-bullet'><span class='exp-bullet-icon'>›</span>${bullet}</div>
                                `).join('')}
                            </div>
                        `).join('')}

                        <div class='section-title-main'><span class='section-bar'></span>${labels.education}</div>
                        ${(cvData.education || []).map(edu => `
                            <div class='edu-card'>
                                <span class='edu-dates'>${edu.dates}</span>
                                ${edu.gpa ? `<span class='edu-gpa'>GPA: ${edu.gpa}</span>` : ''}
                                <div class='edu-university'>${edu.university}</div>
                                <div class='edu-degree'>${edu.degree}</div>
                                ${edu.field ? `<div class='edu-field'>Specialization: ${edu.field}</div>` : ''}
                            </div>
                        `).join('')}
                    </td>
                </tr>
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
