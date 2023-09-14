import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

import {storage} from '../firebaseConfig';

const manageFileUpload = async (
  fileBlob: Blob,
  filePath: string,
): Promise<string> => {
  try {
    const storageRef: StorageReference = ref(storage, filePath);
    await uploadBytes(storageRef, fileBlob);
    const url: string = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    throw error;
  }
};

export default manageFileUpload;
