import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { MapPin, BookOpen, UserPlus, Filter, Search, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function SupervisorDirectoryPage() {
  const supervisors = [
    { name: "Prof. Alan Turing", uni: "Cambridge University", area: "Artificial Intelligence", pubs: 142, match: "98%", available: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alan&backgroundColor=e2e8f0" },
    { name: "Dr. Marie Curie", uni: "Sorbonne University", area: "Quantum Physics", pubs: 89, match: "92%", available: false, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie&backgroundColor=e2e8f0" },
    { name: "Prof. Geoffrey Hinton", uni: "University of Toronto", area: "Deep Learning", pubs: 310, match: "85%", available: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Geoff&backgroundColor=e2e8f0" },
    { name: "Dr. Fei-Fei Li", uni: "Stanford University", area: "Computer Vision", pubs: 215, match: "88%", available: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=FeiFei&backgroundColor=e2e8f0" },
    { name: "Prof. Yoshua Bengio", uni: "University of Montreal", area: "Neural Networks", pubs: 275, match: "76%", available: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yoshua&backgroundColor=e2e8f0" },
    { name: "Dr. Yann LeCun", uni: "New York University", area: "Machine Learning", pubs: 290, match: "70%", available: false, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yann&backgroundColor=e2e8f0" },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Supervisor Directory</h1>
            <p className="text-gray-500 mt-2">Find and connect with world-class faculty for your research journey.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search by name or university..." 
                    className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 focus:outline-none focus:border-primary text-sm shadow-sm"
                />
            </div>
            <Button variant="outline" className="shrink-0"><Filter className="w-4 h-4 mr-2"/> Filters</Button>
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {supervisors.map((prof, i) => (
            <Card key={i} className="hover:border-primary/50 transition-all group overflow-hidden">
                <CardContent className="p-0">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-4 items-center">
                                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden shrink-0">
                                    <img src={prof.img} alt={prof.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-0.5 leading-tight group-hover:text-primary transition-colors cursor-pointer">
                                        {prof.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                        <ShieldCheck className="w-3.5 h-3.5 text-blue-500"/> Verified Faculty
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-gray-400 shrink-0"/> <span>{prof.uni}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-4 h-4 rounded bg-primary/10 flex items-center justify-center shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                </div>
                                <span className="font-medium text-gray-900">{prof.area}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                            <div>
                                <p className="text-xs text-gray-500 font-medium mb-1">Publications</p>
                                <p className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
                                    <BookOpen className="w-4 h-4 text-gray-400"/> {prof.pubs}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium mb-1">Match Rate</p>
                                <p className="text-lg font-bold text-emerald-600">
                                    {prof.match}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Action Footer */}
                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                        <Button className="flex-1" disabled={!prof.available}>
                            <UserPlus className="w-4 h-4 mr-2"/> {prof.available ? "Request Supervision" : "Unavailable"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

    </div>
  );
}
