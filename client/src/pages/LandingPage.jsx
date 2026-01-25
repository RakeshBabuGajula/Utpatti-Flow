import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import ShaderBackground from '../components/ui/shader-background';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen text-white overflow-hidden relative selection:bg-purple-500/30">
            <ShaderBackground />

            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />

            {/* Navbar */}
            <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                        <Layout size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Utpatti Flow</span>
                </div>
                <div className="flex items-center gap-4">

                    <button
                        onClick={() => navigate('/login')}
                        className="px-5 py-2 text-sm font-medium bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all"
                    >
                        Log In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center flex flex-col items-center justify-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    <span className="text-xs font-medium text-purple-200 uppercase tracking-wider">Next Gen Project Management</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
                >
                    Master Your <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                        SDLC Workflow
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed"
                >
                    Streamline your software development lifecycle with Utpatti Flow.
                    Manage requirements, track progress, and deliver excellence with our premium utility suite.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <button
                        onClick={() => navigate('/login')}
                        className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group"
                    >
                        Get Started
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>


                </motion.div>

                {/* Floating UI Elements (Decorative) */}
                <div className="absolute top-1/2 -left-12 w-64 h-64 bg-slate-900/50 rounded-2xl border border-slate-800 -z-10 rotate-[-12deg] blur-[2px] opacity-60 hidden lg:block" />
                <div className="absolute top-1/2 -right-12 w-64 h-64 bg-slate-900/50 rounded-2xl border border-slate-800 -z-10 rotate-[12deg] blur-[2px] opacity-60 hidden lg:block" />

            </main>

            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#0B0C15] to-transparent pointer-events-none" />
        </div>
    );
};

export default LandingPage;
