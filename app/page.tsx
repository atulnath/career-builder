/**
 * Career Hub - Main Application Entry Point
 * 
 * This is the primary page component that orchestrates the entire application.
 * It handles:
 * - Firebase authentication (login/logout)
 * - Navigation between views (Dashboard, CV Builder, Applications, etc.)
 * - CV data state management via useCVData hook
 * - Real-time CV preview with auto-scroll
 * - PDF/DOCX export functionality
 * 
 * @module app/page
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

import {
  Download,
  FileText,
  Cloud,
  CheckCircle2,
  Loader2,
  Save,
  Menu,
  X,
  LogOut,
  Settings
} from 'lucide-react';

import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import LoginView from '@/components/Auth/LoginView';

import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import ProfileManager from '@/components/ProfileManager';
import Sidebar, { ViewType } from '@/components/Navigation/Sidebar';
import DashboardView from '@/components/Dashboard/DashboardView';
import ApplicationTracker from '@/components/Applications/ApplicationTracker';
import CoverLetterHub from '@/components/CoverLetter/CoverLetterHub';
import InterviewPrep from '@/components/Interview/InterviewPrep';
import BookmarkManager from '@/components/Bookmarks/BookmarkManager';
import { generatePDF } from '@/lib/pdfGenerator';
import { generateCV_DOCX } from '@/lib/docxGenerator';


import { CVData } from '@/lib/types';
import { useCVData } from '@/hooks/useCVData';
import { EMPTY_CV_DATA, isAdminUser } from '@/lib/defaultData';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Restore session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);

  const {
    cvData,
    setCVData,
    saveStatus,
    dataLoading,
    saveToCloud,
    switchProfile,
    addProfile,
    removeProfile,
    updateProfileName
  } = useCVData(EMPTY_CV_DATA, user?.uid || null);

  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const handleSectionOpen = useCallback((sectionId: string) => {
    if (previewContainerRef.current) {
      const targetElement = previewContainerRef.current.querySelector(`#preview-${sectionId}`) as HTMLElement;
      if (targetElement) {
        // Get the parent scrollable container
        const scrollContainer = previewContainerRef.current;
        // Calculate the scaled offset (preview is scaled to ~0.52)
        const scale = window.innerWidth >= 1536 ? 0.6 : 0.52; // 2xl:scale-[0.6] or scale-[0.52]
        const targetOffset = targetElement.offsetTop * scale;

        scrollContainer.scrollTo({
          top: targetOffset,
          behavior: 'smooth'
        });
      }
    }
  }, []);

  const handleDownloadPDF = async () => {
    await generatePDF(cvData);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-slate-400 text-sm">Loading your data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 font-sans flex overflow-hidden">
      {/* Sidebar Navigation */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-[100]`}>
        <Sidebar
          currentView={currentView}
          setView={setCurrentView}
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>

        {/* Global Toolbar */}
        <header className="h-20 bg-slate-950/40 backdrop-blur-xl border-b border-slate-800/50 flex items-center justify-between px-8 sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-slate-400 hover:text-white p-2">
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Logged in as {user.email?.split('@')[0]}</p>
                {isAdminUser(user.email) && (
                  <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full text-[9px] font-black text-amber-400 uppercase tracking-widest hidden sm:block">
                    Admin
                  </span>
                )}
              </div>
              <div className="w-px h-3 bg-slate-800 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <Cloud size={10} className="text-blue-400" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">Firebase Synchronized</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Language Toggle */}
            <div className="flex items-center bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
              <button
                onClick={() => setCVData(prev => ({ ...prev, language: 'en' }))}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${cvData.language === 'en' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                EN
              </button>
              <button
                onClick={() => setCVData(prev => ({ ...prev, language: 'de' }))}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${cvData.language === 'de' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                DE
              </button>
            </div>

            <div className="w-px h-6 bg-slate-800 hidden md:block"></div>

            {/* Context Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={saveToCloud}
                disabled={saveStatus === 'saving'}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xl ${saveStatus === 'saved'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : saveStatus === 'error'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                    : 'bg-slate-800/80 text-white border border-slate-700/50 hover:bg-slate-700'
                  }`}
              >
                {saveStatus === 'saving' ? (
                  <Loader2 size={16} className="animate-spin text-blue-400" />
                ) : saveStatus === 'saved' ? (
                  <CheckCircle2 size={16} />
                ) : saveStatus === 'error' ? (
                  <Cloud size={16} />
                ) : (
                  <Save size={16} className="text-blue-400" />
                )}
                {saveStatus === 'saving' ? 'SYNCING' : saveStatus === 'saved' ? 'SYNCED' : saveStatus === 'error' ? 'RETRY' : 'SYNC CLOUD'}
              </button>

              {currentView === 'cv-builder' && (
                <>
                  <button
                    onClick={() => setIsPreviewModalOpen(true)}
                    className="flex xl:hidden group relative items-center gap-3 bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all hover:bg-slate-700 active:scale-95 shadow-xl border border-slate-700/50"
                  >
                    <FileText size={16} className="text-blue-400" />
                    PREVIEW
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xl shadow-blue-500/20 active:scale-95 group hidden sm:flex"
                  >
                    <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                    PDF
                  </button>
                  <button
                    onClick={() => generateCV_DOCX(cvData)}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2.5 rounded-xl font-bold text-xs transition-all border border-slate-700/50 hidden md:flex"
                  >
                    <FileText size={16} className="text-blue-400" />
                    WORD
                  </button>
                </>
              )}

              <div className="w-px h-6 bg-slate-800 hidden md:block"></div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-slate-800/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 px-3 py-2.5 rounded-xl font-bold text-xs transition-all border border-slate-700/50"
                title="Logout"
              >
                <LogOut size={16} />
              </button>

            </div>

            {/* Profile Brief */}
            <div className="hidden md:flex items-center gap-3 pl-6 border-l border-slate-800/50">
              <div className="text-right">
                <p className="text-xs font-black text-white">{cvData.fullName}</p>
                <p className="text-[10px] font-bold text-slate-500 tracking-wider">PREMIUM HUB</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-black text-xs text-blue-400 uppercase">
                  {(cvData.fullName || 'User').split(' ').map(n => n[0]).join('')}
                </div>

              </div>
            </div>
          </div>
        </header>

        {/* Dynamic View Scroll Area */}
        <main className="flex-1 overflow-auto custom-scrollbar p-8 lg:p-12 relative z-10">
          <div className="max-w-[1400px] mx-auto">
            {currentView === 'dashboard' && <DashboardView cvData={cvData} />}

            {currentView === 'cv-builder' && (
              <div className="flex gap-8 h-[calc(100vh-12rem)]">
                {/* Left side - Scrollable Form */}
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white tracking-tight">
                      Professional <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">CV Builder</span>
                    </h2>
                    <p className="text-slate-400 text-lg">Tailor your profile for each specific industry or job role.</p>
                  </div>

                  <ProfileManager
                    cvData={cvData}
                    addProfile={addProfile}
                    switchProfile={switchProfile}
                    removeProfile={removeProfile}
                    updateProfileName={updateProfileName}
                  />

                  <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-[32px] p-8 shadow-xl">
                    <CVForm cvData={cvData} setCVData={setCVData} onSectionOpen={handleSectionOpen} />
                  </div>
                </div>

                {/* Right side - Fixed Preview Panel (Sticky within this container) */}
                <div className="hidden xl:block w-[550px] flex-shrink-0">
                  <div className="bg-slate-900/60 backdrop-blur-xl rounded-[40px] p-8 border border-slate-700/50 shadow-2xl h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6 shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">A4 Real-time Engine</h3>
                      </div>
                      <button
                        onClick={() => setIsPreviewModalOpen(true)}
                        className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 tracking-widest hover:bg-blue-500/20 transition-all font-mono"
                      >
                        EXPAND VIEW
                      </button>
                    </div>

                    <div className="flex-1 min-h-0 rounded-[24px] bg-white shadow-2xl relative overflow-hidden">
                      <div ref={previewContainerRef} className="absolute inset-0 overflow-auto custom-scrollbar">
                        <div className="transform scale-[0.48] 2xl:scale-[0.55] origin-top-left ml-2 mt-2">
                          <CVPreview cvData={cvData} />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}


            {/* Application Tracker View */}
            {currentView === 'applications' && (
              <ApplicationTracker cvData={cvData} setCVData={setCVData} />
            )}

            {/* Cover Letter Hub View */}
            {currentView === 'cover-letters' && (
              <CoverLetterHub cvData={cvData} setCVData={setCVData} />
            )}

            {/* Interview Prep View */}
            {currentView === 'interview-prep' && (
              <InterviewPrep cvData={cvData} setCVData={setCVData} />
            )}

            {/* Bookmarks View */}
            {currentView === 'bookmarks' && (
              <BookmarkManager cvData={cvData} setCVData={setCVData} />
            )}

            {/* CV Preview Modal for Mobile/Tablet */}
            {isPreviewModalOpen && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center">
                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl" onClick={() => setIsPreviewModalOpen(false)}></div>
                <div className="relative w-full h-full md:w-[95%] md:h-[90%] md:mt-[5%] bg-slate-900 border border-slate-700/50 md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <FileText size={18} className="text-white" />
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight">Focus Preview</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-xl font-black text-[10px] tracking-widest shadow-xl hover:scale-105 transition-all"
                      >
                        <Download size={14} /> DOWNLOAD
                      </button>
                      <button onClick={() => setIsPreviewModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <X size={24} className="text-slate-400" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto p-4 md:p-12 flex justify-center bg-slate-950/30">
                    <div className="shadow-2xl origin-top scale-[0.9] md:scale-100 transition-transform">
                      <CVPreview cvData={cvData} />
                    </div>
                  </div>
                </div>
              </div>
            )}



          </div>
        </main>
      </div>
    </div>
  );
}

