import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import SectionType from '../../../components/SectionList/types';
import {RootProp} from '../../../navigation/types';

const useSectionData = () => {
  const navigation = useNavigation<RootProp>();
  const initialData: SectionType[] = [
    {
      header: 'Preferences',
      items: [
        {
          label: 'Account',
          type: 'link',
          onPress: () => {
            navigation.navigate('Account');
          },
        },
      ],
    },
    {
      header: 'Help',
      items: [
        {
          label: 'Report Bug',
          type: 'link',
          onPress: () => {
            console.log('report bug');
          },
        },
        {
          label: 'Contact Us',
          type: 'link',
          onPress: () => {
            console.log('contact us');
          },
        },
      ],
    },
    {
      header: 'Content',
      items: [
        {
          label: 'Remove Cache',
          type: 'link',
          onPress: () => {
            console.log('Remove Cache');
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
