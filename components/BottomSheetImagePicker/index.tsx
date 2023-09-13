import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Box, Card, Pressable, Text, useTheme} from 'native-base';
import React, {ReactNode, useCallback, useMemo, useRef} from 'react';

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
          <Text>Awesome 🎉</Text>
        </Box>
      </BottomSheetModal>
    </Box>
  );
};

export default BottomSheetImagePicker;
