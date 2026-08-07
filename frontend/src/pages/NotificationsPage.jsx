import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Bell, UserPlus, CheckCircle2, MessageSquare, AtSign, Filter, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Mentions', 'Invites', 'Applications', 'Approvals', 'Messages'];

  const notifications = [
    { 
      type: "Mentions", 
      icon: AtSign, 
      color: "text-blue-500", 
      bg: "bg-blue-50",
      content: <><span className="font-bold text-gray-900">Dr. Sarah Connor</span> mentioned you in a comment on <span className="font-semibold text-primary cursor-pointer">Attention Mechanisms in Protein Folding</span>.</>,
      time: "10 mins ago",
      unread: true
    },
    { 
      type: "Invites", 
      icon: UserPlus, 
      color: "text-purple-500", 
      bg: "bg-purple-50",
      content: <><span className="font-bold text-gray-900">Prof. Alan Turing</span> invited you to join the private workspace <span className="font-semibold text-primary cursor-pointer">Quantum Error Correction</span>.</>,
      time: "2 hours ago",
      unread: true,
      action: <div className="flex gap-2 mt-3"><Button size="sm" className="h-8">Accept Invite</Button><Button variant="outline" size="sm" className="h-8">Decline</Button></div>
    },
    { 
      type: "Applications", 
      icon: FileText, 
      color: "text-emerald-500", 
      bg: "bg-emerald-50",
      content: <><span className="font-bold text-gray-900">John Doe</span> submitted an application to join your open project <span className="font-semibold text-primary cursor-pointer">Federated Learning API</span>.</>,
      time: "5 hours ago",
      unread: false,
      action: <Button variant="outline" size="sm" className="mt-3 h-8 text-emerald-600 border-emerald-200">Review Application</Button>
    },
    { 
      type: "Approvals", 
      icon: CheckCircle2, 
      color: "text-amber-500", 
      bg: "bg-amber-50",
      content: <>Your supervision request to <span className="font-bold text-gray-900">Dr. Marie Curie</span> has been <span className="font-bold text-emerald-600">Approved</span>.</>,
      time: "1 day ago",
      unread: false
    },
    { 
      type: "Messages", 
      icon: MessageSquare, 
      color: "text-rose-500", 
      bg: "bg-rose-50",
      content: <>You have <span className="font-bold text-gray-900">3 new messages</span> in the Team Chat for <span className="font-semibold text-primary cursor-pointer">BioInformatics Lab Workspace</span>.</>,
      time: "2 days ago",
      unread: false
    }
  ];

  return (
    <div className="space-y-8 pb-10 max-w-4xl mx-auto">
      
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Notification Center</h1>
            <p className="text-gray-500 mt-2">Stay updated on your mentions, project invites, and lab activity.</p>
        </div>
        <Button variant="outline" className="text-gray-600 h-10"><CheckCircle2 className="w-4 h-4 mr-2"/> Mark all as read</Button>
      </div>

      <Card className="shadow-sm border-border-main overflow-hidden">
        {/* Filters */}
        <div className="bg-gray-50/50 border-b border-border-main p-4 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
                {filters.map(f => (
                    <button 
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeFilter === f ? 'bg-primary text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary/50'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>
        </div>

        {/* Notifications List */}
        <CardContent className="p-0">
            {notifications
                .filter(n => activeFilter === 'All' || n.type === activeFilter)
                .map((n, i) => (
                <div key={i} className={`p-6 border-b border-border-main last:border-0 hover:bg-gray-50/50 transition-colors flex gap-4 ${n.unread ? 'bg-primary/[0.02]' : ''}`}>
                    <div className={`w-12 h-12 rounded-full ${n.bg} ${n.color} flex items-center justify-center shrink-0`}>
                        <n.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start gap-4">
                            <p className="text-gray-700 text-sm leading-relaxed">{n.content}</p>
                            <span className="text-xs font-medium text-gray-400 shrink-0">{n.time}</span>
                        </div>
                        {n.action && (
                            <div>{n.action}</div>
                        )}
                    </div>
                    {n.unread && <div className="w-2.5 h-2.5 rounded-full bg-primary mt-2 shrink-0"></div>}
                </div>
            ))}
            
            {notifications.filter(n => activeFilter === 'All' || n.type === activeFilter).length === 0 && (
                <div className="p-16 flex flex-col items-center justify-center text-gray-400">
                    <Bell className="w-12 h-12 mb-4 text-gray-300" />
                    <p className="text-lg font-medium text-gray-600">No new notifications</p>
                    <p className="text-sm">You're all caught up on your {activeFilter.toLowerCase()}.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
