import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Users, Building2, FlaskConical, BookOpen, Briefcase, ShieldAlert, Flag, Activity, Settings, Search, MoreVertical, ShieldCheck, Ban } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
      { id: 'users', label: 'Users', icon: Users },
      { id: 'universities', label: 'Universities', icon: Building2 },
      { id: 'departments', label: 'Departments', icon: BookOpen },
      { id: 'labs', label: 'Labs', icon: FlaskConical },
      { id: 'projects', label: 'Projects', icon: Briefcase },
      { id: 'moderation', label: 'Moderation', icon: ShieldAlert },
      { id: 'reports', label: 'Reports', icon: Flag },
      { id: 'analytics', label: 'Analytics', icon: Activity },
      { id: 'settings', label: 'Platform Settings', icon: Settings }
  ];

  const renderUsersTable = () => (
      <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-border-main shadow-sm">
              <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                      type="text" 
                      placeholder="Search users..." 
                      className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary rounded-lg py-2 pl-9 pr-4 text-sm outline-none transition-all"
                  />
              </div>
              <div className="flex gap-2">
                  <Button variant="outline" size="sm">Export CSV</Button>
                  <Button size="sm">Add User</Button>
              </div>
          </div>

          <Card className="border-border-main shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-gray-500 font-medium border-b border-border-main">
                          <tr>
                              <th className="px-6 py-4">User</th>
                              <th className="px-6 py-4">Role</th>
                              <th className="px-6 py-4">Institution</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-border-main">
                          {[
                              { name: 'Dr. Sarah Connor', email: 's.connor@stanford.edu', role: 'Faculty', inst: 'Stanford', status: 'Active' },
                              { name: 'John Doe', email: 'john@mit.edu', role: 'Student', inst: 'MIT', status: 'Pending' },
                              { name: 'Alice Smith', email: 'alice@berkeley.edu', role: 'Researcher', inst: 'UC Berkeley', status: 'Suspended' },
                          ].map((u, i) => (
                              <tr key={i} className="hover:bg-gray-50/50 transition-colors bg-white">
                                  <td className="px-6 py-4">
                                      <div className="font-semibold text-gray-900">{u.name}</div>
                                      <div className="text-gray-500 text-xs">{u.email}</div>
                                  </td>
                                  <td className="px-6 py-4"><span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-semibold">{u.role}</span></td>
                                  <td className="px-6 py-4 text-gray-600">{u.inst}</td>
                                  <td className="px-6 py-4">
                                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                                          u.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                                          u.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                                          'bg-rose-50 text-rose-600 border border-rose-100'
                                      }`}>
                                          {u.status}
                                      </span>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-900"><MoreVertical className="w-4 h-4"/></Button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </Card>
      </div>
  );

  return (
    <div className="space-y-6 pb-10 flex flex-col h-[calc(100vh-6rem)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
          <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-primary"/> Super Admin Console
              </h1>
              <p className="text-sm text-gray-500 mt-1">Platform management, moderation, and systemic configurations.</p>
          </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
          
          {/* Sidebar */}
          <Card className="w-full md:w-64 shrink-0 border-border-main shadow-sm bg-gray-50/50 h-full flex flex-col overflow-y-auto">
              <CardContent className="p-3 space-y-1">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3 pt-2">Management</div>
                  {tabs.slice(0, 5).map(tab => {
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

                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3 pt-6">System</div>
                  {tabs.slice(5).map(tab => {
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
              </CardContent>
          </Card>
          
          {/* Content Area */}
          <div className="flex-1 min-w-0 h-full overflow-y-auto">
              
              {/* Top Stats for any tab */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                  <Card className="bg-white border-border-main shadow-sm">
                      <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Users className="w-6 h-6"/></div>
                          <div>
                              <p className="text-sm font-medium text-gray-500">Total Users</p>
                              <p className="text-2xl font-bold text-gray-900">14,231</p>
                          </div>
                      </CardContent>
                  </Card>
                  <Card className="bg-white border-border-main shadow-sm">
                      <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Building2 className="w-6 h-6"/></div>
                          <div>
                              <p className="text-sm font-medium text-gray-500">Universities</p>
                              <p className="text-2xl font-bold text-gray-900">412</p>
                          </div>
                      </CardContent>
                  </Card>
                  <Card className="bg-white border-border-main shadow-sm">
                      <CardContent className="p-4 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center"><Flag className="w-6 h-6"/></div>
                          <div>
                              <p className="text-sm font-medium text-gray-500">Pending Reports</p>
                              <p className="text-2xl font-bold text-gray-900">18</p>
                          </div>
                      </CardContent>
                  </Card>
              </div>

              {activeTab === 'users' && renderUsersTable()}

              {/* Placeholder for other tabs */}
              {activeTab !== 'users' && (
                  <div className="h-96 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400">
                      {tabs.find(t => t.id === activeTab)?.icon({ className: "w-12 h-12 mb-4 text-gray-300" })}
                      <p className="text-lg font-medium">{tabs.find(t => t.id === activeTab)?.label} Management</p>
                      <p className="text-sm">Admin module under development.</p>
                  </div>
              )}
          </div>
      </div>

    </div>
  );
}
