import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export async function GET() {
  try {
    const distributorsSnapshot = await getDocs(collection(db, 'distributors'));
    const distributors = distributorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('DB: Fetched distributors:', distributors.length); // Logging
    return Response.json(distributors);
  } catch (error) {
    console.error('DB: Error fetching distributors:', error); // Logging
    return Response.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req) {
  const user = auth.currentUser;
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await req.json();
    const docRef = await addDoc(collection(db, 'distributors'), data);
    console.log('DB: Added distributor:', docRef.id); // Logging
    return Response.json({ id: docRef.id });
  } catch (error) {
    console.error('DB: Error adding distributor:', error); // Logging
    return Response.json({ error: 'Failed to add' }, { status: 500 });
  }
}