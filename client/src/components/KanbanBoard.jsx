import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useProject } from '../context/ProjectContext';
import TaskCard from './TaskCard';
import TaskHistoryModal from './TaskHistoryModal';
import CreateTaskModal from './CreateTaskModal';
import { Plus } from 'lucide-react';

const phases = ['Design', 'Development', 'Testing', 'Deployment', 'Done'];

const KanbanBoard = () => {
    const { tasks, updateTaskPhase } = useProject();
    const [selectedTask, setSelectedTask] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Group tasks by status
    const columns = phases.reduce((acc, phase) => {
        acc[phase] = tasks.filter(t => t.status === phase);
        return acc;
    }, {});

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const newPhase = destination.droppableId;
        updateTaskPhase(draggableId, newPhase);
    };

    return (
        <>
            <div className="h-full flex flex-col">
                {/* Board Header / Controls */}
                <div className="flex-none px-6 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Product Board
                    </h2>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <Plus size={18} />
                        New Task
                    </button>
                </div>

                {/* Board Area */}
                <div className="flex-1 overflow-x-auto overflow-y-hidden px-4 pb-4">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="flex h-full gap-4 min-w-max">
                            {phases.map(phase => (
                                <div key={phase} className="w-80 flex-shrink-0 flex flex-col h-full rounded-2xl bg-[#13141F] border border-slate-800">
                                    {/* Column Header */}
                                    <div className="p-4 flex items-center justify-between border-b border-slate-800 sticky top-0 bg-[#13141F] z-10 rounded-t-2xl">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-slate-200 text-sm tracking-tight">{phase}</h3>
                                            <span className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700">
                                                {columns[phase]?.length || 0}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Droppable Area */}
                                    <Droppable droppableId={phase}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={`
                          flex-1 p-3 overflow-y-auto custom-scrollbar transition-colors rounded-b-2xl
                          ${snapshot.isDraggingOver ? 'bg-slate-800/20' : ''}
                        `}
                                            >
                                                {columns[phase]?.map((task, index) => (
                                                    <TaskCard
                                                        key={task._id}
                                                        task={task}
                                                        index={index}
                                                        onClick={() => setSelectedTask(task)}
                                                    />
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            ))}
                        </div>
                    </DragDropContext>
                </div>
            </div>

            <CreateTaskModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                phases={phases}
            />

            {selectedTask && (
                <TaskHistoryModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}
        </>
    );
};

export default KanbanBoard;
