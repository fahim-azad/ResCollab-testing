import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BookOpen, Download, ExternalLink, Bookmark, Share2, Quote } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function PapersPage() {
  const papers = [
    { title: "Advances in Deep Learning Architectures for Genomic Sequencing", authors: "J. Doe, A. Smith", publisher: "Nature", year: 2026, citations: 94, tags: ["Genomics", "AI"] },
    { title: "Quantum Error Correction in Superconducting Qubits", authors: "M. Curie, N. Bohr", publisher: "IEEE", year: 2025, citations: 215, tags: ["Quantum", "Physics"] },
    { title: "Federated Learning for Edge Healthcare Devices", authors: "T. Edison, H. Ford", publisher: "ACM", year: 2026, citations: 45, tags: ["Machine Learning", "IoT"] },
    { title: "Neuromorphic Hardware and Spiking Neural Networks", authors: "A. Turing, C. Babbage", publisher: "arXiv", year: 2024, citations: 320, tags: ["Hardware", "SNN"] }
  ];

  return (
    <div className="space-y-10 pb-10">
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Papers Directory</h1>
            <p className="text-gray-500 mt-2">Explore over 1M+ research publications across all domains.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Papers List */}
        <div className="xl:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary"/> Featured Publications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {papers.map((paper, i) => (
                <Card key={i} className="hover:border-primary/50 transition-all group flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg">{paper.publisher}</span>
                            <div className="flex gap-2">
                                <span className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{paper.year}</span>
                                <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100"><Quote className="w-3 h-3 inline mr-1"/> {paper.citations}</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors cursor-pointer">
                            {paper.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 font-medium">By {paper.authors}</p>
                        
                        <div className="flex gap-2 mb-6 mt-auto">
                            {paper.tags.map(t => <span key={t} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-lg font-medium">{t}</span>)}
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="text-gray-500 p-2"><Bookmark className="w-4 h-4"/></Button>
                                <Button variant="ghost" size="sm" className="text-gray-500 p-2"><Share2 className="w-4 h-4"/></Button>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-9"><Download className="w-4 h-4 mr-1.5"/> PDF</Button>
                                <Button size="sm" className="h-9"><ExternalLink className="w-4 h-4 mr-1.5"/> DOI</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>

        {/* Recommendations Sidebar */}
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-0">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-5 border-b border-primary/10 last:border-0 hover:bg-white/60 cursor-pointer transition-colors">
                            <h4 className="font-semibold text-sm text-gray-900 mb-2 leading-snug hover:text-primary">Attention Is All You Need: A Retrospective Analysis</h4>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>Google Brain • 2026</span>
                                <span className="font-medium text-emerald-600">98% Match</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Button variant="outline" className="w-full text-primary border-primary/20 hover:bg-primary/5">View More Recommendations</Button>
        </div>

      </div>
    </div>
  );
}
