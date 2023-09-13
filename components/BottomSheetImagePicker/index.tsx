import {AntDesign, Feather} from '@expo/vector-icons';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Box, HStack, Pressable, Text, useTheme} from 'native-base';
import React, {ReactNode, useCallback, useMemo, useRef} from 'react';

import useImagePicker from './useImagePicker';
import {useCurrentTheme} from '../../hooks/useCurrentTheme';

interface BottomSheetImagePickerProps {
  children: ReactNode;
  onImageSelected: (imageURL: string) => void;
}

const BottomSheetImagePicker = ({
  children,
  onImageSelected,
}: BottomSheetImagePickerProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['25%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const currTheme = useCurrentTheme();
  const theme = useTheme();

  const imagePicker = useImagePicker({onImageSelected});

  return (
    <Box>
      <Pressable onPress={handlePresentModalPress}>{children}</Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backgroundStyle={{
          backgroundColor: theme.colors[currTheme].navigation.card,
        }}
        handleIndicatorStyle={{backgroundColor: theme.colors[currTheme].text}}
        index={0}
        snapPoints={snapPoints}>
        <Box>
          <Pressable onPress={imagePicker.pickImage} p={3} mx={3}>
            <HStack space={3}>
              <AntDesign
                name="picture"
                size={24}
                color={theme.colors[currTheme].text}
              />
              <Text fontSize={18}>Choose from library</Text>
            </HStack>
          </Pressable>
          <Pressable onPress={imagePicker.takePicture} p={3} mx={3}>
            <HStack space={3}>
              <AntDesign
                name="camerao"
                size={24}
                color={theme.colors[currTheme].text}
              />
              <Text fontSize={18}>Take photo</Text>
            </HStack>
          </Pressable>
          <Pressable onPress={() => onImageSelected('')} p={3} mx={3}>
            <HStack space={3}>
              <Feather
                name="trash"
                size={24}
                color={theme.colors[currTheme].error}
              />
              <Text fontSize={18} color={theme.colors[currTheme].error}>
                Remove current picture
              </Text>
            </HStack>
          </Pressable>
        </Box>
      </BottomSheetModal>
    </Box>
  );
};

export default BottomSheetImagePicker;
