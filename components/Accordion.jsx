import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ThemedText, ThemedView } from './ThemedComponents';
import { Feather } from '@expo/vector-icons';
import { useBlackOrWhite } from '@/hooks/useBlackOrWhite';

export function AccordionItem({
  isExpanded,
  children,
  viewKey,
  duration = 500,
}) {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    })
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle]}>
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}>
        {children}
      </View>
    </Animated.View>
  );
}

export function Accordion({ accordionData }) {
  const openState = accordionData.map(() => useSharedValue(false))

  const toggleAccordion = (index) => {
    openState[index].value = !openState[index].value
  }

  return (
    <ThemedView className='space-y-3 bg-slate-200 dark:bg-slate-700'>
      {accordionData.map((item, index) => (
        <ThemedView className='bg-slate-200 dark:bg-slate-700' key={index}>
          <TouchableOpacity className='flex-row items-center justify-between' onPress={() => toggleAccordion(index)}>
            {item.title}
            <ChevronIcon isExpanded={openState[index]} />
          </TouchableOpacity>
          <AccordionItem isExpanded={openState[index]} viewKey={`Accordion-${index}`}>
            {item.content.map((text, idx) => (
              <ThemedText className='text-lg' key={idx}>{text}</ThemedText>
            ))}
          </AccordionItem>
        </ThemedView>
      ))}
    </ThemedView>
  )
}

const ChevronIcon = ({ isExpanded }) => {
  const iconColor = useBlackOrWhite()
  const rotate = useDerivedValue(() =>
    withTiming(isExpanded.value ? 180 : 0, { duration: 300 })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Feather name="chevron-down" size={40} color={iconColor} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
  },
  animatedView: {
    width: '100%',
    overflow: 'hidden',
  }
});