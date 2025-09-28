'use client';
import { useState } from 'react';

export default function PostForm({ type, onSuccess }) {
  const [data, setData] = useState(
    type === 'soil'
      ? { name: '', description: '', suitableCrops: [''] }
      : { name: '', contact: '', location: '' }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/${type}s`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        console.log(`DB: Posted ${type} successfully`); // Logging
        onSuccess();
        setData(
          type === 'soil'
            ? { name: '', description: '', suitableCrops: [''] }
            : { name: '', contact: '', location: '' }
        );
      } else {
        throw new Error('Failed to post');
      }
    } catch (error) {
      console.error(`DB: Post ${type} failed:`, error); // Logging
    }
    setLoading(false);
  };

  const updateCrops = (index, value) => {
    const newCrops = [...data.suitableCrops];
    newCrops[index] = value;
    setData({ ...data, suitableCrops: newCrops });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">Post {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      <input
        placeholder="Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      {type === 'soil' ? (
        <>
          <textarea
            placeholder="Description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            placeholder="Suitable Crop 1"
            value={data.suitableCrops[0]}
            onChange={(e) => updateCrops(0, e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
        </>
      ) : (
        <>
          <input
            placeholder="Contact"
            value={data.contact}
            onChange={(e) => setData({ ...data, contact: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            placeholder="Location"
            value={data.location}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
        </>
      )}
      <button type="submit" disabled={loading} className="w-full p-2 bg-green-500 text-white rounded">
        {loading ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
}