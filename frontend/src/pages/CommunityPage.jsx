import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { MessageSquare, Heart, Share2, TrendingUp, Users, Search, PlusCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function CommunityPage() {
  const posts = [
    { 
      author: "Dr. Sarah Connor", 
      role: "AI Researcher @ Stanford",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=e2e8f0",
      content: "Just published our new paper on Transformer optimizations! We found a way to reduce memory overhead by 30% without sacrificing attention quality. Check out the link below. #MachineLearning #AI",
      likes: 124, 
      comments: 32,
      time: "2 hours ago"
    },
    { 
      author: "Alan Turing", 
      role: "PhD Candidate @ Cambridge",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alan&backgroundColor=e2e8f0",
      content: "Does anyone have experience dealing with CUDA memory fragmentation in PyTorch 2.0? I keep running into out-of-memory errors during the validation loop. 📉",
      likes: 45, 
      comments: 18,
      time: "5 hours ago"
    },
    { 
      author: "BioInformatics Lab", 
      role: "Research Group @ MIT",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Lab&backgroundColor=e2e8f0",
      content: "We are officially open-sourcing our genomic sequencing dataset (3.5TB). It's available now in the Datasets directory. Feel free to use it for your downstream tasks! 🧬",
      likes: 512, 
      comments: 89,
      time: "1 day ago"
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Community</h1>
            <p className="text-gray-500 mt-2">Connect with researchers, ask questions, and share your latest findings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Create Post */}
            <Card className="shadow-sm border-gray-200">
                <CardContent className="p-4 flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 shrink-0 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You&backgroundColor=e2e8f0" alt="You" />
                    </div>
                    <div className="flex-1">
                        <textarea 
                            placeholder="Share a research update, ask a question, or discuss a paper..." 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none h-24 mb-3"
                        ></textarea>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                            <div className="flex gap-2 text-gray-400">
                                <Button variant="ghost" size="sm" className="h-8"><PlusCircle className="w-4 h-4 mr-2"/> Image</Button>
                                <Button variant="ghost" size="sm" className="h-8"><PlusCircle className="w-4 h-4 mr-2"/> Paper Link</Button>
                            </div>
                            <Button size="sm">Post Update</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Posts */}
            {posts.map((post, i) => (
                <Card key={i} className="shadow-sm border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-3 items-center">
                                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                                    <img src={post.avatar} alt={post.author} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 hover:text-primary cursor-pointer leading-tight">{post.author}</h4>
                                    <p className="text-xs text-gray-500 font-medium">{post.role}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                                {post.time}
                                <Button variant="outline" size="sm" className="h-7 px-3 text-primary border-primary/20 hover:bg-primary/5">Follow</Button>
                            </div>
                        </div>
                        
                        <p className="text-sm text-gray-800 leading-relaxed mb-6">{post.content}</p>
                        
                        <div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-sm font-medium text-gray-500">
                            <button className="flex items-center gap-2 hover:text-rose-500 transition-colors"><Heart className="w-4 h-4"/> {post.likes}</button>
                            <button className="flex items-center gap-2 hover:text-primary transition-colors"><MessageSquare className="w-4 h-4"/> {post.comments} Comments</button>
                            <button className="flex items-center gap-2 hover:text-gray-900 transition-colors"><Share2 className="w-4 h-4"/> Share</button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
            
            {/* Trending Topics */}
            <Card className="shadow-sm">
                <CardContent className="p-5 space-y-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2"><TrendingUp className="w-4 h-4 text-rose-500"/> Trending Topics</h3>
                    <div className="space-y-3">
                        {['#ICML2026', '#LLM_Security', '#AlphaFold3', '#QuantumSupremacy'].map((tag, i) => (
                            <div key={i} className="flex justify-between items-center cursor-pointer group">
                                <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">{tag}</span>
                                <span className="text-xs text-gray-400">{Math.floor(Math.random() * 500) + 100} posts</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Suggested Communities */}
            <Card className="shadow-sm">
                <CardContent className="p-5 space-y-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2"><Users className="w-4 h-4 text-primary"/> Suggested Communities</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Machine Learning Researchers", members: "12k" },
                            { name: "BioInformatics Hub", members: "5.4k" },
                            { name: "PhD Support Group", members: "24k" }
                        ].map((comm, i) => (
                            <div key={i} className="flex gap-3 items-center">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500 shrink-0">C</div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate hover:text-primary cursor-pointer">{comm.name}</h4>
                                    <p className="text-xs text-gray-500">{comm.members} Members</p>
                                </div>
                                <Button variant="ghost" size="sm" className="px-2 h-7"><PlusCircle className="w-4 h-4"/></Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}
