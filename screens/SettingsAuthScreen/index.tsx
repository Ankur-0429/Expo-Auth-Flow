import {Box, Text, Image, Card, ScrollView} from 'native-base';
import {SafeAreaView} from 'react-native';

import sectionData from './sectionData';
import SectionList from '../../components/SectionList';
import sectionListStyles from '../../components/SectionList/styles';
import {auth} from '../../constants/firebaseConfig';
import useCachedUserData from '../../hooks/useCachedUserData';

const SettingsAuthScreen = () => {
  const {user} = useCachedUserData({uid: auth.currentUser?.uid || ''});
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Box style={sectionListStyles.section}>
        <Box style={sectionListStyles.sectionHeader}>
          <Text
            style={sectionListStyles.sectionHeaderText}
            color="constants.greyText">
            Account
          </Text>
        </Box>
        <Card style={sectionListStyles.profile}>
          <Image
            alt=""
            source={{
              uri: user?.profileImageUrl,
            }}
            style={sectionListStyles.profileAvatar}
          />

          <Box>
            <Text style={sectionListStyles.profileName}>
              {user?.firstName + ' ' + user?.lastName}
            </Text>
            <Text
              style={sectionListStyles.profileHandle}
              color="constants.greyText">
              {auth.currentUser?.email}
            </Text>
          </Box>
        </Card>
      </Box>
      <SectionList data={sectionData} />
    </ScrollView>
  );
};

export default SettingsAuthScreen;
