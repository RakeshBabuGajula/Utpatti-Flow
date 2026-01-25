import React, { createContext, useState, useEffect, useContext } from 'react';
import * as api from '../api/api';
import { toast } from 'react-toastify';

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null); // Simulate a logged-in user

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [fetchedTasks, fetchedUsers] = await Promise.all([
                api.getTasks(),
                api.getUsers()
            ]);
            setTasks(fetchedTasks);
            setUsers(fetchedUsers);

            // Auto-login first user or create a guest if empty
            if (fetchedUsers.length > 0) {
                setCurrentUser(fetchedUsers[0]);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
            toast.error("Failed to load project data");
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (taskData) => {
        try {
            const newTask = await api.createTask({ ...taskData, assignedTo: currentUser?._id });
            setTasks([newTask, ...tasks]); // Add to top
            toast.success("Task created");
        } catch (error) {
            toast.error("Failed to create task");
        }
    };

    const updateTaskPhase = async (taskId, newPhase) => {
        // Optimistic update
        const previousTasks = [...tasks];
        const taskIndex = tasks.findIndex(t => t._id === taskId);
        if (taskIndex === -1) return;

        const updatedTask = { ...tasks[taskIndex], status: newPhase };
        const newTasks = [...tasks];
        newTasks[taskIndex] = updatedTask;
        setTasks(newTasks);

        try {
            await api.moveTask(taskId, newPhase, currentUser?._id);
            // Ideally we'd replace with the server response to ensure consistency, 
            // but for drag-drop fluidity, we trust our optimistic update unless error.
        } catch (error) {
            setTasks(previousTasks); // Revert
            toast.error("Failed to move task");
        }
    };

    const deleteTask = async (taskId) => {
        const previousTasks = [...tasks];
        setTasks(tasks.filter(t => t._id !== taskId)); // Optimistic delete

        try {
            await api.deleteTask(taskId);
            toast.success("Task deleted");
        } catch (error) {
            setTasks(previousTasks); // Revert
            toast.error("Failed to delete task");
        }
    };


    const addUser = async (userData) => {
        try {
            const newUser = await api.registerUser(userData);
            setUsers([...users, newUser]);
            if (!currentUser) setCurrentUser(newUser); // Set as current if it's the first one
            toast.success("User added");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add user");
        }
    };

    const deleteMember = async (userId) => {
        const previousUsers = [...users];
        setUsers(users.filter(u => u._id !== userId)); // Optimistic delete
        try {
            await api.deleteUser(userId);
            toast.success("Member removed");
        } catch (error) {
            setUsers(previousUsers);
            toast.error("Failed to remove member");
        }
    };

    const changeMemberRole = async (userId, newRole) => {
        const previousUsers = [...users];
        setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u)); // Optimistic update
        try {
            await api.updateUserRole(userId, newRole);
            toast.success("Role updated");
        } catch (error) {
            setUsers(previousUsers);
            toast.error("Failed to update role");
        }
    };

    const switchUser = (userId) => {
        const user = users.find(u => u._id === userId);
        if (user) setCurrentUser(user);
    };

    return (
        <ProjectContext.Provider value={{
            tasks,
            users,
            loading,
            currentUser,
            addTask,
            updateTaskPhase,
            deleteTask,
            addUser,
            deleteMember,
            changeMemberRole,
            switchUser,
            refreshTasks: fetchInitialData,
            login: async (username, password) => {
                const user = users.find(u => u.name === username || u.email === username);
                if (user) {
                    setCurrentUser(user);
                    return true;
                }
                return false;
            }
        }}>
            {children}
        </ProjectContext.Provider>
    );
};
