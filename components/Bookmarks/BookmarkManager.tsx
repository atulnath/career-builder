/**
 * BookmarkManager Component
 * 
 * Manages saved job link bookmarks for later application.
 * Features:
 * - Add bookmarks with title, URL, notes, and tags
 * - Search and filter bookmarks
 * - One-click open in new tab
 * - Delete bookmarks
 * - Grid layout with card UI
 * 
 * @module components/Bookmarks/BookmarkManager
 */

'use client';

import React, { useState } from 'react';
import {
    Plus,
    ExternalLink,
    Trash2,
    Bookmark,
    Link2,
    Search,
    X,
    Tag
} from 'lucide-react';
import { CVData, Bookmark as BookmarkType } from '@/lib/types';

interface BookmarkManagerProps {
    cvData: CVData;
    setCVData: (data: any) => void;
}

const BookmarkManager: React.FC<BookmarkManagerProps> = ({ cvData, setCVData }) => {
    const [isAddingBookmark, setIsAddingBookmark] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [newBookmark, setNewBookmark] = useState({
        title: '',
        url: '',
        notes: '',
        tags: ''
    });

    const bookmarks = cvData.bookmarks || [];

    const handleAddBookmark = () => {
        if (!newBookmark.title.trim() || !newBookmark.url.trim()) return;

        const bookmark: BookmarkType = {
            id: `bookmark-${Date.now()}`,
            title: newBookmark.title.trim(),
            url: newBookmark.url.trim().startsWith('http') ? newBookmark.url.trim() : `https://${newBookmark.url.trim()}`,
            notes: newBookmark.notes.trim() || undefined,
            createdAt: new Date().toISOString(),
            tags: newBookmark.tags.trim() ? newBookmark.tags.split(',').map(t => t.trim()).filter(Boolean) : undefined
        };

        setCVData((prev: CVData) => ({
            ...prev,
            bookmarks: [...(prev.bookmarks || []), bookmark]
        }));

        setNewBookmark({ title: '', url: '', notes: '', tags: '' });
        setIsAddingBookmark(false);
    };

    const removeBookmark = (id: string) => {
        setCVData((prev: CVData) => ({
            ...prev,
            bookmarks: (prev.bookmarks || []).filter((b: BookmarkType) => b.id !== id)
        }));
    };

    const openBookmark = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const filteredBookmarks = bookmarks.filter((b: BookmarkType) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.notes && b.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (b.tags && b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    return (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white tracking-tight">
                        Job <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Bookmarks</span>
                    </h2>
                    <p className="text-slate-400 text-lg">Save important job links to apply later.</p>
                </div>

                <button
                    onClick={() => setIsAddingBookmark(true)}
                    className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-orange-500/20 active:scale-95"
                >
                    <Plus size={20} />
                    Add Bookmark
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                    type="text"
                    placeholder="Search bookmarks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-5 py-4 bg-slate-900/60 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                />
            </div>

            {/* Add Bookmark Modal */}
            {isAddingBookmark && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setIsAddingBookmark(false)}></div>
                    <div className="relative bg-slate-900 border border-slate-700/50 rounded-[32px] p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                                    <Bookmark size={24} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-white">New Bookmark</h3>
                            </div>
                            <button onClick={() => setIsAddingBookmark(false)} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
                                <X size={24} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Title *</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Google SWE Position"
                                    value={newBookmark.title}
                                    onChange={(e) => setNewBookmark(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">URL *</label>
                                <div className="relative">
                                    <Link2 size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="https://example.com/job"
                                        value={newBookmark.url}
                                        onChange={(e) => setNewBookmark(prev => ({ ...prev, url: e.target.value }))}
                                        className="w-full pl-14 pr-5 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Notes</label>
                                <textarea
                                    placeholder="Add any notes about this position..."
                                    value={newBookmark.notes}
                                    onChange={(e) => setNewBookmark(prev => ({ ...prev, notes: e.target.value }))}
                                    className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all min-h-[100px] resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tags (comma separated)</label>
                                <div className="relative">
                                    <Tag size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="remote, python, startup"
                                        value={newBookmark.tags}
                                        onChange={(e) => setNewBookmark(prev => ({ ...prev, tags: e.target.value }))}
                                        className="w-full pl-14 pr-5 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => setIsAddingBookmark(false)}
                                className="flex-1 py-4 bg-slate-800/80 text-slate-300 rounded-2xl font-bold text-sm hover:bg-slate-700 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddBookmark}
                                disabled={!newBookmark.title.trim() || !newBookmark.url.trim()}
                                className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-orange-500/20"
                            >
                                Save Bookmark
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bookmarks Grid */}
            {filteredBookmarks.length === 0 ? (
                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-[32px] p-16 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-amber-500/10 rounded-3xl flex items-center justify-center">
                        <Bookmark size={40} className="text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Bookmarks Yet</h3>
                    <p className="text-slate-400 mb-6">Save job links you want to apply to later.</p>
                    <button
                        onClick={() => setIsAddingBookmark(true)}
                        className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-6 py-3 rounded-xl font-bold text-sm border border-amber-500/20 hover:bg-amber-500/20 transition-all"
                    >
                        <Plus size={18} />
                        Add Your First Bookmark
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBookmarks.map((bookmark: BookmarkType) => (
                        <div
                            key={bookmark.id}
                            className="group bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-[24px] p-6 hover:border-amber-500/30 transition-all hover:shadow-xl hover:shadow-amber-500/5"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-all">
                                    <Bookmark size={22} className="text-amber-400" />
                                </div>
                                <button
                                    onClick={() => removeBookmark(bookmark.id)}
                                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{bookmark.title}</h3>

                            {bookmark.notes && (
                                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{bookmark.notes}</p>
                            )}

                            {bookmark.tags && bookmark.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {bookmark.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-slate-800/80 text-slate-300 text-xs font-bold rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                                <span className="text-xs text-slate-500">
                                    {new Date(bookmark.createdAt).toLocaleDateString()}
                                </span>
                                <button
                                    onClick={() => openBookmark(bookmark.url)}
                                    className="flex items-center gap-2 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-xl font-bold text-xs border border-amber-500/20 hover:bg-amber-500/20 transition-all"
                                >
                                    <ExternalLink size={14} />
                                    Open
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Stats */}
            {bookmarks.length > 0 && (
                <div className="mt-10 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-2xl p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                            <Bookmark size={20} className="text-amber-400" />
                        </div>
                        <div>
                            <p className="text-white font-bold">{bookmarks.length} Bookmark{bookmarks.length !== 1 ? 's' : ''} Saved</p>
                            <p className="text-xs text-slate-500">Click on any bookmark to open in a new tab</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookmarkManager;
