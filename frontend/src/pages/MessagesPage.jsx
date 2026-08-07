import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Search, Hash, Plus, Settings, Paperclip, Smile, MoreHorizontal, Video, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function MessagesPage() {
  return (
    <div className="h-[calc(100vh-6rem)] -mt-4 pb-4">
      <Card className="h-full border-border-main shadow-sm flex overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-72 bg-gray-50/50 border-r border-border-main flex flex-col shrink-0">
            <div className="p-4 border-b border-border-main">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-gray-900 text-lg">Messages</h2>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Plus className="w-5 h-5"/></Button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search messages..." 
                        className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 focus:outline-none focus:border-primary text-sm shadow-sm"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
                
                {/* Channels */}
                <div className="mb-4">
                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase flex justify-between items-center">
                        Channels
                        <Plus className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600" />
                    </div>
                    <button className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 group transition-colors bg-gray-100">
                        <div className="flex items-center gap-2 text-gray-900 font-medium text-sm">
                            <Hash className="w-4 h-4 text-gray-500" /> team-general
                        </div>
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 group transition-colors">
                        <div className="flex items-center gap-2 text-gray-600 font-medium text-sm group-hover:text-gray-900">
                            <Hash className="w-4 h-4 text-gray-400" /> icml-paper-draft
                        </div>
                        <span className="w-5 h-5 rounded bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">2</span>
                    </button>
                </div>

                {/* Direct Messages */}
                <div>
                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase flex justify-between items-center">
                        Direct Messages
                        <Plus className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600" />
                    </div>
                    <button className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 group transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600 font-bold border border-white">MC</div>
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">Dr. Marie Curie</span>
                        </div>
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 group transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs text-amber-600 font-bold border border-white">AT</div>
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-gray-300 border-2 border-white rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">Alan Turing</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
            
            {/* Header */}
            <div className="h-16 border-b border-border-main px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <Hash className="w-5 h-5 text-gray-400" />
                    <h3 className="font-bold text-gray-900">team-general</h3>
                    <div className="h-4 w-[1px] bg-gray-200 mx-2"></div>
                    <span className="text-sm text-gray-500 font-medium">Lab-wide announcements and discussion</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0"><Phone className="w-4 h-4"/></Button>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0"><Video className="w-5 h-5"/></Button>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0"><Settings className="w-4 h-4"/></Button>
                </div>
            </div>

            {/* Conversation */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                <div className="flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">Today</span>
                </div>

                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-sm text-emerald-600 font-bold shrink-0">AT</div>
                    <div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-bold text-gray-900 text-sm">Alan Turing</span>
                            <span className="text-xs text-gray-400">9:41 AM</span>
                        </div>
                        <p className="text-sm text-gray-700 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-2xl rounded-tl-sm w-fit">Has anyone checked out the new framework released yesterday? It looks like it could replace our custom training loop entirely.</p>
                    </div>
                </div>

                <div className="flex gap-4 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-600 font-bold shrink-0">You</div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-baseline gap-2 mb-1 flex-row-reverse">
                            <span className="font-bold text-gray-900 text-sm">You</span>
                            <span className="text-xs text-gray-400">10:02 AM</span>
                        </div>
                        <p className="text-sm text-white bg-primary px-4 py-2.5 rounded-2xl rounded-tr-sm w-fit">Yes! I ran some quick benchmarks this morning.</p>
                    </div>
                </div>

                <div className="flex gap-4 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-600 font-bold shrink-0 invisible">You</div>
                    <div className="flex flex-col items-end">
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl rounded-tr-sm p-3 w-fit flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center"><Paperclip className="w-5 h-5 text-primary"/></div>
                            <div>
                                <p className="text-sm font-semibold text-primary mb-0.5">benchmark_results.csv</p>
                                <p className="text-xs text-gray-500 font-medium">14.2 KB</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-600 font-bold shrink-0 border border-white">MC</div>
                    <div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-bold text-gray-900 text-sm">Dr. Marie Curie</span>
                            <span className="text-xs text-gray-400">10:15 AM</span>
                        </div>
                        <p className="text-sm text-gray-700 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-2xl rounded-tl-sm w-fit">Excellent work. Let's discuss this during the lab meeting at 2 PM.</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                            <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer">👍 2</span>
                        </div>
                    </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs text-emerald-600 font-bold shrink-0">AT</div>
                    <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                </div>

            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border-main bg-white">
                <div className="border border-border-main rounded-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all bg-gray-50 overflow-hidden flex items-end">
                    <Button variant="ghost" className="h-12 w-12 text-gray-400 hover:text-gray-600 shrink-0"><Plus className="w-5 h-5"/></Button>
                    <textarea 
                        placeholder="Message #team-general..." 
                        className="w-full bg-transparent border-0 focus:ring-0 resize-none py-3.5 text-sm text-gray-900 max-h-32 min-h-[48px]"
                        rows={1}
                    ></textarea>
                    <div className="flex items-center pb-2 pr-2 shrink-0">
                        <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"><Smile className="w-5 h-5"/></Button>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"><Paperclip className="w-5 h-5"/></Button>
                        <Button size="sm" className="ml-2 bg-primary hover:bg-primary-dark">Send</Button>
                    </div>
                </div>
            </div>

        </div>
      </Card>
    </div>
  );
}
