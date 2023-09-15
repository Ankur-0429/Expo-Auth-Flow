import {signOut} from 'firebase/auth';
import {useState} from 'react';

import SectionType from '../../../components/SectionList/types';
import {auth} from '../../../constants/firebaseConfig';

const useSectionData = () => {
  const initialData: SectionType[] = [
    {
      header: 'Danger Zone',
      items: [
        {
          label: 'Log Out',
          type: 'link',
          onPress: () => {
            signOut(auth);
          },
          isDangerous: true,
        },
        {
          label: 'Delete Account',
          type: 'link',
          onPress: () => {
            console.log('delete account');
          },
          isDangerous: true,
        },
      ],
    },
  ];

  const [sectionData, setSectionData] = useState(initialData);

  const updateSectionData = (data: SectionType[]) => {
    setSectionData(data);
  };

  return {
    sectionData,
    updateSectionData,
  };
};

export default useSectionData;
