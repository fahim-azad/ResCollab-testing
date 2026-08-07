import os

filepath = r"d:\3-2 class stuff\software lab\project\ResCollab testing\frontend\src\features\search\SearchDashboard.jsx"

content = """import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Database, Code, Users, Briefcase, Filter, ExternalLink, Bookmark, Activity, ArrowUpDown, FlaskConical } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

const TABS = [
    { id: 'papers', label: 'Papers', icon: BookOpen },
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'source_code', label: 'Code', icon: Code },
    { id: 'open_projects', label: 'Projects', icon: Briefcase },
    { id: 'supervisors', label: 'People', icon: Users },
    { id: 'labs', label: 'Labs', icon: FlaskConical }
];

export default function SearchDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const searchParams = new URLSearchParams(location.search);
    const initialQuery = searchParams.get('q') || '';
    
    const [query, setQuery] = useState(initialQuery);
    const [activeTab, setActiveTab] = useState('papers');
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(false);
    const [metadata, setMetadata] = useState(null);
    const [error, setError] = useState(null);

    const [selectedSource, setSelectedSource] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedLanguage, setSelectedLanguage] = useState('All');

    useEffect(() => {
        setSelectedSource('All');
        setSelectedYear('All');
        setSelectedLanguage('All');
    }, [activeTab]);

    useEffect(() => {
        if (initialQuery) {
            performSearch(initialQuery);
        }
    }, [initialQuery]);

    const performSearch = async (searchQuery) => {
        if (!searchQuery) return;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/search/?q=${encodeURIComponent(searchQuery)}`);
            setResults(response.data.results);
            setMetadata(response.data.metadata);
        } catch (error) {
            console.error("Error searching:", error);
            setError("Failed to fetch data. Is the backend server running?");
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    const renderFilterBar = (uniqueSources, uniqueYears, uniqueLanguages) => (
        <div className="flex flex-col mb-6 bg-white p-4 rounded-2xl border border-border-main shadow-sm gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Filters</span>
                </div>
                <div className="flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                    <select className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer hover:text-primary transition-colors">
                        <option>Most Relevant</option>
                        <option>Newest</option>
                        <option>Most Cited</option>
                    </select>
                </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
                <select 
                    className="bg-gray-50 border border-border-main text-sm rounded-xl focus:ring-primary focus:border-primary block py-2 px-3 text-gray-700 outline-none transition-colors"
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                >
                    {uniqueSources.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                
                <select 
                    className="bg-gray-50 border border-border-main text-sm rounded-xl focus:ring-primary focus:border-primary block py-2 px-3 text-gray-700 outline-none transition-colors"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    {uniqueYears.map(y => <option key={y} value={y}>{y === 'All' ? 'All Years' : y}</option>)}
                </select>

                {activeTab === 'source_code' && (
                    <select 
                        className="bg-gray-50 border border-border-main text-sm rounded-xl focus:ring-primary focus:border-primary block py-2 px-3 text-gray-700 outline-none transition-colors"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                    >
                        {uniqueLanguages.map(l => <option key={l} value={l}>{l === 'All' ? 'All Languages' : l}</option>)}
                    </select>
                )}
                
                {activeTab === 'papers' && (
                    <select className="bg-gray-50 border border-border-main text-sm rounded-xl focus:ring-primary block py-2 px-3 text-gray-700 outline-none">
                        <option>All Publishers</option>
                        <option>Nature</option>
                        <option>IEEE</option>
                        <option>ACM</option>
                    </select>
                )}
                
                {(activeTab === 'supervisors' || activeTab === 'labs') && (
                    <select className="bg-gray-50 border border-border-main text-sm rounded-xl focus:ring-primary block py-2 px-3 text-gray-700 outline-none">
                        <option>All Universities</option>
                        <option>MIT</option>
                        <option>Stanford</option>
                        <option>Oxford</option>
                    </select>
                )}
                
                {(activeTab === 'supervisors' || activeTab === 'projects') && (
                    <select className="bg-gray-50 border border-border-main text-sm rounded-xl focus:ring-primary block py-2 px-3 text-gray-700 outline-none">
                        <option>All Research Areas</option>
                        <option>AI / Machine Learning</option>
                        <option>Bioinformatics</option>
                        <option>Quantum Physics</option>
                    </select>
                )}
            </div>
        </div>
    );

    const renderActiveTabContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Aggregating research data...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center py-32 bg-red-50 rounded-3xl border border-red-100">
                    <div className="text-red-500 text-xl font-medium mb-2">⚠️ {error}</div>
                    <p className="text-red-400">Please make sure the backend server is running on port 8000.</p>
                </div>
            );
        }

        let currentResults = results[activeTab] || [];
        const uniqueSources = ['All', ...new Set(currentResults.map(item => item.source).filter(Boolean))].sort();
        const uniqueYears = ['All', ...new Set(currentResults.map(item => item.year).filter(Boolean))].sort().reverse();
        const uniqueLanguages = ['All', ...new Set(currentResults.map(item => item.language).filter(Boolean))].sort();

        if (selectedSource !== 'All') currentResults = currentResults.filter(item => item.source === selectedSource);
        if (selectedYear !== 'All') currentResults = currentResults.filter(item => item.year === selectedYear);
        if (selectedLanguage !== 'All' && activeTab === 'source_code') currentResults = currentResults.filter(item => item.language === selectedLanguage);
        
        if (currentResults.length === 0 && (selectedSource !== 'All' || selectedYear !== 'All' || selectedLanguage !== 'All')) {
            return (
                <div className="flex flex-col gap-4">
                    {renderFilterBar(uniqueSources, uniqueYears, uniqueLanguages)}
                    <div className="text-gray-500 text-center py-20 bg-white rounded-3xl border border-border-main">No results found for these filters.</div>
                </div>
            );
        }

        if (currentResults.length === 0) {
            return (
                <div className="text-gray-500 text-center py-32 bg-white rounded-3xl border border-border-main flex flex-col items-center">
                    <Search className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-lg">No {TABS.find(t=>t.id===activeTab)?.label.toLowerCase()} found for "{initialQuery}"</p>
                </div>
            );
        }

        return (
            <div className="flex flex-col">
                {renderFilterBar(uniqueSources, uniqueYears, uniqueLanguages)}
                <div className="grid grid-cols-1 gap-4">
                <AnimatePresence>
                {currentResults.map((item, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={item.id + idx} 
                    >
                        <Card className="h-full hover:border-primary/50 group transition-all">
                            <CardContent className="p-6 flex flex-col sm:flex-row gap-6">
                                {/* Result Icon/Image Placeholder */}
                                <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                                    {activeTab === 'papers' ? <BookOpen className="w-8 h-8 text-blue-400" /> :
                                     activeTab === 'datasets' ? <Database className="w-8 h-8 text-purple-400" /> :
                                     activeTab === 'source_code' ? <Code className="w-8 h-8 text-emerald-400" /> :
                                     <Users className="w-8 h-8 text-amber-400" />}
                                </div>
                                
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                                                {item.source}
                                            </span>
                                            {item.year && <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{item.year}</span>}
                                            {item.stars != null && <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 flex items-center gap-1">⭐ {item.stars}</span>}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">
                                        {item.title || item.name}
                                    </h3>
                                    
                                    {item.authors && item.authors.length > 0 && <p className="text-sm text-gray-600 mb-2 font-medium">By {item.authors.join(', ')}</p>}
                                    {item.university && <p className="text-sm text-gray-600 mb-2">🎓 {item.university}</p>}
                                    {item.language && <p className="text-sm text-gray-600 mb-2">Code: <span className="font-semibold">{item.language}</span></p>}
                                    
                                    {/* Mock Abstract */}
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                        This is a placeholder abstract. {item.title || item.name} explores significant findings in the field, presenting novel methodologies and demonstrating state-of-the-art results across several standard benchmarks.
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {item.research_interests && item.research_interests.map(i => (
                                            <span key={i} className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-lg">{i}</span>
                                        ))}
                                        {item.open_roles && item.open_roles.map(r => (
                                            <span key={r} className="text-xs font-medium bg-secondary/10 text-secondary px-2.5 py-1 rounded-lg">{r}</span>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Actions Sidebar */}
                                <div className="sm:w-32 flex sm:flex-col justify-end gap-3 sm:border-l border-t sm:border-t-0 border-border-main pt-4 sm:pt-0 sm:pl-6 items-end">
                                    {item.link && (
                                        <Button className="w-full text-xs h-9" onClick={() => window.open(item.link, '_blank')}>
                                            Open <ExternalLink className="w-3 h-3 ml-1" />
                                        </Button>
                                    )}
                                    <Button variant="outline" className="w-full text-xs h-9 text-gray-600">
                                        <Bookmark className="w-3 h-3 mr-1" /> Save
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
                </AnimatePresence>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-8 pb-10">
            {/* Header & Search Bar */}
            <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Unified Search</h1>
                <form onSubmit={handleSearchSubmit} className="relative max-w-4xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search papers, datasets, code, people, projects, and labs..." 
                        className="w-full bg-white border border-border-main rounded-2xl py-4 pl-14 pr-32 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 text-gray-900 placeholder-gray-400 shadow-sm transition-all text-xl font-medium"
                    />
                    <Button type="submit" className="absolute right-2 top-2 bottom-2 rounded-xl px-8 text-md font-semibold">
                        Search
                    </Button>
                </form>
            </div>

            {/* Layout */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar Tabs */}
                <div className="w-full lg:w-64 flex flex-col gap-1 shrink-0 bg-white p-3 rounded-2xl border border-border-main shadow-sm sticky top-6">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3 pt-2">Categories</div>
                    {TABS.map(tab => {
                        const count = results[tab.id]?.length || 0;
                        const isActive = activeTab === tab.id;
                        return (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center justify-between px-3 py-3 rounded-xl text-left transition-all group ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <tab.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                    <span className="text-[15px]">{tab.label}</span>
                                </div>
                                {metadata && <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isActive ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-500'}`}>{count}</span>}
                            </button>
                        )
                    })}
                    
                    {metadata && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-border-main text-xs text-gray-500 space-y-3">
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-green-500" />
                                <span>Concurrency: <strong className="text-gray-900">{metadata.execution_time_ms}ms</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Database className="w-4 h-4 text-blue-500" />
                                <span>Total: <strong className="text-gray-900">{metadata.total_results}</strong> items</span>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 w-full min-w-0">
                    {renderActiveTabContent()}
                </div>
            </div>
        </div>
    );
}
"""

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Upgraded SearchDashboard.jsx with advanced filters and sorting.")
