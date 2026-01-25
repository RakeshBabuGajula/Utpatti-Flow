import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Layout, Github, Chrome } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { toast } from 'react-toastify';
import ShaderBackground from '../components/ui/shader-background';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, addUser } = useProject();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '', // Acts as name in register
        email: '',    // Required for register
        password: ''  // Ignored in current backend but good for UI
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isLogin) {
                // Login Flow
                const success = await login(formData.username, formData.password);
                if (success) {
                    toast.success("Welcome back!");
                    navigate('/dashboard');
                } else {
                    toast.error("Invalid credentials. Try generic 'Demo User' if DB is fresh.");
                }
            } else {
                // Register Flow
                if (!formData.email) {
                    toast.error("Email is required for registration");
                    return;
                }
                // Call addUser from context (which calls api.registerUser)
                // Note: addUser in context is void and toasts internally. 
                // We might want to verify success, but for now we assume it works if no error thrown?
                // Actually addUser relies on toast. 
                // Let's call api directly or rely on side effect?
                // Context addUser calls api.registerUser and updates state.

                // We'll trust the context to update state.
                await addUser({ name: formData.username, email: formData.email });

                // After add, try to login automatically?
                const success = await login(formData.username, formData.password);
                if (success) {
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            toast.error(isLogin ? "Login failed" : "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-white flex items-center justify-center p-4 relative overflow-hidden">
            <ShaderBackground />

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-800"
            >
                <ArrowLeft size={16} />
                <span className="text-sm font-medium">Back</span>
            </button>

            {/* Decorative Background */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />

            <div className="w-full max-w-md bg-[#13141F] border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20 mb-4">
                        <Layout size={24} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-slate-400 text-sm">
                        {isLogin ? 'Enter your credentials to access your workspace.' : 'Join your team and start managing projects.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Username / Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-[#0B0C15] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-[#0B0C15] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                                placeholder="john@example.com"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-[#0B0C15] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm tracking-widest"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/25 transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                        {isLoading ? (isLogin ? 'Signing In...' : 'Registering...') : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                        </button>
                    </div>
                </form>

                <div className="my-6 flex items-center gap-4">
                    <div className="h-px bg-slate-800 flex-1" />
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Or continue with</span>
                    <div className="h-px bg-slate-800 flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1A1C29] hover:bg-[#222436] border border-slate-700 rounded-lg transition-colors group">
                        <Github size={18} className="text-slate-300 group-hover:text-white" />
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white">Github</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1A1C29] hover:bg-[#222436] border border-slate-700 rounded-lg transition-colors group">
                        <Chrome size={18} className="text-slate-300 group-hover:text-white" />
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white">Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
