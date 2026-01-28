'use client';

import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    ExternalLink,
    Calendar,
    MapPin,
    DollarSign,
    Trash2,
    Edit2,
    CheckCircle2,
    Clock,
    X
} from 'lucide-react';
import { CVData, JobApplication, ApplicationStatus } from '@/lib/types';

interface ApplicationTrackerProps {
    cvData: CVData;
    setCVData: (data: any) => void;
}

const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({ cvData, setCVData }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');

    const [newApp, setNewApp] = useState<Partial<JobApplication>>({
        company: '',
        role: '',
        location: '',
        status: 'Interested',
        appliedDate: new Date().toISOString().split('T')[0],
        link: '',
        notes: '',
    });

    const handleAddApplication = () => {
        if (!newApp.company || !newApp.role) return;

        const application: JobApplication = {
            id: `app-${Date.now()}`,
            company: newApp.company || '',
            role: newApp.role || '',
            location: newApp.location || '',
            status: (newApp.status as ApplicationStatus) || 'Interested',
            appliedDate: newApp.appliedDate || new Date().toISOString().split('T')[0],
            link: newApp.link || '',
            notes: newApp.notes || '',
            salary: newApp.salary || '',
        };

        setCVData((prev: CVData) => ({
            ...prev,
            applications: [application, ...(prev.applications || [])]
        }));

        setIsAdding(false);
        setNewApp({
            company: '',
            role: '',
            location: '',
            status: 'Interested',
            appliedDate: new Date().toISOString().split('T')[0],
            link: '',
            notes: '',
        });
    };

    const removeApplication = (id: string) => {
        setCVData((prev: CVData) => ({
            ...prev,
            applications: prev.applications.filter(a => a.id !== id)
        }));
    };

    const updateStatus = (id: string, status: ApplicationStatus) => {
        setCVData((prev: CVData) => ({
            ...prev,
            applications: prev.applications.map(a => a.id === id ? { ...a, status } : a)
        }));
    };

    const filteredApps = (cvData.applications || []).filter(app => {
        const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statusColors: Record<ApplicationStatus, string> = {
        'Interested': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
        'Applied': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'Phone Screen': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        'Technical': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        'Final Round': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
        'Offer': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'Rejected': 'bg-red-500/10 text-red-400 border-red-500/20',
        'Ghosted': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-white mb-2 leading-tight">Job <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Tracker</span></h2>
                    <p className="text-slate-400 text-lg">Detailed view of your journey to 1,000 applications.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-xl shadow-blue-500/20"
                >
                    <Plus size={18} />
                    ADD NEW APPLICATION
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by company or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900/40 border border-slate-800/50 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                    />
                </div>
                <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                    <Filter className="text-slate-500 shrink-0" size={18} />
                    {(['All', 'Interested', 'Applied', 'Phone Screen', 'Technical', 'Final Round', 'Offer', 'Rejected'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${statusFilter === status
                                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                                : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Applications List */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-[32px] overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800/50">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Company & Role</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Applied Date</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Location</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/30">
                            {filteredApps.length > 0 ? (
                                filteredApps.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-800/20 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center font-black text-blue-400 border border-slate-800/50">
                                                    {app.company[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{app.role}</p>
                                                    <p className="text-xs text-slate-500 font-medium">{app.company}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <select
                                                value={app.status}
                                                onChange={(e) => updateStatus(app.id, e.target.value as ApplicationStatus)}
                                                className={`text-[10px] font-black px-3 py-1.5 rounded-full border ${statusColors[app.status]} uppercase tracking-widest bg-transparent focus:outline-none cursor-pointer`}
                                            >
                                                {Object.keys(statusColors).map(s => (
                                                    <option key={s} value={s} className="bg-slate-900 text-white">{s.toUpperCase()}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-tight">
                                                <Calendar size={14} className="text-slate-600" />
                                                {app.appliedDate}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-tight">
                                                <MapPin size={14} className="text-slate-600" />
                                                {app.location}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                {app.link && (
                                                    <a href={app.link} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-blue-400 transition-colors">
                                                        <ExternalLink size={16} />
                                                    </a>
                                                )}
                                                <button onClick={() => removeApplication(app.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-slate-500 font-medium italic">
                                        No applications match your search criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Application Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-sm bg-slate-950/60 transition-all duration-500">
                    <div className="bg-slate-900 border border-slate-800 shadow-2xl rounded-[40px] w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-800/20">
                            <h3 className="text-2xl font-black text-white">Log Application</h3>
                            <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Company Name *</label>
                                <input
                                    type="text"
                                    value={newApp.company}
                                    onChange={(e) => setNewApp({ ...newApp, company: e.target.value })}
                                    spellCheck={false}
                                    lang={cvData.language || 'en'}
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                    placeholder="e.g. Tesla, Google"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Position Role *</label>
                                <input
                                    type="text"
                                    value={newApp.role}
                                    onChange={(e) => setNewApp({ ...newApp, role: e.target.value })}
                                    spellCheck={false}
                                    lang={cvData.language || 'en'}
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                    placeholder="e.g. CV Engineer"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Location</label>
                                <input
                                    type="text"
                                    value={newApp.location}
                                    onChange={(e) => setNewApp({ ...newApp, location: e.target.value })}
                                    spellCheck={false}
                                    lang={cvData.language || 'en'}
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                    placeholder="e.g. Berlin, Remote"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Applied Date</label>
                                <input
                                    type="date"
                                    value={newApp.appliedDate}
                                    onChange={(e) => setNewApp({ ...newApp, appliedDate: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Job Link</label>
                                <input
                                    type="url"
                                    value={newApp.link}
                                    onChange={(e) => setNewApp({ ...newApp, link: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                    placeholder="https://linkedin.com/jobs/..."
                                />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Personal Notes</label>
                                <textarea
                                    value={newApp.notes}
                                    rows={3}
                                    spellCheck={false}
                                    lang={cvData.language || 'en'}
                                    onChange={(e) => setNewApp({ ...newApp, notes: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium resize-none"
                                    placeholder="Brief thoughts about the role or referral info..."
                                />
                            </div>
                        </div>

                        <div className="p-8 border-t border-slate-800 bg-slate-800/20 flex gap-4">
                            <button
                                onClick={() => setIsAdding(false)}
                                className="flex-1 px-8 py-4 rounded-2xl font-black text-sm text-slate-400 hover:bg-slate-800 transition-all"
                            >
                                CANCEL
                            </button>
                            <button
                                onClick={handleAddApplication}
                                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-xl shadow-blue-500/40"
                            >
                                SAVE APPLICATION
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationTracker;
