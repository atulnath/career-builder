# Career Hub 🚀

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=for-the-badge&logo=firebase)

**A premium, all-in-one career management platform for professionals**

[Live Demo](https://atulnath.github.io/career-builder/) · [Report Bug](https://github.com/atulnath/career-builder/issues) · [Request Feature](https://github.com/atulnath/career-builder/issues)

</div>

---

## ✨ Features

### 📄 Professional CV Builder
- **Real-time A4 Preview** — Watch your CV update instantly as you type
- **Multi-Profile System** — Create tailored CVs for different job types (e.g., "Full Stack Developer", "Data Scientist")
- **PDF & DOCX Export** — Generate pixel-perfect documents with proper formatting
- **Multi-Language Support** — Toggle between English and German with localized labels
- **Photo Integration** — Professional profile picture with rounded-corner processing

### 📨 Cover Letter Hub
- **Template Variants** — Modern and classic letter styles
- **PDF Generation** — DIN 5008 compliant German business letters
- **Auto-fill Support** — Recipient and company details

### 📊 Application Tracker
- **Pipeline Management** — Track applications through 8 stages (Interested → Offer/Rejected)
- **Notes & Salary Tracking** — Store interview notes and compensation details
- **Profile Linking** — Connect applications to specific CV profiles

### 🔖 Job Bookmarks
- **Save Links** — Bookmark job postings to apply later
- **Tags & Notes** — Organize with custom tags and notes
- **Quick Access** — One-click open in new tab

### 🎓 Interview Prep
- **Note Management** — Store preparation notes by topic
- **Quick Reference** — Access during interview prep sessions

### 🔒 Cloud Sync
- **Firebase Authentication** — Secure login with email/password
- **Firestore Database** — Real-time data synchronization
- **Per-Language Storage** — Separate CV data for each language

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router + Turbopack) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| **Authentication** | [Firebase Auth](https://firebase.google.com/products/auth) |
| **Database** | [Cloud Firestore](https://firebase.google.com/products/firestore) |
| **PDF Generation** | [jsPDF](https://github.com/parallax/jsPDF) |
| **DOCX Generation** | [docx](https://github.com/dolanmiu/docx) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📁 Project Structure

```
career-builder/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main application (CV Builder, Dashboard, etc.)
│   ├── layout.tsx         # Root layout with fonts
│   └── globals.css        # Global styles
│
├── components/
│   ├── Auth/              # Login/Signup views
│   ├── Bookmarks/         # Job bookmark manager
│   ├── CVForm/            # Form sections (Personal, Experience, etc.)
│   ├── CVPreview/         # A4 preview components (Sidebar, MainContent)
│   ├── CoverLetter/       # Cover letter editor and preview
│   ├── Dashboard/         # Dashboard analytics view
│   ├── Interview/         # Interview prep notes
│   ├── Navigation/        # Sidebar navigation
│   └── Applications/      # Job application tracker
│
├── hooks/
│   └── useCVData.ts       # Main state management hook with Firebase sync
│
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── constants.ts       # UI labels (EN/DE)
│   ├── firebase.ts        # Firebase configuration
│   ├── pdfGenerator.ts    # CV PDF export logic
│   ├── docxGenerator.ts   # CV DOCX export logic
│   └── letterGenerator.ts # Cover letter PDF export
│
└── public/                # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.0.0 or higher
- **npm** or **yarn**
- **Firebase Project** (for authentication and database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/atulnath/career-builder.git
   cd career-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   Create a `.env.local` file with your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📄 Export Features

### PDF Generation (`lib/pdfGenerator.ts`)

The CV PDF engine includes:
- **Perfect Text Justification** — Block-aligned text for a premium typeset look
- **Markdown Link Support** — Hyperlinks are automatically converted to clickable PDF links
- **Intelligent Layout** — Automatic spacing to fit content on a single A4 page
- **German Date Formatting** — Localized date formats based on CV language

### DOCX Generation (`lib/docxGenerator.ts`)

Word document export with:
- **Proper Formatting** — Headings, paragraphs, and bullet points
- **ATS Compatibility** — Clean structure for applicant tracking systems
- **Photo Embedding** — Profile picture included in header

---

## 🎨 Design System

The UI features a premium dark theme with:
- **Glassmorphism** — Backdrop blur and transparency effects
- **Gradient Accents** — Blue-to-indigo color scheme
- **Smooth Animations** — CSS transitions and micro-interactions
- **Responsive Layout** — Mobile-friendly with collapsible sidebar

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Atul Chandra Nath**

- GitHub: [@atulnath](https://github.com/atulnath)
- Portfolio: [atulnath.github.io](https://atulnath.github.io)
- LeetCode: [leetcode.com/u/atul15](https://leetcode.com/u/atul15/)

---

<div align="center">

Built with ❤️ using Next.js and TypeScript

</div>
