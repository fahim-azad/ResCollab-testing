import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Database, Download, ExternalLink, HardDrive, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function DatasetsPage() {
  const datasets = [
    { title: "Global Weather Patterns 2020-2025", author: "Climatology Lab", size: "2.4 TB", downloads: "12,400", tags: ["Climate", "Time Series"], format: "CSV, JSON" },
    { title: "Celeb-DF: A Large-scale Challenging Dataset for DeepFake Forensics", author: "Yuezun Li, Xin Yang", size: "15.2 GB", downloads: "45,000", tags: ["DeepFake", "Computer Vision"], format: "MP4" },
    { title: "COVID-19 Open Research Dataset (CORD-19)", author: "Allen Institute", size: "110 GB", downloads: "210,000", tags: ["Healthcare", "NLP"], format: "JSON" },
    { title: "ImageNet Large Scale Visual Recognition Challenge", author: "Stanford Vision Lab", size: "1.2 TB", downloads: "1M+", tags: ["Images", "AI"], format: "JPEG" }
  ];

  return (
    <div className="space-y-10 pb-10">
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Datasets Directory</h1>
            <p className="text-gray-500 mt-2">Discover over 250K+ open-source datasets for your research.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Datasets List */}
        <div className="xl:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {datasets.map((dataset, i) => (
                <Card key={i} className="hover:border-primary/50 transition-all group flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 mb-2 border border-purple-100">
                                <Database className="w-6 h-6" />
                            </div>
                            <div className="flex gap-2 text-xs font-medium">
                                <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg border border-gray-200">{dataset.format}</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors cursor-pointer">
                            {dataset.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 font-medium">Maintained by {dataset.author}</p>
                        
                        <div className="flex gap-4 mb-6">
                            <div className="flex items-center text-xs text-gray-600 font-medium">
                                <HardDrive className="w-3.5 h-3.5 mr-1.5 text-gray-400"/> {dataset.size}
                            </div>
                            <div className="flex items-center text-xs text-emerald-600 font-medium">
                                <Download className="w-3.5 h-3.5 mr-1.5"/> {dataset.downloads} Downloads
                            </div>
                        </div>

                        <div className="flex gap-2 mb-6 mt-auto">
                            {dataset.tags.map(t => <span key={t} className="text-xs bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-1 rounded-lg font-medium">{t}</span>)}
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <Button variant="outline" size="sm" className="text-gray-600"><Eye className="w-4 h-4 mr-1.5"/> Preview Data</Button>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white"><ExternalLink className="w-4 h-4 mr-1.5"/> Open Dataset</Button>
                        </div>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>

        {/* Trending Datasets Sidebar */}
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Trending Datasets</h2>
            <Card className="bg-purple-50/50 border-purple-100">
                <CardContent className="p-0">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-5 border-b border-purple-100/50 last:border-0 hover:bg-white cursor-pointer transition-colors">
                            <h4 className="font-semibold text-sm text-gray-900 mb-2 leading-snug hover:text-purple-600">Synthetically Generated Deepfake Images (1M)</h4>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>15 GB • Image</span>
                                <span className="font-medium text-purple-600 flex items-center"><Download className="w-3 h-3 mr-1"/> 1.2k today</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Button variant="outline" className="w-full text-purple-600 border-purple-200 hover:bg-purple-50">View All Trending</Button>
        </div>

      </div>
    </div>
  );
}
