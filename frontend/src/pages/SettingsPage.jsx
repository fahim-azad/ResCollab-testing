import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { User, Shield, Palette, Bell, Lock, Link as LinkIcon, Camera, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'security', label: 'Security', icon: Shield },
      { id: 'appearance', label: 'Appearance', icon: Palette },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'privacy', label: 'Privacy', icon: Lock },
      { id: 'connected', label: 'Connected Accounts', icon: LinkIcon }
  ];

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">Manage your account preferences and profile details.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
            {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                    >
                        <tab.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                        {tab.label}
                    </button>
                )
            })}
        </div>

        {/* Content Area */}
        <div className="flex-1">
            
            {activeTab === 'profile' && (
                <div className="space-y-6">
                    <Card className="border-border-main shadow-sm">
                        <CardHeader className="border-b border-gray-100">
                            <CardTitle className="text-lg">Public Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=e2e8f0" alt="Avatar" />
                                    </div>
                                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-primary shadow-sm transition-colors">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Profile Photo</h3>
                                    <p className="text-sm text-gray-500 mb-3">JPG, GIF or PNG. Max size of 5MB.</p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Upload New</Button>
                                        <Button variant="ghost" size="sm" className="text-rose-500">Remove</Button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">First Name</label>
                                    <Input defaultValue="John" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Last Name</label>
                                    <Input defaultValue="Doe" />
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-semibold text-gray-700">Bio</label>
                                    <textarea 
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-sm shadow-sm h-24 resize-none"
                                        defaultValue="AI Researcher focused on federated learning and secure ML models."
                                    ></textarea>
                                </div>
                            </div>

                        </CardContent>
                    </Card>

                    <Card className="border-border-main shadow-sm">
                        <CardHeader className="border-b border-gray-100">
                            <CardTitle className="text-lg">Academic Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">University / Institution</label>
                                <Input defaultValue="Stanford University" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700">Role</label>
                                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-sm shadow-sm">
                                    <option>Student</option>
                                    <option>Researcher</option>
                                    <option>Faculty</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <div className="flex justify-end">
                        <Button><Save className="w-4 h-4 mr-2"/> Save Changes</Button>
                    </div>
                </div>
            )}

            {activeTab === 'appearance' && (
                <Card className="border-border-main shadow-sm">
                    <CardHeader className="border-b border-gray-100">
                        <CardTitle className="text-lg">Appearance</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Theme Preference</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="border-2 border-primary rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer bg-primary/5">
                                    <div className="w-full h-20 bg-white border border-gray-200 rounded-md shadow-sm"></div>
                                    <span className="text-sm font-bold text-gray-900">Light Mode</span>
                                </div>
                                <div className="border-2 border-transparent hover:border-gray-200 rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer">
                                    <div className="w-full h-20 bg-gray-900 border border-gray-700 rounded-md shadow-sm"></div>
                                    <span className="text-sm font-medium text-gray-600">Dark Mode</span>
                                </div>
                                <div className="border-2 border-transparent hover:border-gray-200 rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer">
                                    <div className="w-full h-20 bg-gradient-to-r from-white to-gray-900 border border-gray-200 rounded-md shadow-sm"></div>
                                    <span className="text-sm font-medium text-gray-600">System Sync</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
            
            {/* Placeholder for other tabs */}
            {!['profile', 'appearance'].includes(activeTab) && (
                <Card className="border-border-main shadow-sm">
                    <CardContent className="p-16 flex flex-col items-center justify-center text-center text-gray-400">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            {tabs.find(t => t.id === activeTab)?.icon({ className: "w-8 h-8 text-gray-300" })}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{tabs.find(t => t.id === activeTab)?.label}</h3>
                        <p className="text-sm">These settings are under development.</p>
                    </CardContent>
                </Card>
            )}

        </div>
      </div>
    </div>
  );
}
