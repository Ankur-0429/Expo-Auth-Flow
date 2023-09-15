import {Feather as FeatherIcon} from '@expo/vector-icons';
import {Box, Text, Pressable, Card, Switch, Spacer} from 'native-base';
import React from 'react';

import sectionListStyles from './styles';
import SectionType from './types';

interface SectionListInterface {
  data: SectionType[];
  onStateChanged: (updatedData: SectionType[]) => void;
}

export default function SectionList({
  data,
  onStateChanged,
}: SectionListInterface) {
  return (
    <>
      {data.map(({header, items}) => (
        <Box style={sectionListStyles.section} key={header}>
          <Box style={sectionListStyles.sectionHeader}>
            <Text
              style={sectionListStyles.sectionHeaderText}
              color="constants.greyText">
              {header}
            </Text>
          </Box>
          <Card p={0} style={sectionListStyles.sectionBody}>
            {items.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === items.length - 1;
              return (
                <Box
                  key={index}
                  borderColor="constants.greyText"
                  style={[
                    sectionListStyles.rowWrapper,
                    index === 0 && {borderTopWidth: 0},
                    isFirst && sectionListStyles.rowFirst,
                    isLast && sectionListStyles.rowLast,
                  ]}>
                  <Pressable
                    isDisabled={item.type === 'boolean'}
                    onPress={() => {
                      if (item.type !== 'boolean') {
                        item.onPress();
                      }
                    }}>
                    <Box style={sectionListStyles.row}>
                      <Text style={sectionListStyles.rowLabel}>
                        {item.label}
                      </Text>

                      <Spacer />

                      {item.type === 'input' && 'value' in item && (
                        <Text style={sectionListStyles.rowValue}>
                          {item.value}
                        </Text>
                      )}

                      {item.type === 'boolean' &&
                        'value' in item &&
                        typeof item.value === 'boolean' && (
                          <Switch
                            value={item.value}
                            onToggle={value => {
                              const updatedData = [...data];
                              const sectionIndex = updatedData.findIndex(
                                section =>
                                  section.items.some(
                                    sectionItem => sectionItem === item,
                                  ),
                              );

                              const itemIndex = updatedData[
                                sectionIndex
                              ].items.findIndex(
                                sectionItem => sectionItem === item,
                              );

                              const section =
                                updatedData[sectionIndex].items[itemIndex];

                              if (section.type === 'boolean') {
                                section.value = value;
                                onStateChanged(updatedData);
                              }
                            }}
                          />
                        )}

                      {(item.type === 'input' || item.type === 'link') && (
                        <FeatherIcon
                          color="#ababab"
                          name="chevron-right"
                          size={22}
                        />
                      )}
                    </Box>
                  </Pressable>
                </Box>
              );
            })}
          </Card>
        </Box>
      ))}
    </>
  );
}
