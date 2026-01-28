'use client';

import React from 'react';
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Mail,
    Settings,
    GraduationCap,
    MessageSquare,
    BarChart3,
    ChevronLeft,
    ChevronRight,
    LogOut
} from 'lucide-react';

export type ViewType = 'dashboard' | 'cv-builder' | 'applications' | 'cover-letters' | 'interview-prep';

interface SidebarProps {
    currentView: ViewType;
    setView: (view: ViewType) => void;
    isCollapsed: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isCollapsed, onToggle }) => {

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'cv-builder', label: 'CV Builder', icon: FileText },
        { id: 'applications', label: 'Applications', icon: Briefcase },
        { id: 'cover-letters', label: 'Cover Letters', icon: Mail },
        { id: 'interview-prep', label: 'Interview Prep', icon: MessageSquare },
    ];

    return (
        <div className={`${isCollapsed ? 'w-24' : 'w-72'} bg-slate-900/40 backdrop-blur-xl border-r border-slate-800/50 h-screen sticky top-0 flex flex-col p-6 transition-all duration-300 ease-in-out z-[60]`}>
            <div className={`flex items-center gap-4 mb-12 px-2 ${isCollapsed ? 'justify-center' : ''}`}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                    <GraduationCap className="text-white w-6 h-6" />
                </div>
                {!isCollapsed && (
                    <h1 className="text-xl font-black text-white tracking-tight animate-in fade-in duration-300">Career<span className="text-blue-400">Hub</span></h1>
                )}
            </div>

            <button
                onClick={onToggle}
                className="absolute -right-3 top-20 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-slate-900 hover:bg-blue-500 transition-colors z-10"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>


            <nav className="flex-1 space-y-2">
                {!isCollapsed && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-4 mb-4 animate-in fade-in">Main Menu</p>}
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id as ViewType)}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${currentView === item.id
                            ? 'bg-blue-600 shadow-xl shadow-blue-500/20 text-white'
                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                            } ${isCollapsed ? 'justify-center' : ''}`}
                        title={isCollapsed ? item.label : ''}
                    >
                        <item.icon className={`w-5 h-5 shrink-0 ${currentView === item.id ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`} />
                        {!isCollapsed && (
                            <span className="font-bold text-sm tracking-wide animate-in slide-in-from-left-2">{item.label}</span>
                        )}
                        {!isCollapsed && currentView === item.id && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                        )}
                    </button>
                ))}
            </nav>

            <div className="mt-auto space-y-4 pt-8 border-t border-slate-800/50">
                <button className={`w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white transition-colors group ${isCollapsed ? 'justify-center' : ''}`}>
                    <Settings className="w-5 h-5 shrink-0 group-hover:rotate-90 transition-transform duration-500" />
                    {!isCollapsed && <span className="font-bold text-sm">Settings</span>}
                </button>


                {!isCollapsed && (
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 rounded-2xl border border-slate-700/30 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="w-4 h-4 text-blue-400" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Search</span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium leading-relaxed">
                            Targeting <span className="text-blue-400 font-bold">1,000</span> positions over <span className="text-indigo-400 font-bold">18 months</span>.
                        </p>
                        <div className="mt-3 w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full w-[2%] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Sidebar;
