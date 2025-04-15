// components/AuthModal.tsx
'use client';

import { useState } from 'react';
import { FaCode, FaGoogle } from 'react-icons/fa6';
import { FiX, FiUser, FiMail, FiLock, FiGithub, FiTwitter } from 'react-icons/fi';

export default function AuthModal({ show, onClose, type }: { show: boolean; onClose: () => void, type: string }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isLogin ? 'Logging in' : 'Signing up', { email, password, username });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-700 bg-gradient-to-br from-zinc-900 to-zinc-800 bg-opacity-90 shadow-xl p-6 text-white">
        {/* Close Button */}
        {type === "out" && <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-red-400"
        >
          <FiX size={22} />
        </button>}

        {/* Tabs */}
        <div className="flex relative items-center justify-center mb-6 gap-1">
          <FaCode className="absolute left-0 size-8 text-zinc-400/40" />
          <button
            className={`px-4 py-2 rounded-full transition-all duration-200 text-sm font-semibold ${
              isLogin
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-all duration-200 text-sm font-semibold ${
              !isLogin
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-xl font-bold text-center mb-5 tracking-tight">
          {isLogin ? 'Welcome back 👋' : 'Create your account 🚀'}
        </h2>

        {/* Social Login */}
        <div className="flex justify-center gap-4 mb-5">
          <button className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition">
            <FiGithub size={18} />
          </button>
          <button className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition">
            <FaGoogle size={18} />
          </button>
          <button className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition">
            <FiTwitter size={18} />
          </button>
        </div>

        <div className="flex items-center mb-5">
          <div className="flex-1 border-t border-zinc-700"></div>
          <span className="mx-3 text-sm text-zinc-400">or</span>
          <div className="flex-1 border-t border-zinc-700"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="username" className="text-sm text-zinc-400 block mb-1">
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-zinc-500" />
                <input
                  id="username"
                  type="text"
                  className="w-full pl-10 pr-3 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="text-sm text-zinc-400 block mb-1">
              Email
            </label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-3 top-3.5 text-zinc-500" />
              <input
                id="email"
                type="email"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-zinc-400 block mb-1">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-zinc-500" />
              <input
                id="password"
                type="password"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-zinc-400 gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-blue-600"
                />
                Remember me
              </label>
              <a href="#" className="text-blue-400 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:to-blue-600 text-white py-2 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-400">
          {isLogin ? 'New to DSAi?' : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:underline font-medium"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
