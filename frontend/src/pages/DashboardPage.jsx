import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BookOpen, Briefcase, Bookmark, Clock, Activity, TrendingUp, Search, Plus, Upload, PlayCircle, Calendar as CalendarIcon, Bell, CheckCircle2, UserPlus, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

export function DashboardPage() {
  const stats = [
    { title: 'Saved Papers', value: '124', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Active Projects', value: '3', icon: Briefcase, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Bookmarks', value: '45', icon: Bookmark, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Workspace Hours', value: '32h', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Welcome Card & Quick Actions */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1 bg-gradient-to-r from-primary to-accent border-none text-white overflow-hidden relative">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
            
            <CardContent className="p-8 relative z-10 flex flex-col justify-center h-full">
                <h1 className="text-3xl font-bold mb-2">Welcome back, Dr. Sarah 👋</h1>
                <p className="text-primary-100 opacity-90 mb-6 max-w-lg">Your research ecosystem is looking great today. You have 3 tasks due this week and 2 new supervisor recommendations.</p>
                
                <div className="relative max-w-lg">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Global search papers, code, labs..." 
                        className="w-full bg-white rounded-xl py-3 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-400 shadow-sm"
                    />
                </div>
            </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 shrink-0 lg:w-64">
            <Button variant="outline" className="flex-1 justify-start h-14 bg-white border-border-main text-gray-700 hover:border-primary hover:text-primary whitespace-nowrap">
                <Plus className="w-5 h-5 mr-3 text-primary" /> Create Project
            </Button>
            <Button variant="outline" className="flex-1 justify-start h-14 bg-white border-border-main text-gray-700 hover:border-primary hover:text-primary whitespace-nowrap">
                <Upload className="w-5 h-5 mr-3 text-secondary" /> Upload Dataset
            </Button>
            <Button variant="outline" className="flex-1 justify-start h-14 bg-white border-border-main text-gray-700 hover:border-primary hover:text-primary whitespace-nowrap">
                <PlayCircle className="w-5 h-5 mr-3 text-accent" /> Start Workspace
            </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="hover:border-primary/30 transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Three Column Layout for Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
            
            {/* Research Progress Chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-primary"/> Research Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64 w-full bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                        [Chart Placeholder - Recharts AreaChart]
                    </div>
                </CardContent>
            </Card>

            {/* Recommended Papers & Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="pb-3 border-b border-border-main">
                        <CardTitle className="text-base flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-500"/> Recommended Papers</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {[1, 2].map((i) => (
                            <div key={i} className="p-4 border-b border-border-main last:border-0 hover:bg-gray-50 cursor-pointer">
                                <h4 className="font-semibold text-sm text-gray-900 mb-1 leading-snug">Attention Is All You Need {i}</h4>
                                <p className="text-xs text-gray-500 mb-2">Google Brain • 2017</p>
                                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Deep Learning</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3 border-b border-border-main">
                        <CardTitle className="text-base flex items-center gap-2"><Briefcase className="w-4 h-4 text-emerald-500"/> Recommended Projects</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {[1, 2].map((i) => (
                            <div key={i} className="p-4 border-b border-border-main last:border-0 hover:bg-gray-50 cursor-pointer">
                                <h4 className="font-semibold text-sm text-gray-900 mb-1 leading-snug">Federated Learning in Edge IoT</h4>
                                <p className="text-xs text-gray-500 mb-2">Looking for: Python, PyTorch</p>
                                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">Open Project</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            
            {/* Recommended Supervisors */}
            <Card>
                <CardHeader className="pb-3 border-b border-border-main">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-base flex items-center gap-2"><UserPlus className="w-4 h-4 text-purple-500"/> Recommended Supervisors</CardTitle>
                        <span className="text-xs text-primary font-medium cursor-pointer">View All</span>
                    </div>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { name: "Prof. Alan Turing", uni: "Cambridge", match: "98%" },
                        { name: "Dr. Geoffrey Hinton", uni: "Toronto", match: "94%" }
                    ].map((prof, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-border-main">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-400 to-primary text-white flex items-center justify-center font-bold">
                                {prof.name.charAt(6)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-gray-900 truncate">{prof.name}</h4>
                                <p className="text-xs text-gray-500">{prof.uni}</p>
                            </div>
                            <div className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">{prof.match}</div>
                        </div>
                    ))}
                </CardContent>
            </Card>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
            
            {/* Upcoming Tasks & Calendar */}
            <Card>
                <CardHeader className="pb-3 border-b border-border-main">
                    <CardTitle className="text-base flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-accent"/> Schedule & Tasks</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="p-4 bg-accent/5 border-b border-border-main">
                        {/* Mini Calendar Mock */}
                        <div className="flex justify-between text-xs text-gray-500 font-medium mb-2">
                            <span>M</span><span>T</span><span className="text-primary font-bold">W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>12</span><span>13</span><span className="bg-primary text-white w-6 h-6 flex items-center justify-center rounded-full">14</span><span>15</span><span>16</span><span>17</span><span>18</span>
                        </div>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="flex gap-3 items-start">
                            <CheckCircle2 className="w-5 h-5 text-gray-300 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 leading-none mb-1">Submit ICML Draft</p>
                                <p className="text-xs text-gray-500">Today, 5:00 PM</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start">
                            <CheckCircle2 className="w-5 h-5 text-gray-300 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 leading-none mb-1">Lab Meeting</p>
                                <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
                <CardHeader className="pb-3 border-b border-border-main">
                    <CardTitle className="text-base flex items-center gap-2"><Clock className="w-4 h-4 text-gray-500"/> Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                    <div className="flex gap-3">
                        <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500"></div>
                        <div>
                            <p className="text-sm text-gray-800">You bookmarked <span className="font-semibold text-primary">"YOLOv9 Architecture"</span></p>
                            <p className="text-xs text-gray-400">2 hours ago</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500"></div>
                        <div>
                            <p className="text-sm text-gray-800">Joined open project <span className="font-semibold">"Bio-informatics Pipeline"</span></p>
                            <p className="text-xs text-gray-400">Yesterday</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
                <CardHeader className="pb-3 border-b border-border-main">
                    <CardTitle className="text-base flex items-center gap-2"><TrendingUp className="w-4 h-4 text-rose-500"/> Trending Topics</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                    {['Large Language Models', 'Quantum Cryptography', 'CRISPR Cas9'].map((topic, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-colors">
                            <span className="text-sm font-medium text-gray-700">{topic}</span>
                            <span className="text-xs text-rose-500 bg-rose-50 px-2 py-1 rounded-md">+{Math.floor(Math.random() * 50) + 10}%</span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Notifications Panel Mock */}
            <Card>
                <CardHeader className="pb-3 border-b border-border-main">
                    <CardTitle className="text-base flex items-center gap-2"><Bell className="w-4 h-4 text-amber-500"/> Notifications</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-border-main">
                        <p className="text-sm text-gray-800"><span className="font-semibold">Prof. Smith</span> accepted your supervision request.</p>
                        <p className="text-xs text-primary font-medium mt-1">View Details</p>
                    </div>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}
