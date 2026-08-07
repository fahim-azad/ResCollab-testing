import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Compass, ShoppingBag, FlaskConical, LayoutGrid, Users, Bell, MessageSquare, User, Moon, Sun, Menu, X, BookOpen, Database, Code, Lightbulb, Briefcase, Bookmark, Settings, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const sidebarLinks = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { name: 'Unified Search', icon: Search, path: '/search' },
    { name: 'Papers', icon: BookOpen, path: '/papers' },
    { name: 'Datasets', icon: Database, path: '/datasets' },
    { name: 'Source Code', icon: Code, path: '/code' },
    { name: 'Researchers', icon: Users, path: '/researchers' },
    { name: 'Supervisors', icon: User, path: '/supervisors' },
    { name: 'Laboratories', icon: FlaskConical, path: '/labs' },
    { name: 'Research Ideas', icon: Lightbulb, path: '/ideas' },
    { name: 'Open Projects', icon: Briefcase, path: '/projects' },
    { name: 'Workspace', icon: Compass, path: '/workspace' },
    { name: 'Bookmarks', icon: Bookmark, path: '/bookmarks' },
    { name: 'Analytics', icon: BarChart, path: '/analytics' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-background text-text-main overflow-hidden font-sans">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex-shrink-0 bg-white border-r border-border-main flex flex-col h-full z-20 shadow-sm"
          >
            <div className="h-16 flex items-center px-6 border-b border-border-main">
              <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
                  R
                </div>
                ResCollab
              </div>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
              {sidebarLinks.map((link) => {
                const isActive = location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group ${
                      isActive ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <link.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`} />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-border-main flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Quick search..." className="bg-transparent border-none focus:outline-none text-sm w-64 px-2 text-gray-700 placeholder:text-gray-400" />
                <div className="text-xs text-gray-400 border border-gray-300 rounded px-1.5 py-0.5">⌘K</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <Moon className="w-5 h-5" />
            </button>
            <div className="ml-2 w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent border-2 border-white shadow-sm cursor-pointer overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E5E7EB;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
