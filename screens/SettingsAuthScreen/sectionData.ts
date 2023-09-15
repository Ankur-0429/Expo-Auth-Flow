import SectionType from '../../components/SectionList/types';

const sectionData: SectionType[] = [
  {
    header: 'Preferences',
    items: [
      {icon: 'globe', label: 'Language', value: 'English', type: 'input'},
      {icon: 'moon', label: 'Dark Mode', value: false, type: 'boolean'},
      {icon: 'wifi', label: 'Use Wi-Fi', value: true, type: 'boolean'},
    ],
  },
  {
    header: 'Help',
    items: [
      {icon: 'flag', label: 'Report Bug', type: 'link'},
      {icon: 'mail', label: 'Contact Us', type: 'link'},
    ],
  },
  {
    header: 'Content',
    items: [
      {icon: 'save', label: 'Saved', type: 'link'},
      {icon: 'download', label: 'Downloads', type: 'link'},
    ],
  },
];

export default sectionData;
