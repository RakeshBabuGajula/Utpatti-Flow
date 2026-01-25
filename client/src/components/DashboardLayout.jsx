import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Layout, FolderOpen, KanbanSquare, Users, Settings, LogOut } from 'lucide-react';
import AnoAI from './ui/animated-shader-background';

const DashboardLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear auth stuff if needed
        navigate('/login');
    };

    return (
        <div className="flex h-screen text-slate-300 font-sans overflow-hidden relative">
            <AnoAI />

            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 bg-[#0B0C15]/90 backdrop-blur-sm flex flex-col justify-between py-6 px-4 z-10">
                <div>
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-2 mb-10">
                        <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                            <Layout size={18} strokeWidth={2.5} />
                        </div>
                        <span className="text-lg font-bold text-white tracking-tight">Utpatti Flow</span>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1">
                        <NavItem to="/dashboard" icon={<Layout size={20} />} label="Overview" end />
                        <NavItem to="/dashboard/projects" icon={<FolderOpen size={20} />} label="Projects" />
                        <NavItem to="/dashboard/kanban" icon={<KanbanSquare size={20} />} label="Kanban Board" />
                        <NavItem to="/dashboard/team" icon={<Users size={20} />} label="Team" />
                        <NavItem to="/dashboard/settings" icon={<Settings size={20} />} label="Settings" />
                    </nav>
                </div>

                {/* User Profile / Logout */}
                <div>
                    <div className="flex items-center gap-3 px-3 py-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium">
                            R
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <h4 className="text-sm font-medium text-white truncate">RakeshGajula</h4>
                            <p className="text-xs text-slate-500 truncate">User</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden z-10">
                <Outlet />
            </main>


        </div>
    );
};

const NavItem = ({ to, icon, label, end }) => {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${isActive
                    ? 'text-white bg-slate-800/50 shadow-sm border border-slate-700/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                }`
            }
        >
            {icon}
            {label}
        </NavLink>
    );
};

export default DashboardLayout;
