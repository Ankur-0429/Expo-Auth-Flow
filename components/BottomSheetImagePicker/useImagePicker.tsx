import * as ImagePicker from 'expo-image-picker';
import {Alert, Linking} from 'react-native';

interface useImagePickerProps {
  onImageSelected: (imageURL: string) => void;
}

export default function useImagePicker({onImageSelected}: useImagePickerProps) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    const permisson = await ImagePicker.requestCameraPermissionsAsync();

    if (permisson.granted) {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        onImageSelected(result.assets[0].uri);
      }
    } else {
      Alert.alert(
        'Camera permissions needed',
        'We need access to your camera to take a photo.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'Settings', onPress: () => Linking.openSettings()},
        ],
      );
    }
  };

  return {
    pickImage,
    takePicture,
  };
}
