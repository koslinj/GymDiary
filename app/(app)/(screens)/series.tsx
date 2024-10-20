import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useColor } from '@/hooks/useColor';
import { Colors } from '@/constants/Colors';

export default function Series() {
  const bgColor = useColor('#ffffff', Colors.slate800)
  const indicatorColor = useColor("#ffbf1b", "#bb4f02")
  const layout = useWindowDimensions();
  const { selectedExercises } = useLocalSearchParams()
  const parsedExercises: string[] = JSON.parse(selectedExercises as string);

  const [index, setIndex] = useState(0)

  const routes = parsedExercises.map(name => (
    { key: name, title: name }
  ));

  const renderScene = SceneMap(
    routes.reduce<{ [key: string]: () => JSX.Element }>((scenes, route) => {
      scenes[route.key] = () => <ThemedText>{route.title}</ThemedText>;
      return scenes;
    }, {})
  );

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      scrollEnabled={true}
      indicatorStyle={{ backgroundColor: indicatorColor }}
      style={{ backgroundColor: bgColor }}
      tabStyle={{ width: 'auto' }}
      labelStyle={{ fontSize: 16 }}
    />
  );

  return (
    <ThemedView className="flex-1">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar} // Use custom TabBar
      />
    </ThemedView>
  );
}
