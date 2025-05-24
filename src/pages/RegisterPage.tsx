import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await registerUser(username, password);
    if (success) {
      toast.success('Account created');
      navigate('/apply');
    } else {
      toast.error('Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex justify-center items-center">
      <div className="container mx-auto px-4 max-w-md card">
        <h1 className="text-2xl font-display text-primary mb-6 text-center">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
            <input id="username" className="input w-full" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input id="password" type="password" className="input w-full" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-full">{loading ? 'Creating...' : 'Register'}</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
