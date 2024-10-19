import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useGlobalStyles } from '@/hooks/useGlobalStyles'
import { ThemedText, ThemedView } from './ThemedComponents';

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
  const styles = useGlobalStyles()
  const openState = accordionData.map(() => useSharedValue(false))

  const toggleAccordion = (index) => {
    openState[index].value = !openState[index].value
  }

  return (
    <ThemedView className='space-y-3 bg-slate-200 dark:bg-slate-700'>
      {accordionData.map((item, index) => (
        <ThemedView className='bg-slate-200 dark:bg-slate-700' key={index}>
          <TouchableOpacity onPress={() => toggleAccordion(index)}>
            {item.title}
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