'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function AuthForm({ type, onSuccess, isAdmin = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (type === 'login') {
        if ((isAdmin && email !== 'admin@example.com') || password !== 'admin123') {
          throw new Error('Invalid admin credentials');
        }
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      console.log(`Auth: ${type} successful for ${email}`); // Logging
      onSuccess();
    } catch (err) {
      setError(err.message);
      console.error(`Auth: ${type} failed:`, err.message); // Logging
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">{type === 'login' ? 'Login' : 'Register'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded">
        {loading ? 'Loading...' : type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
      {isAdmin && <p className="mt-2 text-sm">Admin: admin@example.com / admin123</p>}
    </form>
  );
}