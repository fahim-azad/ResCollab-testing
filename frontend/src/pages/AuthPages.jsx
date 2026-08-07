import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-gray-200">
        <CardContent className="p-8">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl mx-auto flex items-center justify-center text-white font-bold text-2xl mb-4">R</div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                <p className="text-gray-500 text-sm mt-2">Sign in to your ResCollab account</p>
            </div>
            <form className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Email address</label>
                    <Input type="email" placeholder="name@university.edu" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5 flex justify-between">
                        Password
                        <Link to="/forgot-password" className="text-primary hover:underline">Forgot?</Link>
                    </label>
                    <Input type="password" placeholder="••••••••" />
                </div>
                <Link to="/dashboard">
                    <Button className="w-full mt-6 h-12 text-md">Sign In</Button>
                </Link>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">
                Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
      <Card className="w-full max-w-md shadow-xl border-gray-200">
        <CardContent className="p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
                <p className="text-gray-500 text-sm mt-2">Join the unified research ecosystem</p>
            </div>
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">First Name</label>
                        <Input type="text" placeholder="Sarah" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">Last Name</label>
                        <Input type="text" placeholder="Connor" />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">University Email</label>
                    <Input type="email" placeholder="name@university.edu" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Choose Role</label>
                    <select className="flex h-10 w-full rounded-xl border border-border-main bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Student</option>
                        <option>Researcher</option>
                        <option>Faculty</option>
                        <option>Lab Admin</option>
                        <option>University Admin</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
                    <Input type="password" placeholder="••••••••" />
                </div>
                <Link to="/verify-email">
                    <Button className="w-full mt-6 h-12 text-md">Create Account</Button>
                </Link>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">
                Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-gray-200">
        <CardContent className="p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
                <p className="text-gray-500 text-sm mt-2">Enter your email and we'll send you a reset link.</p>
            </div>
            <form className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Email address</label>
                    <Input type="email" placeholder="name@university.edu" />
                </div>
                <Link to="/login">
                    <Button className="w-full mt-6 h-12 text-md">Send Reset Link</Button>
                </Link>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">
                Remember your password? <Link to="/login" className="text-primary font-medium hover:underline">Back to Login</Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function EmailVerificationPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-gray-200 text-center">
        <CardContent className="p-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h1>
            <p className="text-gray-500 text-sm mb-8">
                We've sent a verification link to your email address. Please click the link to verify your account.
            </p>
            <Link to="/dashboard">
                <Button className="w-full h-12 text-md">I've verified my email</Button>
            </Link>
            <div className="mt-6 text-sm text-gray-500">
                Didn't receive the email? <button className="text-primary font-medium hover:underline">Click to resend</button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
