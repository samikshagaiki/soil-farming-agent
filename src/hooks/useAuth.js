import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        console.log('Auth: User logged in:', firebaseUser.email); // Logging
        // Fetch role from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data()?.role);
        } else {
          // Default to user on first login
          await setDoc(doc(db, 'users', firebaseUser.uid), { role: 'user', email: firebaseUser.email });
          setRole('user');
        }
      } else {
        console.log('Auth: User logged out'); // Logging
        setRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, role, loading };
};