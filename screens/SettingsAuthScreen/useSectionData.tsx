import {useState} from 'react';

import SectionType from '../../components/SectionList/types';

const useSectionData = () => {
  const initialData: SectionType[] = [
    {
      header: 'Preferences',
      items: [
        {label: 'Language', value: 'English', type: 'input'},
        {label: 'Dark Mode', value: false, type: 'boolean'},
        {label: 'Use Wi-Fi', value: true, type: 'boolean'},
      ],
    },
    {
      header: 'Help',
      items: [
        {label: 'Report Bug', type: 'link'},
        {label: 'Contact Us', type: 'link'},
      ],
    },
    {
      header: 'Content',
      items: [
        {label: 'Saved', type: 'link'},
        {label: 'Downloads', type: 'link'},
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
