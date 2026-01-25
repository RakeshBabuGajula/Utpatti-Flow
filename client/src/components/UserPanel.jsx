import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { User, Shield, ChevronDown } from 'lucide-react';

const UserPanel = () => {
    const { users, currentUser, switchUser, addUser } = useProject();
    const [isOpen, setIsOpen] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');

    const handleAddUser = (e) => {
        e.preventDefault();
        if (newUserName && newUserEmail) {
            addUser({ name: newUserName, email: newUserEmail });
            setNewUserName('');
            setNewUserEmail('');
            setShowAddForm(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 bg-white/60 hover:bg-white p-2 pr-4 rounded-xl border border-white/50 shadow-sm backdrop-blur-md transition-all group"
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                    {currentUser ? currentUser.name.charAt(0).toUpperCase() : <User size={20} />}
                </div>
                <div className="text-left hidden md:block">
                    <p className="text-xs text-slate-500 font-medium">Logged in as</p>
                    <p className="text-sm font-bold text-slate-800 leading-tight">
                        {currentUser ? currentUser.name : 'Guest User'}
                    </p>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Switch User</h4>
                        <div className="space-y-1 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                            {users.map(u => (
                                <button
                                    key={u._id}
                                    onClick={() => { switchUser(u._id); setIsOpen(false); }}
                                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${currentUser?._id === u._id ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-100 text-slate-600'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${currentUser?._id === u._id ? 'bg-blue-200' : 'bg-slate-200'}`}>
                                        {u.name.charAt(0)}
                                    </div>
                                    <span className="text-sm font-medium">{u.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-4">
                        {!showAddForm ? (
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-slate-500 text-sm font-medium hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                            >
                                <User size={16} />
                                Add New User
                            </button>
                        ) : (
                            <form onSubmit={handleAddUser} className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full px-3 py-1.5 text-sm rounded-md border border-slate-200 focus:border-blue-500 outline-none"
                                    value={newUserName}
                                    onChange={e => setNewUserName(e.target.value)}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-3 py-1.5 text-sm rounded-md border border-slate-200 focus:border-blue-500 outline-none"
                                    value={newUserEmail}
                                    onChange={e => setNewUserEmail(e.target.value)}
                                    required
                                />
                                <div className="flex gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="flex-1 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPanel;
