import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { User, Mail, Shield, Plus, Search, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const TeamPage = () => {
    const { users, addUser, deleteMember, changeMemberRole, currentUser } = useProject();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Developer' });

    // ... (rest of filtering and handleAddUser is same) 

    // BUT I cannot replace partial blocks easily if I change imports too. 
    // Wait, I am replacing from line 3. 
    // Let me target the imports first, then the card content.


    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (newUser.name && newUser.email) {
            await addUser(newUser);
            setIsAddModalOpen(false);
            setNewUser({ name: '', email: '', role: 'Developer' });
        }
    };

    return (
        <div className="flex-1 p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Team Members</h1>
                    <p className="text-slate-400">Manage your project team and permissions.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
                >
                    <Plus size={18} />
                    Add Member
                </button>
            </div>

            {/* Search and Filter */}
            <div className="mb-6 relative max-w-md">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                    type="text"
                    placeholder="Search members..."
                    className="w-full bg-[#13141F] border border-slate-800 text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                    <div key={user._id} className="bg-[#13141F] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group relative overflow-hidden">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <select
                                    className="bg-slate-800 rounded text-xs text-slate-300 border border-slate-700 px-2 py-1 outline-none focus:border-indigo-500"
                                    value={user.role || 'Member'}
                                    onChange={(e) => changeMemberRole(user._id, e.target.value)}
                                >
                                    <option value="Developer">Developer</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Designer">Designer</option>
                                    <option value="Viewer">Viewer</option>
                                </select>

                                {currentUser?._id !== user._id && (
                                    <button
                                        onClick={() => {
                                            if (window.confirm(`Remove ${user.name} from team?`)) deleteMember(user._id);
                                        }}
                                        className="text-slate-600 hover:text-red-400 transition-colors p-1"
                                        title="Remove Member"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{user.name}</h3>
                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                            <Mail size={14} />
                            {user.email}
                        </div>

                        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                            <span>Joined {user.createdAt ? format(new Date(user.createdAt), 'MMM d, yyyy') : 'Recently'}</span>
                            {currentUser?._id === user._id && (
                                <span className="text-indigo-400 font-medium bg-indigo-400/10 px-2 py-0.5 rounded">You</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add User Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-[#13141F] rounded-2xl border border-slate-800 shadow-2xl p-6 animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold text-white mb-4">Add New Member</h3>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[#0B0C15] border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
                                    value={newUser.name}
                                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-[#0B0C15] border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
                                    value={newUser.email}
                                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Role</label>
                                <select
                                    className="w-full bg-[#0B0C15] border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
                                    value={newUser.role}
                                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="Developer">Developer</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Designer">Designer</option>
                                    <option value="Viewer">Viewer</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 text-slate-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
                                >
                                    Add Member
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamPage;
