import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useProject } from '../context/ProjectContext';
import { Calendar, User as UserIcon, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const priorityColors = {
    Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    High: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Critical: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const TaskCard = ({ task, index, onClick }) => {
    const { users } = useProject();
    const assignedUser = users.find(u => u._id === task.assignedTo?._id || u._id === task.assignedTo);

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={onClick}
                    className={`
            group relative bg-[#1A1C29] rounded-xl p-4 mb-3 
            border border-slate-700
            shadow-none
            hover:border-slate-500
            hover:-translate-y-1
            transition-all duration-300 ease-out
            cursor-grab active:cursor-grabbing
            ${snapshot.isDragging ? 'shadow-xl ring-2 ring-indigo-500/50 rotate-2 z-50 bg-[#232536]' : ''}
          `}
                    style={provided.draggableProps.style}
                >
                    {/* Priority Badge */}
                    <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${priorityColors[task.priority] || priorityColors.Medium}`}>
                            {task.priority}
                        </span>
                        {task.priority === 'Critical' && (
                            <AlertCircle size={14} className="text-red-500 animate-pulse" />
                        )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-100 mb-1 leading-snug line-clamp-2">
                        {task.title}
                    </h4>

                    <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                        {task.description || "No description provided."}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium" title={`Created: ${format(new Date(task.createdAt), 'MMM d')}`}>
                            <Calendar size={12} />
                            <span>{format(new Date(task.createdAt), 'MMM d')}</span>
                        </div>

                        <div className="flex items-center gap-1.5" title={assignedUser ? assignedUser.name : 'Unassigned'}>
                            {assignedUser ? (
                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-[#1A1C29]">
                                    {assignedUser.name.charAt(0)}
                                </div>
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 ring-2 ring-[#1A1C29]">
                                    <UserIcon size={12} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
