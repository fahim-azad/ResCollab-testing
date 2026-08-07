import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Mail, MapPin, Building2, Link as LinkIcon, Trophy, BookOpen, Briefcase, Users, Star, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function ResearcherProfilePage() {
  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      
      {/* Profile Header */}
      <Card className="overflow-hidden border-none shadow-md">
        <div className="h-48 bg-gradient-to-r from-primary via-accent to-purple-500 relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        </div>
        <CardContent className="p-8 pt-0 relative flex flex-col md:flex-row gap-6">
            <div className="-mt-20 shrink-0">
                <div className="w-40 h-40 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e2e8f0" alt="Researcher Profile" className="w-full h-full object-cover" />
                </div>
            </div>
            
            <div className="pt-4 flex-1 flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Dr. Sarah Connor</h1>
                    <p className="text-lg text-gray-600 font-medium flex items-center gap-2 mb-4">
                        <GraduationCap className="w-5 h-5 text-gray-400" /> Stanford University
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4"/> Dept of Computer Science</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> Stanford, CA</span>
                    </div>
                </div>
                
                <div className="flex flex-col gap-3 min-w-[200px]">
                    <div className="flex gap-2">
                        <Button className="flex-1">Follow</Button>
                        <Button variant="outline" className="px-3"><Mail className="w-4 h-4"/></Button>
                    </div>
                    <div className="flex justify-between px-2 text-center text-sm font-medium border-t border-gray-100 pt-3">
                        <div><span className="block text-lg font-bold text-gray-900">12k</span> Followers</div>
                        <div><span className="block text-lg font-bold text-gray-900">450</span> Following</div>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Sidebar */}
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-3 border-b border-border-main">
                    <CardTitle className="text-base">About</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Leading research in artificial intelligence, focusing on generative models and their applications in computational biology.
                    </p>
                    <div className="space-y-3 pt-3 border-t border-gray-100 text-sm">
                        <a href="#" className="flex items-center gap-2 text-primary hover:underline font-medium"><LinkIcon className="w-4 h-4"/> Portfolio Website</a>
                        <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"><Mail className="w-4 h-4"/> sarah.c@stanford.edu</a>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3 border-b border-border-main">
                    <CardTitle className="text-base">Research Interests</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                        {['Deep Learning', 'Generative AI', 'Computational Biology', 'Computer Vision'].map(tag => (
                            <span key={tag} className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1.5 rounded-lg">{tag}</span>
                        ))}
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="pb-3 border-b border-border-main">
                    <CardTitle className="text-base">Skills</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                        {['Python', 'PyTorch', 'TensorFlow', 'CUDA', 'Data Pipeline'].map(tag => (
                            <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1.5 rounded-lg border border-gray-200">{tag}</span>
                        ))}
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="pb-3 border-b border-border-main">
                    <CardTitle className="text-base flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-500"/> Awards</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {[
                        { title: "Best Paper Award", org: "NeurIPS 2025" },
                        { title: "Outstanding Researcher", org: "Stanford Engineering" }
                    ].map((award, i) => (
                        <div key={i} className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                            <h4 className="font-semibold text-sm text-gray-900">{award.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{award.org}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
            
            {/* Publications */}
            <Card>
                <CardHeader className="pb-3 border-b border-border-main flex flex-row items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-500"/> Selected Publications</CardTitle>
                    <span className="text-sm text-primary font-medium cursor-pointer">View All (42)</span>
                </CardHeader>
                <CardContent className="p-0">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-5 border-b border-gray-100 last:border-0 hover:bg-blue-50/30 transition-colors cursor-pointer group">
                            <h4 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">Attention Mechanisms in Protein Folding Networks</h4>
                            <p className="text-sm text-gray-600 mb-3">S. Connor, J. Smith, A. Turing</p>
                            <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 border border-gray-200">Nature</span>
                                <span>2026</span>
                                <span className="text-emerald-600 flex items-center gap-1"><Users className="w-3.5 h-3.5"/> 245 Citations</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            
            {/* Projects */}
            <Card>
                <CardHeader className="pb-3 border-b border-border-main flex flex-row items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2"><Briefcase className="w-5 h-5 text-emerald-500"/> Active Projects</CardTitle>
                </CardHeader>
                <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: "Genomic Sequence Alignment API", tags: ["Python", "C++"] },
                        { title: "Open-source Diagnostic LLM", tags: ["PyTorch", "NLP"] }
                    ].map((proj, i) => (
                        <div key={i} className="p-4 border border-border-main rounded-xl hover:border-emerald-500/50 hover:shadow-sm transition-all cursor-pointer">
                            <h4 className="font-bold text-gray-900 mb-2">{proj.title}</h4>
                            <div className="flex gap-2">
                                {proj.tags.map(t => <span key={t} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">{t}</span>)}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}
