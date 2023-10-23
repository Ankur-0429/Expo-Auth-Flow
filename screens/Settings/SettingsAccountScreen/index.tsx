import {Box, Text, Card, ScrollView, Spinner, Pressable} from 'native-base';

import useSectionData from './useSectionData';
import SectionList from '../../../components/SectionList';
import sectionListStyles from '../../../components/SectionList/styles';
import SectionType from '../../../components/SectionList/types';
import {auth} from '../../../constants/firebaseConfig';
import useCachedUserData from '../../../hooks/useCachedUserData';

const SettingsAccountScreen = () => {
  const {user} = useCachedUserData({uid: auth.currentUser?.uid || ''});
  const {sectionData, updateSectionData} = useSectionData();

  const handleSectionDataUpdate = (data: SectionType[]) => {
    updateSectionData(data);
  };
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Box style={sectionListStyles.section}>
        <Card style={sectionListStyles.profile}>
          <Box>
            {user ? (
              <Text style={sectionListStyles.profileName}>
                {user.firstName + ' ' + user.lastName}
              </Text>
            ) : (
              <Spinner mr="auto" />
            )}

            <Text
              style={sectionListStyles.profileHandle}
              color="constants.greyText">
              {auth.currentUser?.email}
            </Text>

            <Pressable>
              <Text color="constants.primary">Edit Profile</Text>
            </Pressable>
          </Box>
        </Card>
      </Box>
      <SectionList
        data={sectionData}
        onStateChanged={handleSectionDataUpdate}
      />
    </ScrollView>
  );
};

export default SettingsAccountScreen;
