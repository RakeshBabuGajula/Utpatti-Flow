import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Plus, X, User } from 'lucide-react';

const CreateTaskModal = ({ isOpen, onClose, phases }) => {
    const { addTask, users, currentUser } = useProject();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Design',
        assignedTo: currentUser?._id || ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(formData);
        onClose();
        setFormData({ title: '', description: '', priority: 'Medium', status: 'Design', assignedTo: currentUser?._id || '' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#13141F] rounded-2xl shadow-2xl overflow-hidden border border-slate-800 transform transition-all scale-100">
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-[#0B0C15]/50">
                    <h3 className="text-lg font-semibold text-white">New Task</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-800 transition-colors text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-700 bg-[#0B0C15] text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none placeholder-slate-600"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Implement Auth Flow"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                        <textarea
                            className="w-full px-4 py-2 rounded-lg border border-slate-700 bg-[#0B0C15] text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none resize-none placeholder-slate-600"
                            rows={3}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Task details..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Priority</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-slate-700 bg-[#0B0C15] text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                                value={formData.priority}
                                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Initial Phase</label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-slate-700 bg-[#0B0C15] text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                            >
                                {phases.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Assign User</label>
                        <select
                            className="w-full px-4 py-2 rounded-lg border border-slate-700 bg-[#0B0C15] text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                            value={formData.assignedTo}
                            onChange={e => setFormData({ ...formData, assignedTo: e.target.value })}
                        >
                            <option value="">Unassigned</option>
                            {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                        </select>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-400 font-medium hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 items-center gap-2 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-500/25 transition-all active:scale-95 flex"
                        >
                            <Plus size={18} />
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskModal;
