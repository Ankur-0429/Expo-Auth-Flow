import {ScrollView} from 'native-base';

import useSectionData from './useSectionData';
import SectionList from '../../../components/SectionList';

const SettingsAuthScreen = () => {
  const {sectionData, updateSectionData} = useSectionData();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SectionList data={sectionData} onStateChanged={updateSectionData} />
    </ScrollView>
  );
};

export default SettingsAuthScreen;
