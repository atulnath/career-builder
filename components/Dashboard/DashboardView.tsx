'use client';

import React from 'react';
import {
    Users,
    Briefcase,
    CheckCircle2,
    Clock,
    TrendingUp,
    MapPin,
    Link as LinkIcon,
    Calendar
} from 'lucide-react';
import { CVData, JobApplication } from '@/lib/types';

interface DashboardViewProps {
    cvData: CVData;
}

const DashboardView: React.FC<DashboardViewProps> = ({ cvData }) => {
    const stats = [
        { label: 'Total Applications', value: cvData.applications?.length || 0, icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Interviews', value: cvData.applications?.filter(a => ['Phone Screen', 'Technical', 'Final Round'].includes(a.status)).length || 0, icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'Offers Received', value: cvData.applications?.filter(a => a.status === 'Offer').length || 0, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { label: 'Goal Progress', value: `${((cvData.applications?.length || 0) / 1000 * 100).toFixed(1)}%`, icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    ];

    const recentApps = [...(cvData.applications || [])].sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()).slice(0, 5);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-4xl font-black text-white mb-2 leading-tight">
                    Welcome back, <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{(cvData.fullName || 'User').split(' ')[0]}</span>
                </h2>

                <p className="text-slate-400 text-lg">Your 18-month journey is unfolding. Stay consistent, stay focused.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 p-6 rounded-[24px] shadow-xl hover:border-slate-700/50 transition-all group">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-black text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Applications */}
                <div className="xl:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-[32px] p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-white flex items-center gap-3">
                            <Clock className="text-blue-400 w-5 h-5" />
                            Recent Applications
                        </h3>
                        <button className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">View All Tracker</button>
                    </div>

                    {recentApps.length > 0 ? (
                        <div className="space-y-4">
                            {recentApps.map((app) => (
                                <div key={app.id} className="group relative flex items-center gap-6 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 hover:border-blue-500/30 transition-all">
                                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center font-black text-blue-400 border border-slate-700/50">
                                        {app.company[0]}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{app.role}</h4>
                                        <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                                            <span className="font-semibold text-slate-300">{app.company}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                            <MapPin size={12} /> {app.location}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${app.status === 'Applied' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                            app.status === 'Offer' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                            } uppercase tracking-widest`}>
                                            {app.status}
                                        </span>
                                        <p className="text-[10px] text-slate-500 mt-2 font-medium flex items-center justify-end gap-1">
                                            <Calendar size={10} /> {app.appliedDate}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-slate-800/20 rounded-2xl border border-dashed border-slate-700/50">
                            <Briefcase className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                            <p className="text-slate-500 font-bold italic">No applications recorded yet. Let's start the hunt!</p>
                        </div>
                    )}
                </div>

                {/* Skill Matrix Sidebar */}
                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-[32px] p-8 shadow-xl">
                    <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                        <TrendingUp className="text-indigo-400 w-5 h-5" />
                        Top Skill Matrix
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {(cvData.topSkills || []).map((skill, i) => (
                            <span key={i} className="px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl text-xs font-black tracking-wide">
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-800/50">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Job Search Tips</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold shrink-0">1</div>
                                <p className="text-sm text-slate-300 leading-relaxed">Tailor your <span className="text-white font-bold">CV profile</span> for each job application to highlight relevant skills.</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold shrink-0">2</div>
                                <p className="text-sm text-slate-300 leading-relaxed">Track all your <span className="text-white font-bold">applications</span> and follow up after 1-2 weeks if no response.</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold shrink-0">3</div>
                                <p className="text-sm text-slate-300 leading-relaxed">Use <span className="text-white font-bold">bookmarks</span> to save interesting job postings for later review.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
