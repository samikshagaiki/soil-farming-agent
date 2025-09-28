import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export async function GET() {
  try {
    const soilsSnapshot = await getDocs(collection(db, 'soils'));
    const soils = soilsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('DB: Fetched soils:', soils.length); // Logging
    return Response.json(soils);
  } catch (error) {
    console.error('DB: Error fetching soils:', error); // Logging
    return Response.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req) {
  const user = auth.currentUser;
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await req.json();
    const docRef = await addDoc(collection(db, 'soils'), data);
    console.log('DB: Added soil:', docRef.id); // Logging
    return Response.json({ id: docRef.id });
  } catch (error) {
    console.error('DB: Error adding soil:', error); // Logging
    return Response.json({ error: 'Failed to add' }, { status: 500 });
  }
}