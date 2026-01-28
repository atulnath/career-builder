# CV Builder Pro 📄✨

**CV Builder Pro** is a high-performance, modern web application designed for professionals to create, preview, and export high-quality, industry-standard CVs. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, it offers a seamless real-time experience with precise PDF generation.

[CV Builder Pro Preview](https://atulnath.github.io/career-builder/)

## 🚀 Features

- **Live Real-Time Preview**: Watch your CV update instantly as you type.
- **Micro-Engineered PDF Export**: Custom-built PDF generation logic using `jsPDF` that ensures:
  - **Perfect Justification**: Block-aligned text for a premium, typeset look.
  - **Markdown Link Support**: Hyperlinks in your experience or profile are automatically converted into clickable PDF links.
  - **Intelligent Spacing**: Automatic layout adjustments to keep your content on a single page.
- **Multi-Language Support**: Seamlessly toggle between **English** and **German (Deutsch)** with localized labels and date formats.
- **Modern UI/UX**: A sleek, dark-themed dashboard built with glassmorphism and Lucide icons.
- **Educational Context**: Specialized fields for GPA, Specializations, and Thesis details.
- **Photo Upload**: Professional profile picture integration with rounded-corner processing.

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **PDF Generation**: [jsPDF](https://rawgit.com/MrRio/jsPDF/master/docs/index.html)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: CSS Transitions & Lucide-react

## 📦 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/simple-cv-builder.git
   cd simple-cv-builder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📄 PDF Export Customization

The PDF engine is located in `lib/pdfGenerator.ts`. It includes a custom `renderMarkdownText` function that handles:
- Line wrapping
- Atom-based text grouping
- Clickable URL link injection
- Dynamic justification

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for new PDF templates or additional language support.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by [Atul Chandra Nath](https://github.com/atulnath)
