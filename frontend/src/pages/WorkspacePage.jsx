import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { LayoutDashboard, CheckSquare, Calendar, FileText, MessageSquare, Folder, Users, Activity, Megaphone, CheckCircle2, ChevronRight, MoreVertical, Plus, Hash, FileCode2, Paperclip, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const TABS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'tasks', label: 'Kanban Board', icon: CheckSquare },
    { id: 'timeline', label: 'Timeline & Milestones', icon: Calendar },
    { id: 'notes', label: 'Research Notes', icon: FileText },
    { id: 'files', label: 'Files & Version History', icon: Folder },
    { id: 'chat', label: 'Team Chat', icon: MessageSquare },
    { id: 'progress', label: 'Progress Dashboard', icon: Activity },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'announcements', label: 'Announcements', icon: Megaphone }
];

export function WorkspacePage() {
    const [activeTab, setActiveTab] = useState('tasks');

    const renderKanban = () => (
        <div className="flex gap-6 overflow-x-auto pb-4">
            {/* To Do */}
            <div className="w-80 shrink-0 flex flex-col gap-4">
                <div className="flex justify-between items-center px-1">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">To Do <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">2</span></h3>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Plus className="w-4 h-4"/></Button>
                </div>
                <Card className="cursor-pointer hover:border-primary/40 border-gray-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex gap-2 mb-2">
                            <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Literature Review</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-2">Read ICML 2024 papers on attention mechanisms</h4>
                        <div className="flex justify-between items-center mt-4">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600 font-bold border border-white">S</div>
                            <span className="text-xs text-gray-500 flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5"/> 2</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:border-primary/40 border-gray-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex gap-2 mb-2">
                            <span className="text-[10px] uppercase font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Data Prep</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-2">Clean and tokenize new healthcare dataset</h4>
                        <div className="flex justify-between items-center mt-4">
                            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs text-purple-600 font-bold border border-white">A</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* In Progress */}
            <div className="w-80 shrink-0 flex flex-col gap-4">
                <div className="flex justify-between items-center px-1">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">In Progress <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">1</span></h3>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Plus className="w-4 h-4"/></Button>
                </div>
                <Card className="cursor-pointer border-primary/30 bg-primary/5 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex gap-2 mb-2">
                            <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Modeling</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-2">Train baseline ResNet50 model</h4>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 mt-3">
                            <div className="bg-primary h-1.5 rounded-full" style={{width: '65%'}}></div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600 font-bold border border-white">S</div>
                                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs text-emerald-600 font-bold border border-white">J</div>
                            </div>
                            <span className="text-xs text-gray-500 flex items-center gap-1"><Paperclip className="w-3.5 h-3.5"/> 1</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* In Review */}
            <div className="w-80 shrink-0 flex flex-col gap-4">
                <div className="flex justify-between items-center px-1">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">Supervisor Review <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">1</span></h3>
                </div>
                <Card className="cursor-pointer hover:border-amber-400/40 border-gray-200 shadow-sm border-l-4 border-l-amber-400">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Writing</span>
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Feedback Pending</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-2">Draft Introduction section of paper</h4>
                    </CardContent>
                </Card>
            </div>

            {/* Done */}
            <div className="w-80 shrink-0 flex flex-col gap-4">
                <div className="flex justify-between items-center px-1">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">Done <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">2</span></h3>
                </div>
                <Card className="opacity-75 bg-gray-50 border-gray-200 shadow-sm">
                    <CardContent className="p-4">
                        <h4 className="font-semibold text-gray-600 text-sm line-through">Setup Github Repository</h4>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    const renderChat = () => (
        <Card className="h-[600px] flex flex-col border-border-main shadow-sm">
            <CardHeader className="py-4 border-b border-border-main flex flex-row items-center justify-between bg-gray-50/50 rounded-t-2xl">
                <div className="flex items-center gap-3">
                    <Hash className="w-5 h-5 text-gray-400" />
                    <div>
                        <CardTitle className="text-base font-bold text-gray-900">general</CardTitle>
                        <p className="text-xs text-gray-500">Project-wide announcements and discussion</p>
                    </div>
                </div>
                <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600 font-bold border-2 border-white">S</div>
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-xs text-emerald-600 font-bold border-2 border-white">J</div>
                    <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-xs text-amber-600 font-bold border-2 border-white">M</div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-6 overflow-y-auto space-y-6">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-600 font-bold shrink-0">S</div>
                    <div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-bold text-gray-900 text-sm">Sarah</span>
                            <span className="text-xs text-gray-400">10:42 AM</span>
                        </div>
                        <p className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-2xl rounded-tl-sm w-fit">I've just uploaded the new dataset to the AWS bucket.</p>
                    </div>
                </div>
                <div className="flex gap-4 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-sm text-emerald-600 font-bold shrink-0">J</div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-baseline gap-2 mb-1 flex-row-reverse">
                            <span className="font-bold text-gray-900 text-sm">John (You)</span>
                            <span className="text-xs text-gray-400">10:45 AM</span>
                        </div>
                        <p className="text-sm text-white bg-primary px-4 py-2 rounded-2xl rounded-tr-sm w-fit">Awesome, I'll start the preprocessing script now.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-sm text-amber-600 font-bold shrink-0">M</div>
                    <div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-bold text-gray-900 text-sm">Dr. Curie (Supervisor)</span>
                            <span className="text-xs text-gray-400">11:00 AM</span>
                        </div>
                        <p className="text-sm text-gray-700 bg-amber-50 border border-amber-100 px-4 py-2 rounded-2xl rounded-tl-sm w-fit">Great progress team. Let me know when the baseline results are ready for review.</p>
                    </div>
                </div>
            </CardContent>
            <div className="p-4 border-t border-border-main bg-gray-50/50 rounded-b-2xl">
                <div className="relative">
                    <Input placeholder="Message #general..." className="pr-12 bg-white" />
                    <Button size="sm" className="absolute right-1 top-1 bottom-1 px-3 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">Send</Button>
                </div>
            </div>
        </Card>
    );

    const renderNotes = () => (
        <Card className="h-[600px] border-border-main shadow-sm flex flex-col">
            <CardHeader className="py-4 border-b border-border-main flex flex-row items-center justify-between bg-gray-50/50">
                <CardTitle className="text-base font-bold text-gray-900">Meeting Notes - August 15</CardTitle>
                <Button variant="outline" size="sm">Edit Note</Button>
            </CardHeader>
            <CardContent className="p-8 flex-1 overflow-y-auto bg-white prose prose-sm max-w-none">
                <h1>Architecture Review</h1>
                <p>We discussed transitioning from ResNet to Vision Transformers (ViT) for the main pipeline.</p>
                
                <h3>Key Decisions</h3>
                <ul>
                    <li>Adopt ViT-Base for initial tests.</li>
                    <li>Freeze bottom 6 layers during fine-tuning to prevent catastrophic forgetting.</li>
                    <li>Sarah will write the data loaders by Friday.</li>
                </ul>
                
                <h3>Supervisor Feedback</h3>
                <blockquote className="border-l-4 border-amber-400 bg-amber-50 text-amber-900 p-3 italic">
                    "Ensure you run ablation studies comparing the ViT against the ResNet baseline on the exact same holdout set." - Dr. Curie
                </blockquote>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6 pb-10 flex flex-col h-[calc(100vh-6rem)]">
            
            {/* Workspace Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold shadow-sm">FL</div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Federated Learning for Healthcare</h1>
                    </div>
                    <p className="text-sm text-gray-500 font-medium ml-10">Private Research Workspace • Supervisor: Dr. Marie Curie</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-border-main text-gray-700 shadow-sm"><Users className="w-4 h-4 mr-2"/> Invite</Button>
                    <Button className="shadow-sm">Project Settings</Button>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
                
                {/* Secondary Sidebar (Notion-style navigation) */}
                <Card className="w-full md:w-64 shrink-0 border-border-main shadow-sm bg-gray-50/50 h-full flex flex-col overflow-y-auto">
                    <CardContent className="p-3 space-y-1">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3 pt-2">Workspace</div>
                        {TABS.map(tab => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button 
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isActive ? 'bg-white text-primary font-bold shadow-sm border border-gray-100' : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900 font-medium'}`}
                                >
                                    <tab.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                                    {tab.label}
                                </button>
                            )
                        })}

                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3 pt-6">Recent Files</div>
                        <button className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-200/50 transition-all font-medium">
                            <FileCode2 className="w-4 h-4 text-emerald-500" /> main_model.py
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-200/50 transition-all font-medium">
                            <FileText className="w-4 h-4 text-blue-500" /> draft_v2.pdf
                        </button>
                    </CardContent>
                </Card>
                
                {/* Dynamic Content Area */}
                <div className="flex-1 min-w-0 h-full overflow-y-auto">
                    {activeTab === 'tasks' && renderKanban()}
                    {activeTab === 'chat' && renderChat()}
                    {activeTab === 'notes' && renderNotes()}
                    
                    {/* Placeholder for other tabs */}
                    {!['tasks', 'chat', 'notes'].includes(activeTab) && (
                        <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400">
                            <LayoutDashboard className="w-12 h-12 mb-4 text-gray-300" />
                            <p className="text-lg font-medium">{TABS.find(t => t.id === activeTab)?.label} Module</p>
                            <p className="text-sm">This workspace module is under development.</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
