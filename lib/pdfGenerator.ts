import { jsPDF } from 'jspdf';
import { LABELS } from './constants';
import { CVData, CVProfile, Experience, Education, Skill, Language } from './types';

/**
 * Creates a rounded-corner version of the provided image URL.
 */
const createRoundedImage = (imageUrl: string, radius: number = 20): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const size = Math.min(img.width, img.height);
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }

            const r = (radius / 100) * size;
            ctx.beginPath();
            ctx.moveTo(r, 0);
            ctx.lineTo(size - r, 0);
            ctx.quadraticCurveTo(size, 0, size, r);
            ctx.lineTo(size, size - r);
            ctx.quadraticCurveTo(size, size, size - r, size);
            ctx.lineTo(r, size);
            ctx.quadraticCurveTo(0, size, 0, size - r);
            ctx.lineTo(0, r);
            ctx.quadraticCurveTo(0, 0, r, 0);
            ctx.closePath();
            ctx.clip();

            const offsetX = (img.width - size) / 2;
            const offsetY = (img.height - size) / 2;
            ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = imageUrl;
    });
};

/**
 * Main PDF Generation Function
 */
export const generatePDF = async (cvData: CVData) => {
    const lang = cvData.language || 'en';
    const labels = LABELS[lang];

    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const colors = {
        primary: [44, 62, 80],      // Deep Navy (#2c3e50)
        secondary: [37, 99, 235],    // Royal Blue (#2563eb)
        bg: [248, 250, 252],        // Light Slate BG (#f8fafc)
        text: [51, 65, 85],         // Slate 700 (#334155)
        darkText: [30, 41, 59],     // Slate 900
        muted: [148, 163, 184],     // Slate 400 (#94a3b8)
        white: [255, 255, 255]
    };

    const pageWidth = 210;
    const pageHeight = 297;
    const sidebarWidth = 66;
    const sidebarPadding = 7;
    const mainPadding = 8;
    const headerHeight = 34;

    let yPos = 0;

    const renderPageDecorations = (pageNum: number) => {
        doc.setFillColor(colors.bg[0], colors.bg[1], colors.bg[2]);
        doc.rect(0, pageNum === 1 ? headerHeight + 1.2 : 0, sidebarWidth, pageHeight - (pageNum === 1 ? headerHeight + 1.2 : 0), 'F');

        if (pageNum === 1) {
            doc.setFillColor(52, 73, 94);
            doc.rect(0, headerHeight, pageWidth, 1.2, 'F');
        }
    };

    // 1. HEADER
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');
    renderPageDecorations(1);

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.text(cvData.fullName.toUpperCase(), 12, 18);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(210, 210, 210);
    doc.text(labels.subtitle.toUpperCase(), 12, 24, { charSpace: 1.5 });

    if (cvData.photoUrl) {
        try {
            const roundedPhoto = await createRoundedImage(cvData.photoUrl, 15);
            doc.addImage(roundedPhoto, 'PNG', pageWidth - 42, 4, 26, 26);
        } catch (e) {
            console.error("PDF Photo rendering error:", e);
        }
    }

    // 2. SIDEBAR CONTENT
    let sidebarY = headerHeight + 10;
    const drawSidebarHeading = (text: string) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
        doc.text(text.toUpperCase(), sidebarPadding, sidebarY);
        sidebarY += 1.5;
        doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
        doc.setLineWidth(0.4);
        doc.line(sidebarPadding, sidebarY, sidebarPadding + 15, sidebarY);
        sidebarY += 6;
    };

    // Personal Info
    drawSidebarHeading(labels.personal.title);
    doc.setFontSize(8.5);
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);

    const sidebarItems = [
        { label: labels.personal.address, value: cvData.address },
        { label: labels.personal.location, value: cvData.location },
        { label: labels.personal.phone, value: cvData.phone },
        { label: labels.personal.email, value: cvData.email },
        { label: labels.personal.dob, value: cvData.dateOfBirth },
        { label: labels.personal.github, value: cvData.github },
        { label: labels.personal.leetcode, value: cvData.leetcode ? cvData.leetcode.replace('https://', '') : '' },
        { label: labels.personal.portfolio, value: cvData.portfolio ? cvData.portfolio.replace('https://', '') : '' },
    ];



    sidebarItems.forEach(item => {
        if (!item.value) return;
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.darkText[0], colors.darkText[1], colors.darkText[2]);
        doc.text(item.label, sidebarPadding, sidebarY);
        sidebarY += 4;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
        const lines = doc.splitTextToSize(item.value, sidebarWidth - sidebarPadding * 2);
        doc.text(lines, sidebarPadding, sidebarY);
        sidebarY += (lines.length * 4) + 2;
    });

    sidebarY += 5;

    // Skills
    drawSidebarHeading(labels.sections.skills);
    cvData.skills.forEach(skill => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.text(skill.category.toUpperCase(), sidebarPadding, sidebarY);
        sidebarY += 4;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        const lines = doc.splitTextToSize(skill.items, sidebarWidth - sidebarPadding * 2);
        doc.text(lines, sidebarPadding, sidebarY);
        sidebarY += (lines.length * 4) + 2;
    });

    sidebarY += 5;

    // Languages
    drawSidebarHeading(labels.sections.languages);
    cvData.languages.forEach(lang => {
        doc.setFont('helvetica', 'bold');
        doc.text(lang.name, sidebarPadding, sidebarY);
        const levelWidth = doc.getTextWidth(lang.level);
        doc.setFont('helvetica', 'normal');
        doc.text(lang.level, sidebarWidth - sidebarPadding - levelWidth, sidebarY);
        sidebarY += 5;
    });

    // 3. MAIN CONTENT
    let mainY = headerHeight + 10;
    const mainX = sidebarWidth + mainPadding;
    const mainContentWidth = pageWidth - sidebarWidth - mainPadding * 2;

    const drawMainHeading = (text: string) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
        doc.text(text.toUpperCase(), mainX, mainY);
        mainY += 1.5;
        doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
        doc.setLineWidth(0.4);
        doc.line(mainX - 4, mainY, mainX + 4, mainY);
        mainY += 7;
    };

    // Profile
    if (cvData.aboutMe) {
        drawMainHeading(labels.sections.about);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
        const lines = doc.splitTextToSize(cvData.aboutMe, mainContentWidth);
        doc.text(lines, mainX, mainY, { align: 'justify', maxWidth: mainContentWidth });
        mainY += (lines.length * 5) + 10;
    }

    // Experience
    drawMainHeading(labels.sections.experience);
    cvData.experience.forEach(exp => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(colors.darkText[0], colors.darkText[1], colors.darkText[2]);
        doc.text(exp.company, mainX, mainY);

        doc.setFontSize(8.5);
        doc.setTextColor(colors.muted[0], colors.muted[1], colors.muted[2]);
        const dateWidth = doc.getTextWidth(exp.dates);
        doc.text(exp.dates, pageWidth - mainPadding - dateWidth, mainY);

        mainY += 5;
        doc.setFontSize(10);
        doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
        doc.text(exp.position.toUpperCase(), mainX, mainY);

        mainY += 6;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);

        exp.bullets.forEach(bullet => {
            if (!bullet.trim()) return;
            const cleanBullet = bullet.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1');
            const lines = doc.splitTextToSize(cleanBullet, mainContentWidth - 4);
            doc.text('›', mainX, mainY);
            doc.text(lines, mainX + 4, mainY);
            mainY += (lines.length * 4.5) + 1.5;
        });
        mainY += 4;
    });

    // Education
    if (mainY > 230) {
        doc.addPage();
        renderPageDecorations(2);
        mainY = 20;
    }

    drawMainHeading(labels.sections.education);
    cvData.education.forEach(edu => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(colors.darkText[0], colors.darkText[1], colors.darkText[2]);
        doc.text(edu.university, mainX, mainY);

        doc.setFontSize(8.5);
        doc.setTextColor(colors.muted[0], colors.muted[1], colors.muted[2]);
        const dateWidth = doc.getTextWidth(edu.dates);
        doc.text(edu.dates, pageWidth - mainPadding - dateWidth, mainY);

        mainY += 5;
        doc.setFontSize(10);
        doc.setTextColor(colors.darkText[0], colors.darkText[1], colors.darkText[2]);
        doc.text(edu.degree, mainX, mainY);

        if (edu.gpa) {
            const gpaLabel = `GPA: ${edu.gpa}`;
            doc.setFontSize(8.5);
            doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
            const gpaWidth = doc.getTextWidth(gpaLabel);
            doc.text(gpaLabel, pageWidth - mainPadding - gpaWidth, mainY);
        }

        mainY += 4;
        if (edu.field) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
            doc.text(`${edu.field}`, mainX, mainY);
            mainY += 4;
        }
        mainY += 6;
    });

    doc.save(`${cvData.fullName.replace(/\s+/g, '_')}_CV.pdf`);
};
