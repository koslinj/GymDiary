import React, { useEffect, useState } from 'react';
import { View, Modal, Animated } from 'react-native';
import { gestureHandlerRootHOC, PanGestureHandler, State } from 'react-native-gesture-handler';
import { ThemedView } from './ThemedComponents';

export const MyToast = ({ openToast, setOpenToast, children, duration = 3000 }) => {
  const [translateY] = useState(new Animated.Value(0));

  useEffect(() => {
    if (openToast) {
      const timer = setTimeout(() => {
        setOpenToast(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [openToast, duration]);

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event) => {
    if (event.nativeEvent.translationY > 80) {
      // Swipe down detected
      Animated.timing(translateY, {
        toValue: 300, // Move it off the screen
        duration: 200,
        useNativeDriver: true,
      }).start(() => setOpenToast(false));
    } else {
      // Reset the position if not swiped enough
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  if (!openToast) return null;

  const Wrapper = gestureHandlerRootHOC(() => (
    <View className="absolute bottom-0 left-0 right-0 flex justify-center items-center">
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onHandlerStateChange={(event) =>
          event.nativeEvent.state === State.END && handleGestureEnd(event)
        }
      >
        <Animated.View
          style={{
            transform: [{ translateY }], // Updated for horizontal swipe
            opacity: translateY.interpolate({
              inputRange: [0, 80],
              outputRange: [1, 0], // Fades out as it swipes away
            }),
            elevation: 20,
          }}
          className="w-[95%] px-6 pb-8 rounded-lg bg-white dark:bg-slate-700"
        >
          <ThemedView className='h-[4px] w-[30%] my-3 rounded-full mx-auto bg-slate-700 dark:bg-white'></ThemedView>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
  );

  return (
    <Modal
      visible={openToast}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={() => setOpenToast(false)}
    >
      <Wrapper />
    </Modal>
  );
};
