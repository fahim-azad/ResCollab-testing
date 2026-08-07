import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, BookOpen, Database, Code, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
              R
            </div>
            ResCollab
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-primary transition-colors">Explore</a>
            <a href="#community" className="hover:text-primary transition-colors">Community</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
            <Link to="/dashboard">
                <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-primary/5 blur-[120px]"></div>
            <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px]"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-gray-900 mb-8 leading-tight">
              Discover. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Collaborate.</span> <br />
              Innovate.
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Search papers, datasets, code, supervisors, research ideas, and projects from one unified research ecosystem.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-xl shadow-primary/10 border border-gray-100 flex gap-2 items-center"
          >
            <Search className="w-6 h-6 text-gray-400 ml-4" />
            <input 
              type="text" 
              placeholder="Search across 100M+ papers, datasets, and repositories..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-lg px-2 h-14"
            />
            <Link to="/search">
                <Button size="lg" className="h-14 px-8 rounded-xl text-lg gap-2">
                Search <ArrowRight className="w-5 h-5" />
                </Button>
            </Link>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
             className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-gray-500"
          >
             <span>Popular:</span>
             <span className="px-3 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200">LLMs</span>
             <span className="px-3 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200">Quantum Computing</span>
             <span className="px-3 py-1 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200">CRISPR</span>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Papers', value: '1M+', icon: BookOpen },
              { label: 'Datasets', value: '250K+', icon: Database },
              { label: 'Code Repos', value: '500K+', icon: Code },
              { label: 'Researchers', value: '50K+', icon: Users },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© 2026 ResCollab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
