'use client';
import { useEffect, useState } from 'react';

export default function ViewList({ type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/${type}s`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        console.log(`DB: Loaded ${type}s:`, data.length); // Logging
      })
      .catch(err => console.error(`DB: Load ${type}s failed:`, err)) // Logging
      .finally(() => setLoading(false));
  }, [type]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl mb-4">{type.charAt(0).toUpperCase() + type.slice(1)} Details</h2>
      {items.length === 0 ? (
        <p>No {type}s available.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="p-4 bg-gray-100 rounded">
              <h3 className="font-bold">{item.name}</h3>
              {type === 'soil' ? (
                <>
                  <p>{item.description}</p>
                  <p><strong>Crops:</strong> {item.suitableCrops && item.suitableCrops.join(', ')}</p>
                </>
              ) : (
                <>
                  <p><strong>Contact:</strong> {item.contact}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}