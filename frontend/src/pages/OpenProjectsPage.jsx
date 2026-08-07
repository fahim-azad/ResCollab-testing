import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Briefcase, Calendar, Users, Target, ShieldCheck, CheckCircle2, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function OpenProjectsPage() {
  const projects = [
    { 
      title: "Federated Learning for Edge Healthcare Devices", 
      topic: "Machine Learning / IoT",
      skills: ["Python", "PyTorch", "C++"],
      members: "3/5",
      supervisor: "Dr. Marie Curie",
      timeline: "6 Months",
      type: "Remote"
    },
    { 
      title: "Quantum Error Correction Algorithms", 
      topic: "Quantum Computing",
      skills: ["Qiskit", "Linear Algebra", "Python"],
      members: "1/4",
      supervisor: "Prof. Alan Turing",
      timeline: "12 Months",
      type: "Hybrid"
    },
    { 
      title: "Neuro-symbolic AI for Legal Text Analysis", 
      topic: "NLP / Law",
      skills: ["Transformers", "Prolog", "PyTorch"],
      members: "4/5",
      supervisor: "Dr. Fei-Fei Li",
      timeline: "8 Months",
      type: "On-site"
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Open Projects Marketplace</h1>
            <p className="text-gray-500 mt-2">Find active research projects looking for your specific skills.</p>
        </div>
        <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search projects or skills..." 
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 focus:outline-none focus:border-primary text-sm shadow-sm"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((proj, i) => (
            <Card key={i} className="hover:border-primary/50 transition-all flex flex-col h-full">
                <CardContent className="p-0 flex-1 flex flex-col">
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">{proj.topic}</span>
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{proj.type}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug cursor-pointer hover:text-primary transition-colors">
                            {proj.title}
                        </h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Target className="w-4 h-4 text-gray-400 shrink-0"/> <span className="font-medium text-gray-900">Required Skills:</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 pl-6">
                                {proj.skills.map(s => <span key={s} className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">{s}</span>)}
                            </div>
                        </div>

                        <div className="space-y-2 mt-auto text-sm text-gray-600 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500"/> Supervisor</span>
                                <span className="font-medium text-gray-900">{proj.supervisor}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary"/> Timeline</span>
                                <span className="font-medium text-gray-900">{proj.timeline}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-purple-500"/> Members</span>
                                <span className="font-medium text-gray-900">{proj.members}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                        <Button className="w-full text-md h-10"><CheckCircle2 className="w-4 h-4 mr-2"/> Apply to Join Project</Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

    </div>
  );
}
