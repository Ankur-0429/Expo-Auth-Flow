import {doc, getDoc} from 'firebase/firestore';

import {firestore} from '../firebaseConfig';
import userType from '../types/userType';

const getUserData = async (uid: string): Promise<userType | null> => {
  const db = doc(firestore, 'users', uid);
  const data = await getDoc(db);

  if (data.exists()) {
    return data.data() as userType;
  }

  return null;
};

export default getUserData;
