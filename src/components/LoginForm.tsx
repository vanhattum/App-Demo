'use client'

import { useAuth } from '@/contexts/AuthContext'
import { LogIn, Sparkles, Shield, Zap, Users } from 'lucide-react'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function LoginForm() {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, loading } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emailLoading, setEmailLoading] = useState(false)

  const isSupabaseConfigured = 
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project-id.supabase.co'

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Real-time Collaboration",
      description: "See changes instantly across all devices"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure & Private",
      description: "Your data is protected with row-level security"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Team Ready",
      description: "Built for teams and individual productivity"
    }
  ]

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setEmailLoading(true)

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password)
        setEmail('')
        setPassword('')
      } else {
        await signInWithEmail(email, password)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-white/10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg float">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 dark:from-slate-100 to-slate-600 dark:to-slate-400 bg-clip-text text-transparent mb-2">
              Kanban Pro
            </h1>
            <p className="text-slate-600 dark:text-slate-300 font-medium">
              Beautiful project management made simple
            </p>
          </div>

          {/* Configuration Warning */}
          {!isSupabaseConfigured && (
            <div className="bg-gradient-to-r from-amber-50 dark:from-amber-900/30 to-orange-50 dark:to-orange-900/30 border border-amber-200 dark:border-amber-700/50 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5">⚠️</div>
                <div>
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
                    Setup Required
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-200 mb-2">
                    Configure your Supabase credentials to get started
                  </p>
                  <div className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-2">
                    <code className="text-xs text-amber-800 dark:text-amber-200 font-mono">
                      Check SETUP.md for instructions
                    </code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Auth Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-200 ${
                !isSignUp
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-200 ${
                isSignUp
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              disabled={emailLoading || !isSupabaseConfigured}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200"
            >
              {emailLoading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={signInWithGoogle}
            disabled={loading || !isSupabaseConfigured}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-2xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group"
          >
            <div className="relative">
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-slate-300 dark:border-slate-500 border-t-slate-600 dark:border-t-slate-300 rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <span>
              {loading 
                ? 'Signing in...' 
                : !isSupabaseConfigured 
                  ? 'Configure Supabase First' 
                  : 'Continue with Google'}
            </span>
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">Or explore features</span>
            </div>
          </div>

          {/* Guest Mode */}
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {isSupabaseConfigured ? "Demo Mode Available" : "Set up Supabase to get started"}
            </p>
            {isSupabaseConfigured && (
              <button
                onClick={() => {/* We'll implement guest mode later */}}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                Continue as Guest
              </button>
            )}
          </div>

          {/* Theme Toggle */}
          <div className="mt-6 flex justify-center">
            <ThemeToggle />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 rounded-2xl border border-white/20 dark:border-white/10 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300 slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 dark:from-indigo-900/50 to-purple-100 dark:to-purple-900/50 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{feature.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Built with Next.js 15 + Supabase + TypeScript
          </p>
          <div className="flex justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-400 dark:text-slate-500">Real-time ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}