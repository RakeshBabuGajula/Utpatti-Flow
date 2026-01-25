import React, { useEffect, useState } from 'react';
import * as api from '../api/api';
import { X, Clock, ArrowRight, User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';

const TaskHistoryModal = ({ task, onClose }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (task) {
            loadHistory();
        }
    }, [task]);

    const loadHistory = async () => {
        try {
            setLoading(true);
            const data = await api.getTaskHistory(task._id);
            setHistory(data);
        } catch (error) {
            console.error("Failed to load history", error);
        } finally {
            setLoading(false);
        }
    };

    if (!task) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl bg-[#13141F] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border border-slate-800">

                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-[#0B0C15]/50">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">{task.title}</h2>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-medium text-xs border border-slate-700">{task.status}</span>
                            <span>&bull;</span>
                            <span>Created {format(new Date(task.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-[#13141F]">
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Description</h3>
                        <p className="text-slate-400 bg-[#0B0C15] p-4 rounded-xl border border-slate-800 text-sm leading-relaxed">
                            {task.description || "No description provided."}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Clock size={16} />
                            Activity Timeline
                        </h3>

                        {loading ? (
                            <div className="flex justify-center py-8">
                                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="relative pl-4 space-y-6 before:absolute before:left-[27px] before:top-2 before:bottom-4 before:w-0.5 before:bg-slate-800">
                                {history.map((record, idx) => (
                                    <div key={record._id} className="relative flex gap-4 group">
                                        <div className="relative z-10 w-6 h-6 rounded-full bg-[#1A1C29] border-2 border-indigo-500 flex-shrink-0 mt-0.5 shadow-sm group-hover:scale-110 transition-transform"></div>
                                        <div className="flex-1 bg-[#1A1C29] p-3 rounded-lg border border-slate-800 shadow-sm hover:border-slate-700 transition-all">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">
                                                {format(new Date(record.createdAt), 'MMM d, h:mm a')}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-200 font-medium">
                                                <span className="px-2 py-0.5 bg-slate-800 rounded text-slate-400 border border-slate-700">{record.fromPhase}</span>
                                                <ArrowRight size={14} className="text-slate-600" />
                                                <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded shadow-sm">{record.toPhase}</span>
                                            </div>
                                            {record.changedBy && (
                                                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                                    <UserIcon size={12} />
                                                    <span>Updated by <span className="text-slate-300 font-medium">{record.changedBy.name}</span></span>
                                                </div>
                                            )}
                                            <p className="text-xs text-slate-400 mt-1 italic">
                                                {record.comment}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {history.length === 0 && (
                                    <p className="text-sm text-slate-500 italic pl-8">No history recorded yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskHistoryModal;
