import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Lightbulb, MessageSquare, ArrowUpCircle, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function ResearchIdeasPage() {
  const ideas = [
    { 
      title: "Self-Healing Smart Contracts using LLMs", 
      problem: "Smart contract vulnerabilities cost billions annually. Current auditing is static.",
      description: "Looking to build a system where an on-chain LLM oracle can temporarily freeze and propose patches to smart contracts upon detecting anomalous transaction patterns.",
      category: "Blockchain / AI", 
      votes: 342, 
      comments: 45,
      status: "Looking for Co-founders"
    },
    { 
      title: "Non-invasive BCI for Motor Output Translation", 
      problem: "Current non-invasive BCIs have too much noise for fluid motor control.",
      description: "I want to apply novel transformer-based signal denoising on EEG data to predict intended motor outputs with higher fidelity.",
      category: "Neuroscience", 
      votes: 189, 
      comments: 21,
      status: "Active Research"
    },
    { 
      title: "Micro-plastic Degrading Enzymes", 
      problem: "Micro-plastics in oceans are accumulating rapidly without scalable biological degradation methods.",
      description: "Using AlphaFold 3 to simulate and design novel enzyme structures that can break down PET plastics at lower temperatures.",
      category: "Bio-engineering", 
      votes: 567, 
      comments: 89,
      status: "Looking for Co-founders"
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Research Idea Marketplace</h1>
            <p className="text-gray-500 mt-2">Pitch your ideas, find collaborators, and join exciting early-stage research.</p>
        </div>
        <Button className="shrink-0 h-11 px-6"><Lightbulb className="w-4 h-4 mr-2"/> Pitch an Idea</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
            {ideas.map((idea, i) => (
                <Card key={i} className="hover:border-primary/40 transition-all">
                    <CardContent className="p-0 flex">
                        {/* Vote Sidebar */}
                        <div className="w-16 bg-gray-50 border-r border-gray-100 flex flex-col items-center py-6 gap-2">
                            <button className="text-gray-400 hover:text-primary transition-colors"><ArrowUpCircle className="w-8 h-8" /></button>
                            <span className="font-bold text-gray-700">{idea.votes}</span>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 flex-1">
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">{idea.category}</span>
                                <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                                    <AlertCircle className="w-3.5 h-3.5"/> {idea.status}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{idea.title}</h3>
                            
                            <div className="space-y-4 mb-6">
                                <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100/50">
                                    <h4 className="text-sm font-semibold text-rose-800 mb-1">The Problem</h4>
                                    <p className="text-sm text-gray-700">{idea.problem}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-1">The Idea</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{idea.description}</p>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                                    <span className="flex items-center gap-1.5 hover:text-primary cursor-pointer transition-colors"><MessageSquare className="w-4 h-4"/> {idea.comments} Comments</span>
                                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4"/> 3 Collaborators</span>
                                </div>
                                <Button className="bg-primary text-white"><CheckCircle2 className="w-4 h-4 mr-2"/> Join Idea</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm">
                        <Lightbulb className="w-8 h-8 text-amber-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-1">Have a breakthrough idea?</h3>
                        <p className="text-sm text-gray-600">Don't let it sit in a notebook. Pitch it here and find a team to make it happen.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-5 space-y-4">
                    <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Trending Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {['AI Safety', 'Climate Tech', 'Quantum Computing', 'Longevity', 'Robotics'].map(tag => (
                            <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-200 cursor-pointer transition-colors">{tag}</span>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
