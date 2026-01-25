import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Plus, Search, Trash2, Calendar, User as UserIcon, AlertCircle, Filter } from 'lucide-react';
import { format } from 'date-fns';
import CreateTaskModal from '../components/CreateTaskModal';

const phases = ['Design', 'Development', 'Testing', 'Deployment', 'Done'];

const priorityColors = {
    Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    High: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Critical: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const statusColors = {
    'Design': 'text-purple-400',
    'Development': 'text-blue-400',
    'Testing': 'text-yellow-400',
    'Deployment': 'text-orange-400',
    'Done': 'text-emerald-400',
};

const ProjectsPage = () => {
    const { tasks, deleteTask, users } = useProject();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const handleDelete = async (e, taskId) => {
        e.stopPropagation(); // Prevent opening detail modal if we implemented one
        if (window.confirm("Are you sure you want to delete this task?")) {
            await deleteTask(taskId);
        }
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex-1 p-8 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Projects & Tasks</h1>
                    <p className="text-slate-400">Manage and track all project tasks in one place.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-2"
                >
                    <Plus size={18} />
                    New Task
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full bg-[#13141F] border border-slate-800 text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-600"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                    <Filter size={18} className="text-slate-500 mr-2" />
                    <button
                        onClick={() => setFilterStatus('All')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterStatus === 'All' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'bg-[#13141F] text-slate-400 border border-slate-800 hover:border-slate-700'}`}
                    >
                        All
                    </button>
                    {phases.map(phase => (
                        <button
                            key={phase}
                            onClick={() => setFilterStatus(phase)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterStatus === phase ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'bg-[#13141F] text-slate-400 border border-slate-800 hover:border-slate-700'}`}
                        >
                            {phase}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => {
                        const assignedUser = users.find(u => u._id === task.assignedTo?._id || u._id === task.assignedTo);

                        return (
                            <div key={task._id} className="bg-[#13141F] border border-slate-800 rounded-2xl p-5 hover:border-slate-600 transition-all group flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${priorityColors[task.priority] || priorityColors.Medium}`}>
                                        {task.priority}
                                    </span>
                                    <button
                                        onClick={(e) => handleDelete(e, task._id)}
                                        className="text-slate-600 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-slate-800"
                                        title="Delete Task"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{task.title}</h3>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                                    {task.description || "No description provided."}
                                </p>

                                <div className="pt-4 border-t border-slate-800 mt-auto flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                                        <span className={`font-medium ${statusColors[task.status] || 'text-slate-400'}`}>
                                            {task.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* Date */}
                                        <div className="flex items-center gap-1.5 text-slate-500 text-xs" title={`Created: ${format(new Date(task.createdAt), 'MMM d')}`}>
                                            <Calendar size={12} />
                                            <span>{format(new Date(task.createdAt), 'MMM d')}</span>
                                        </div>

                                        {/* User Avatar */}
                                        <div className="flex items-center gap-1.5" title={assignedUser ? assignedUser.name : 'Unassigned'}>
                                            {assignedUser ? (
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-[#13141F]">
                                                    {assignedUser.name.charAt(0)}
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 ring-2 ring-[#13141F]">
                                                    <UserIcon size={12} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-800 rounded-2xl bg-[#13141F]/50">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                            <Search size={24} />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-1">No tasks found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">
                            {searchTerm || filterStatus !== 'All'
                                ? "Try adjusting your search or filters to find what you're looking for."
                                : "Get started by creating a new task for your project."}
                        </p>
                        {!searchTerm && filterStatus === 'All' && (
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
                            >
                                Create First Task
                            </button>
                        )}
                    </div>
                )}
            </div>

            <CreateTaskModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                phases={phases}
            />
        </div>
    );
};

export default ProjectsPage;
