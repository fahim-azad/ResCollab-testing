import os

base_path = r"d:\3-2 class stuff\software lab\project\ResCollab testing\frontend\src"

pages_path = os.path.join(base_path, "pages")
os.makedirs(pages_path, exist_ok=True)

pages = {
    "DashboardPage.jsx": """import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BookOpen, Briefcase, Bookmark, Clock, Activity, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export function DashboardPage() {
  const stats = [
    { title: 'Saved Papers', value: '124', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Active Projects', value: '3', icon: Briefcase, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Bookmarks', value: '45', icon: Bookmark, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Workspace Hours', value: '32h', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back, Dr. Sarah 👋</h1>
        <p className="text-gray-500 mt-1">Here is what's happening in your research ecosystem today.</p>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-primary"/> Research Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-64 w-full bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                    [Chart Placeholder - Recharts LineChart]
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary"/> Trending Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {['Large Language Models', 'Quantum Cryptography', 'CRISPR Cas9', 'Neuromorphic Computing'].map((topic, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-colors">
                        <span className="text-sm font-medium text-gray-700">{topic}</span>
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-md">+{Math.floor(Math.random() * 50) + 10}%</span>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
""",
    "PapersPage.jsx": """import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { BookOpen, Download, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function PapersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Papers Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="hover:border-primary/50">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg">Nature</span>
                    <span className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-md">2026</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug hover:text-primary cursor-pointer">
                    Advances in Deep Learning Architectures for Genomic Sequencing
                </h3>
                <p className="text-sm text-gray-500 mb-4">By J. Doe, A. Smith</p>
                <div className="flex gap-2 mb-6">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">Genomics</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">AI</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-medium">94 Citations</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1"/> PDF</Button>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary"><ExternalLink className="w-4 h-4 mr-1"/> DOI</Button>
                    </div>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
""",
    "AuthPages.jsx": """import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-gray-200">
        <CardContent className="p-8">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl mx-auto flex items-center justify-center text-white font-bold text-2xl mb-4">R</div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                <p className="text-gray-500 text-sm mt-2">Sign in to your ResCollab account</p>
            </div>
            <form className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Email address</label>
                    <Input type="email" placeholder="name@university.edu" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5 flex justify-between">
                        Password
                        <a href="#" className="text-primary hover:underline">Forgot?</a>
                    </label>
                    <Input type="password" placeholder="••••••••" />
                </div>
                <Link to="/dashboard">
                    <Button className="w-full mt-6 h-12 text-md">Sign In</Button>
                </Link>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">
                Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-gray-200">
        <CardContent className="p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
                <p className="text-gray-500 text-sm mt-2">Join the unified research ecosystem</p>
            </div>
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">First Name</label>
                        <Input type="text" placeholder="Sarah" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">Last Name</label>
                        <Input type="text" placeholder="Connor" />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">University Email</label>
                    <Input type="email" placeholder="name@university.edu" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Role</label>
                    <select className="flex h-10 w-full rounded-xl border border-border-main bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Researcher</option>
                        <option>Student</option>
                        <option>Faculty / Supervisor</option>
                        <option>Lab Admin</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
                    <Input type="password" placeholder="••••••••" />
                </div>
                <Link to="/dashboard">
                    <Button className="w-full mt-6 h-12 text-md">Create Account</Button>
                </Link>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">
                Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
""",
    "WorkspacePage.jsx": """import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { MessageSquare, Layout, Clock, CheckCircle, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function WorkspacePage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Private Workspace</h1>
            <p className="text-gray-500 mt-1">Project: Real-time Deepfake Detection</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><MessageSquare className="w-4 h-4 mr-2"/> Team Chat</Button>
            <Button><Layout className="w-4 h-4 mr-2"/> Board View</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* Kanban Columns */}
        {['To Do', 'In Progress', 'Review'].map((col, idx) => (
            <div key={col} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col gap-4">
                <div className="flex justify-between items-center px-2">
                    <h3 className="font-semibold text-gray-700">{col}</h3>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{3 - idx}</span>
                </div>
                <Card className="hover:border-primary/50 cursor-grab active:cursor-grabbing">
                    <CardContent className="p-4 space-y-3">
                        <div className="flex gap-2">
                            <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-md">Research</span>
                        </div>
                        <h4 className="font-medium text-gray-900 leading-snug">Literature review on GAN architectures</h4>
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-primary border-2 border-white"></div>
                                <div className="w-6 h-6 rounded-full bg-accent border-2 border-white"></div>
                            </div>
                            <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3"/> 2d left</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        ))}
      </div>
    </div>
  );
}
"""
}

for filepath, content in pages.items():
    with open(os.path.join(pages_path, filepath), "w", encoding="utf-8") as f:
        f.write(content)

app_js_content = """import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { DashboardPage } from './pages/DashboardPage';
import { PapersPage } from './pages/PapersPage';
import { WorkspacePage } from './pages/WorkspacePage';
import SearchDashboard from './features/search/SearchDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Core App with Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/search" element={<SearchDashboard />} />
          <Route path="/papers" element={<PapersPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          
          {/* Catch-all for mockup routes */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center py-32">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">🚧</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Module under construction</h2>
                <p className="text-gray-500">This premium feature is being designed for production.</p>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
"""

with open(os.path.join(base_path, "App.jsx"), "w", encoding="utf-8") as f:
    f.write(app_js_content)

print("Generated all pages and updated App.jsx successfully.")
