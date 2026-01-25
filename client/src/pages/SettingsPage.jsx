import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Save, User, Bell, Lock, Palette, Trash2, Eye, EyeOff, Moon, Sun, Monitor, Shield } from 'lucide-react';
import { toast } from 'react-toastify';

const SettingsPage = () => {
    const { currentUser } = useProject();
    const [activeTab, setActiveTab] = useState('profile');

    // Mock settings state
    const [settings, setSettings] = useState({
        notifications: true,
        emailDigest: false,
        theme: 'dark',
        compactMode: false,
        twoFactor: false
    });

    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleSave = () => {
        toast.success("Settings saved successfully");
    };

    const handleDeleteProject = () => {
        if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
            toast.error("Project deletion simulated (Database protected)");
        }
    };

    return (
        <div className="flex-1 p-8 overflow-y-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-slate-400 mb-8">Manage your account preferences and application settings.</p>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <nav className="space-y-1">
                        {[
                            { id: 'profile', icon: <User size={18} />, label: 'My Profile' },
                            { id: 'notifications', icon: <Bell size={18} />, label: 'Notifications' },
                            { id: 'appearance', icon: <Palette size={18} />, label: 'Appearance' },
                            { id: 'security', icon: <Lock size={18} />, label: 'Security' },
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-[#13141F] text-white shadow-sm border border-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'}`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 max-w-3xl">
                    <div className="bg-[#13141F] border border-slate-800 rounded-2xl p-8">

                        {/* PROFILE TAB */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Profile Details</h2>
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                                        {currentUser?.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors border border-slate-700">
                                            Change Avatar
                                        </button>
                                        <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max size 800K</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={currentUser?.name || ''}
                                            readOnly
                                            className="w-full bg-[#0B0C15] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 outline-none opacity-70 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={currentUser?.email || ''}
                                            readOnly
                                            className="w-full bg-[#0B0C15] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 outline-none opacity-70 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-[#0B0C15] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 outline-none placeholder-slate-600"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                            </div>
                        )}

                        {/* NOTIFICATIONS TAB */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Notification Preferences</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <h3 className="font-medium text-white">Push Notifications</h3>
                                            <p className="text-sm text-slate-400">Receive notifications for task updates</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={settings.notifications} onChange={() => setSettings({ ...settings, notifications: !settings.notifications })} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <h3 className="font-medium text-white">Email Digest</h3>
                                            <p className="text-sm text-slate-400">Receive a weekly summary of your projects</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={settings.emailDigest} onChange={() => setSettings({ ...settings, emailDigest: !settings.emailDigest })} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* APPEARANCE TAB */}
                        {activeTab === 'appearance' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Appearance</h2>

                                <div>
                                    <h3 className="font-medium text-white mb-3">Theme Preference</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <button
                                            onClick={() => setSettings({ ...settings, theme: 'light' })}
                                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${settings.theme === 'light' ? 'border-indigo-500 bg-slate-800' : 'border-slate-700 bg-[#0B0C15] hover:border-slate-600'}`}
                                        >
                                            <Sun size={24} className={settings.theme === 'light' ? 'text-indigo-400' : 'text-slate-400'} />
                                            <span className="text-sm font-medium text-slate-300">Light</span>
                                        </button>
                                        <button
                                            onClick={() => setSettings({ ...settings, theme: 'dark' })}
                                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${settings.theme === 'dark' ? 'border-indigo-500 bg-slate-800' : 'border-slate-700 bg-[#0B0C15] hover:border-slate-600'}`}
                                        >
                                            <Moon size={24} className={settings.theme === 'dark' ? 'text-indigo-400' : 'text-slate-400'} />
                                            <span className="text-sm font-medium text-slate-300">Dark</span>
                                        </button>
                                        <button
                                            onClick={() => setSettings({ ...settings, theme: 'system' })}
                                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${settings.theme === 'system' ? 'border-indigo-500 bg-slate-800' : 'border-slate-700 bg-[#0B0C15] hover:border-slate-600'}`}
                                        >
                                            <Monitor size={24} className={settings.theme === 'system' ? 'text-indigo-400' : 'text-slate-400'} />
                                            <span className="text-sm font-medium text-slate-300">System</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <h3 className="font-medium text-white">Compact Mode</h3>
                                            <p className="text-sm text-slate-400">Reduce whitespace and fit more content</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={settings.compactMode} onChange={() => setSettings({ ...settings, compactMode: !settings.compactMode })} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECURITY TAB */}
                        {activeTab === 'security' && (
                            <div className="space-y-8 animate-in fade-in duration-300">
                                <div>
                                    <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4 mb-6">Security Settings</h2>

                                    <h3 className="font-medium text-white mb-4">Change Password</h3>
                                    <div className="space-y-4 max-w-md">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="w-full bg-[#0B0C15] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 outline-none"
                                                    value={passwords.current}
                                                    onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                                                />
                                                <button
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                                >
                                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="w-full bg-[#0B0C15] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 outline-none"
                                                value={passwords.new}
                                                onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1">Confirm New Password</label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="w-full bg-[#0B0C15] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 outline-none"
                                                value={passwords.confirm}
                                                onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                                            />
                                        </div>
                                        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors border border-slate-700">
                                            Update Password
                                        </button>
                                    </div>
                                </div>

                                <div className="border-t border-slate-800 pt-6">
                                    <h3 className="font-medium text-white mb-4">Two-Factor Authentication</h3>
                                    <div className="flex items-center justify-between p-4 bg-[#0B0C15] rounded-xl border border-slate-800">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-indigo-500/10 rounded-full text-indigo-400">
                                                <Shield size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">Add Extra Security</h4>
                                                <p className="text-sm text-slate-400">Protect your account with 2FA.</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSettings({ ...settings, twoFactor: !settings.twoFactor })}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${settings.twoFactor ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                                        >
                                            {settings.twoFactor ? 'Disable' : 'Enable'}
                                        </button>
                                    </div>
                                </div>


                            </div>
                        )}

                        {/* Save Button (Global) */}
                        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                            >
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
