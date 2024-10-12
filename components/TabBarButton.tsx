import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { icon } from '@/constants/icon'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useColor } from '@/hooks/useColor'

interface Props {
  onPress: (event: GestureResponderEvent) => void
  onLongPress: (event: GestureResponderEvent) => void
  isFocused: boolean
  routeName: RouteName
  color: string
  label: string
}

export default function TabBarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label
}: Props) {

  const scale = useSharedValue(0)

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      {
        duration: 350
      }
    )
  }, [scale, isFocused])

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4])
    const top = interpolate(scale.value, [0, 1], [0, 9])

    return { transform: [{ scale: scaleValue }], top }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])

    return { opacity }
  })

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({
          color: color
        })}
      </Animated.View>
      <Animated.Text style={[{ color: useColor('#666', '#555'), fontSize: 12 }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2
  }
})