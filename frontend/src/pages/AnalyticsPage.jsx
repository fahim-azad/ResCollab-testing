import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Activity, Network, TrendingUp, Users, BookOpen } from 'lucide-react';

export function AnalyticsPage() {
  const activityData = [
    { month: 'Jan', commits: 45, papers: 2, meetings: 12 },
    { month: 'Feb', commits: 52, papers: 1, meetings: 15 },
    { month: 'Mar', commits: 38, papers: 3, meetings: 10 },
    { month: 'Apr', commits: 65, papers: 0, meetings: 22 },
    { month: 'May', commits: 48, papers: 4, meetings: 18 },
    { month: 'Jun', commits: 70, papers: 1, meetings: 25 },
  ];

  const skillData = [
    { subject: 'Machine Learning', A: 120, fullMark: 150 },
    { subject: 'Data Engineering', A: 98, fullMark: 150 },
    { subject: 'Bioinformatics', A: 86, fullMark: 150 },
    { subject: 'Quantum Computing', A: 45, fullMark: 150 },
    { subject: 'Cloud Architecture', A: 85, fullMark: 150 },
    { subject: 'NLP', A: 110, fullMark: 150 },
  ];

  const productivityData = [
    { name: 'Week 1', tasks: 12, completed: 10 },
    { name: 'Week 2', tasks: 15, completed: 14 },
    { name: 'Week 3', tasks: 18, completed: 12 },
    { name: 'Week 4', tasks: 22, completed: 20 },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-500 mt-2">Monitor your research output, team productivity, and collaboration networks.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-blue-50/50 border-blue-100">
              <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><BookOpen className="w-5 h-5"/></div>
                      <h3 className="font-semibold text-gray-700">Publications</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">24</p>
                  <p className="text-xs font-medium text-emerald-600 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +3 this year</p>
              </CardContent>
          </Card>
          <Card className="bg-emerald-50/50 border-emerald-100">
              <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Activity className="w-5 h-5"/></div>
                      <h3 className="font-semibold text-gray-700">Citations</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">1,245</p>
                  <p className="text-xs font-medium text-emerald-600 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +15% vs last month</p>
              </CardContent>
          </Card>
          <Card className="bg-purple-50/50 border-purple-100">
              <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Users className="w-5 h-5"/></div>
                      <h3 className="font-semibold text-gray-700">Collaborators</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">32</p>
                  <p className="text-xs font-medium text-purple-600 flex items-center">+5 new members</p>
              </CardContent>
          </Card>
          <Card className="bg-amber-50/50 border-amber-100">
              <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><Network className="w-5 h-5"/></div>
                      <h3 className="font-semibold text-gray-700">Network Reach</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">Global</p>
                  <p className="text-xs font-medium text-amber-600 flex items-center">14 Universities</p>
              </CardContent>
          </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Research Activity Over Time */}
        <Card className="shadow-sm">
            <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg">Research Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Area type="monotone" dataKey="commits" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorCommits)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        {/* Team Productivity */}
        <Card className="shadow-sm">
            <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg">Team Productivity</CardTitle>
            </CardHeader>
            <CardContent className="p-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="tasks" fill="#E5E7EB" radius={[4, 4, 0, 0]} barSize={20} />
                        <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        {/* Skill Distribution */}
        <Card className="shadow-sm">
            <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg">Lab Skill Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                        <PolarGrid stroke="#E5E7EB" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar name="Skills" dataKey="A" stroke="#3B82F6" strokeWidth={2} fill="#3B82F6" fillOpacity={0.3} />
                    </RadarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        {/* Collaboration Network Heatmap Mock */}
        <Card className="shadow-sm">
            <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg">Collaboration Heatmap</CardTitle>
            </CardHeader>
            <CardContent className="p-6 h-80 flex items-center justify-center bg-gray-50 rounded-b-2xl">
                <div className="text-center text-gray-400">
                    <Network className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="font-medium text-gray-500">Interactive Network Visualization</p>
                    <p className="text-sm">Powered by D3.js in production</p>
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
