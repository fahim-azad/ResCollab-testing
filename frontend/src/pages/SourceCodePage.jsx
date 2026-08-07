import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Code, ExternalLink, Star, GitFork, Scale, GitBranch, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function SourceCodePage() {
  const repos = [
    { title: "facebookresearch/segment-anything", description: "The repository provides code for running inference with the SegmentAnything Model (SAM).", lang: "Python", stars: "45.2k", forks: "4.8k", license: "Apache-2.0", platform: "GitHub" },
    { title: "microsoft/DeepSpeed", description: "DeepSpeed is a deep learning optimization library that makes distributed training and inference easy.", lang: "Python", stars: "33.1k", forks: "3.5k", license: "MIT", platform: "GitHub" },
    { title: "huggingface/transformers", description: "State-of-the-art Machine Learning for Pytorch, TensorFlow, and JAX.", lang: "Python", stars: "120k", forks: "24k", license: "Apache-2.0", platform: "GitHub" },
    { title: "hwchase17/langchain", description: "Building applications with LLMs through composability", lang: "Jupyter Notebook", stars: "78k", forks: "11k", license: "MIT", platform: "GitHub" }
  ];

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Source Code Directory</h1>
            <p className="text-gray-500 mt-2">Explore 500K+ open-source repositories powering modern research.</p>
        </div>
        <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search repositories..." 
                className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-9 pr-4 focus:outline-none focus:border-emerald-500 text-sm shadow-sm"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Repo List */}
        <div className="xl:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {repos.map((repo, i) => (
                <Card key={i} className="hover:border-emerald-500/50 transition-all group flex flex-col h-full">
                    <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <GitBranch className="w-5 h-5 text-gray-700" />
                                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-lg border border-gray-200">{repo.platform}</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100 flex items-center gap-1"><Star className="w-3 h-3"/> {repo.stars}</span>
                                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md border border-gray-200 flex items-center gap-1"><GitFork className="w-3 h-3"/> {repo.forks}</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-emerald-600 transition-colors cursor-pointer break-all">
                            {repo.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-6 font-medium line-clamp-2">
                            {repo.description}
                        </p>
                        
                        <div className="flex justify-between items-center mt-auto mb-6 text-xs font-medium text-gray-600">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div> {repo.lang}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Scale className="w-4 h-4 text-gray-400"/> {repo.license}
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-100">
                            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white shadow-sm"><ExternalLink className="w-4 h-4 mr-1.5"/> Open Repository</Button>
                        </div>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>

        {/* Trending Repos Sidebar */}
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
            <Card className="bg-emerald-50/50 border-emerald-100">
                <CardContent className="p-0">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-5 border-b border-emerald-100/50 last:border-0 hover:bg-white cursor-pointer transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <GitBranch className="w-4 h-4 text-gray-700" />
                                <h4 className="font-semibold text-sm text-gray-900 hover:text-emerald-600 truncate">karpathy/minGPT</h4>
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Python</span>
                                <span className="font-medium text-amber-600 flex items-center"><Star className="w-3 h-3 mr-1"/> +340 today</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Button variant="outline" className="w-full text-emerald-600 border-emerald-200 hover:bg-emerald-50">View All Trending</Button>
        </div>

      </div>
    </div>
  );
}
