import {useNavigation} from '@react-navigation/native';
import {doc, setDoc} from 'firebase/firestore';
import {useState} from 'react';

import {auth, firestore} from '../../../../constants/firebaseConfig';
import getBlobFromUri from '../../../../constants/imageUpload/getBlobFromUri';
import manageFileUpload from '../../../../constants/imageUpload/manageFileUpload';
import userType from '../../../../constants/types/userType';
import {AuthProp} from '../../../../navigation/types';

export default function useProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profileImageLocalUrl, setProfileImageLocalUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<AuthProp>();
  const go_back_to_login = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const upload_profile_image = async (): Promise<string> => {
    if (profileImageLocalUrl !== '') {
      const fileBlob = await getBlobFromUri(profileImageLocalUrl);

      const downloadedUrl = await manageFileUpload(
        fileBlob,
        'userProfile/' + auth.currentUser?.uid,
      );

      return downloadedUrl;
    }
    return '';
  };

  const submit_profile = async () => {
    setIsLoading(true);
    const downloadedUrl = await upload_profile_image();

    if (auth.currentUser?.uid) {
      const documentRef = doc(firestore, 'users', auth.currentUser.uid);
      const data: userType = {
        uid: auth.currentUser.uid,
        profileImageUrl: downloadedUrl,
        firstName,
        lastName,
        dateOfBirth,
        dateWhenJoinedPlatform: new Date().toISOString(),
      };
      await setDoc(documentRef, data).then(() => {
        auth.currentUser?.reload();
      });
    }
    setIsLoading(false);
  };

  return {
    go_back_to_login,
    setFirstName,
    setLastName,
    setDateOfBirth,
    profileImageLocalUrl,
    setProfileImageLocalUrl,
    submit_profile,
    isLoading,
  };
}
