import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { MapPin, Users, Briefcase, Mail, Building2, FlaskConical, Search, Target, Server } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function LabsPage() {
  const labs = [
    { 
      name: "Stanford AI Lab (SAIL)", 
      uni: "Stanford University", 
      areas: ["Computer Vision", "NLP", "Robotics"], 
      members: 145, 
      projects: 34, 
      facilities: ["HPC Cluster", "Robotics Arena"],
      img: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "MIT Media Lab", 
      uni: "Massachusetts Institute of Technology", 
      areas: ["HCI", "Synthetic Neurobiology", "Tangible Media"], 
      members: 210, 
      projects: 56, 
      facilities: ["Fabrication Lab", "Bio-safety Level 2"],
      img: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Berkeley Artificial Intelligence Research (BAIR)", 
      uni: "UC Berkeley", 
      areas: ["Deep Learning", "Reinforcement Learning"], 
      members: 120, 
      projects: 28, 
      facilities: ["TPU Pods", "Autonomous Driving Track"],
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Research Laboratories</h1>
            <p className="text-gray-500 mt-2">Explore world-class research facilities and their ongoing initiatives.</p>
        </div>
        <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search labs by name or area..." 
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 focus:outline-none focus:border-primary text-sm shadow-sm"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {labs.map((lab, i) => (
            <Card key={i} className="hover:border-primary/50 transition-all overflow-hidden flex flex-col group">
                <div className="h-48 relative overflow-hidden">
                    <img src={lab.img} alt={lab.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-2xl font-bold text-white mb-1">{lab.name}</h3>
                        <p className="text-gray-200 text-sm font-medium flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {lab.uni}</p>
                    </div>
                </div>

                <CardContent className="p-0 flex-1 flex flex-col">
                    <div className="p-6 flex-1 space-y-6">
                        
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-primary"/> Research Areas</h4>
                            <div className="flex flex-wrap gap-2">
                                {lab.areas.map(area => <span key={area} className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-lg">{area}</span>)}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2"><Server className="w-4 h-4 text-amber-500"/> Core Facilities</h4>
                            <div className="flex flex-wrap gap-2">
                                {lab.facilities.map(fac => <span key={fac} className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200">{fac}</span>)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 font-medium mb-1">Active Projects</span>
                                <span className="text-lg font-bold text-gray-900 flex items-center gap-2"><Briefcase className="w-4 h-4 text-emerald-500"/> {lab.projects}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 font-medium mb-1">Lab Members</span>
                                <span className="text-lg font-bold text-gray-900 flex items-center gap-2"><Users className="w-4 h-4 text-blue-500"/> {lab.members}</span>
                            </div>
                        </div>

                    </div>
                    
                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                        <Button className="flex-1 text-sm bg-gray-900 hover:bg-gray-800 text-white"><FlaskConical className="w-4 h-4 mr-2"/> View Lab Profile</Button>
                        <Button variant="outline" className="px-4"><Mail className="w-4 h-4"/></Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

    </div>
  );
}
