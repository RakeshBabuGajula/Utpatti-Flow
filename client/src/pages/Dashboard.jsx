import React from 'react';
import { useProject } from '../context/ProjectContext';
import {
    Bell,
    Plus,
    FolderOpen,
    CheckCircle2,
    Clock,
    Activity,
    MoreHorizontal
} from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const { tasks } = useProject();

    // Calculate real stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Done').length;
    const pendingTasks = tasks.filter(t => t.status !== 'Done').length;
    const highPriorityTasks = tasks.filter(t => t.priority === 'High' || t.priority === 'Critical').length;

    // Calculate simple "velocity" (completion rate)
    const velocity = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="flex-1 p-8 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Dashboard
                </h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => toast.info("No new notifications")}
                        className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors relative"
                    >
                        <Bell size={20} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-800"></span>
                    </button>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Tasks */}
                <div className="bg-[#13141F] border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <FolderOpen size={20} />
                        </div>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{totalTasks}</div>
                    <div className="text-sm text-slate-400">Tasks in board</div>
                </div>

                {/* Pending */}
                <div className="bg-[#13141F] border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                            <Clock size={20} />
                        </div>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{pendingTasks}</div>
                    <div className="text-sm text-yellow-500">{highPriorityTasks} High Priority</div>
                </div>

                {/* Completed */}
                <div className="bg-[#13141F] border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <CheckCircle2 size={20} />
                        </div>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Done</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{completedTasks}</div>
                    <div className="text-sm text-emerald-400">Completed tasks</div>
                </div>

                {/* Velocity */}
                <div className="bg-[#13141F] border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <Activity size={20} />
                        </div>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Success Rate</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{velocity}%</div>
                    <div className="text-sm text-purple-400">Completion Rate</div>
                </div>
            </div>

            {/* Recent Activity / Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#13141F] border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-white">Recent Tasks</h3>
                        <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
                    </div>
                    <div className="space-y-4">
                        {tasks.slice(0, 5).map(task => (
                            <div key={task._id} className="flex items-center justify-between p-4 bg-[#0B0C15] rounded-xl border border-slate-800/50 hover:border-slate-700 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${task.status === 'Done' ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-200">{task.title}</h4>
                                        <p className="text-xs text-slate-500">{task.status} • {task.priority}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Assigned User Avatar */}
                                    {task.assignedTo ? (
                                        <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white">
                                            {(typeof task.assignedTo === 'object' ? task.assignedTo.name : 'U').charAt(0)}
                                        </div>
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-dashed border-slate-600"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {tasks.length === 0 && (
                            <div className="text-center py-8 text-slate-500">
                                <p>No tasks found. Create one to get started!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Workflow Status Distribution */}
                <div className="bg-[#13141F] border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-white">Workflow Status</h3>
                        <MoreHorizontal size={20} className="text-slate-500" />
                    </div>

                    <div className="space-y-4">
                        {['Design', 'Development', 'Testing', 'Deployment', 'Done'].map(phase => {
                            const count = tasks.filter(t => t.status === phase).length;
                            const percentage = totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0;

                            let colorClass = 'bg-slate-500';
                            if (phase === 'Design') colorClass = 'bg-purple-500';
                            if (phase === 'Development') colorClass = 'bg-blue-500';
                            if (phase === 'Testing') colorClass = 'bg-yellow-500';
                            if (phase === 'Deployment') colorClass = 'bg-orange-500';
                            if (phase === 'Done') colorClass = 'bg-emerald-500';

                            return (
                                <div key={phase}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-300 font-medium">{phase}</span>
                                        <span className="text-slate-500">{count} tasks ({percentage}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${colorClass}`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}

                        {totalTasks === 0 && (
                            <p className="text-center text-slate-500 text-sm py-4">No data available yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
