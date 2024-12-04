import React, {useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, Animated, Text} from 'react-native';

const CustomBottomTab = ({state, navigation, insets, descriptors, name}) => {
  const tab1Value = useRef(new Animated.Value(0)).current;
  const tab2Value = useRef(new Animated.Value(0)).current;
  const tab3Value = useRef(new Animated.Value(0)).current;
  const tab4Value = useRef(new Animated.Value(0)).current;

  const scaleAnimated = (value, andimatedValue) =>
    Animated.timing(andimatedValue, {
      useNativeDriver: true,
      toValue: value,
      duration: 150,
    });

  const andimatedValues = {
    0: tab1Value,
    1: tab2Value,
    2: tab3Value,
    3: tab4Value,
  };

  return (
    <View style={[styles.bottomTabBarWrapper, {paddingBottom: insets.bottom}]}>
      {state.routes.map((route, index) => {
        const label = route.name;
        const isFocused = state.index === index;
        const animatedOf = andimatedValues[index];

        const iconFlag = bool => {
          switch (label) {
            case '일정':
              return bool ? bottombar_calen_on : bottombar_calen;
            case '고객':
              return bool ? bottombar_person_on : bottombar_person;
            case '매출':
              return bool ? bottombar_grap_on : bottombar_grap;
            case '재고':
              return bool ? bottombar_box_on : bottombar_box;
            default:
              return;
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
          scaleAnimated(1, animatedOf).start(({finished}) => {
            if (finished) {
              scaleAnimated(0, animatedOf).start();
            }
          });
        };

        return (
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            key={index}
            activeOpacity={0.7}
            onPress={onPress}>
            <Animated.Image
              source={iconFlag(isFocused)}
              resizeMode={'contain'}
              style={{
                width: 28,
                height: 28,
                transform: [
                  {
                    scale: animatedOf.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.9],
                    }),
                  },
                ],
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 4,
                paddingBottom: 5,
              }}>
              <Text style={{fontSize: 12}}>{route.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const bottombar_calen = require('../assets/bottomtab/calen.png');
const bottombar_person = require('../assets/bottomtab/person.png');
const bottombar_grap = require('../assets/bottomtab/grap.png');
const bottombar_box = require('../assets/bottomtab/box.png');

const bottombar_calen_on = require('../assets/bottomtab/calen_on.png');
const bottombar_person_on = require('../assets/bottomtab/person_on.png');
const bottombar_grap_on = require('../assets/bottomtab/grap_on.png');
const bottombar_box_on = require('../assets/bottomtab/box_on.png');


const styles = StyleSheet.create({
  bottomTabBarWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#C3C3C3',
    backgroundColor: '#FFF',
    paddingTop: 10,
    zIndex: 10,
  },
});

export default CustomBottomTab;
