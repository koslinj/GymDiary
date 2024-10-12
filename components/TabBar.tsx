import { View, Text, TouchableOpacity, StyleSheet, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { Feather } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';
import { useEffect, useState } from 'react';
import Animated, { ReduceMotion, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useColor } from '@/hooks/useColor';
import { Colors } from '@/constants/Colors';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {

  const [dimensions, setDimensions] = useState({ height: 20, width: 100 })

  const buttonWidth = dimensions.width / state.routes.length

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width
    })
  }

  useEffect(() => {
    tabPositionX.value = withSpring(buttonWidth * state.index, {
      duration: 1000,
      dampingRatio: 0.7
    })
  }, [buttonWidth, state.index])


  const tabPositionX = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }]
    }
  })

  const focusedColor = useColor('black', 'white')
  const unfocusedColor = useColor('#666', '#555')
  const iconBgColor = useColor("#ffbf1b", "#bb4f02")

  return (
    <View onLayout={onTabBarLayout} style={[styles.tabbar, {backgroundColor: useColor(Colors.slate300, "black")}]}>
      <Animated.View style={[{
        position: 'absolute',
        backgroundColor: iconBgColor,
        borderRadius: 30,
        marginHorizontal: 10,
        height: dimensions.height - 16,
        width: buttonWidth - 20
      },
        animatedStyle]}>

      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? "Error"

        const isFocused = state.index === index;

        const onPress = () => {
          //tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 })

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name as RouteName}
            color={isFocused ? focusedColor : unfocusedColor}
            label={label}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    elevation: 4,
  }
})