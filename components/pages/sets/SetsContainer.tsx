import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import { FC, useState } from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useColor } from '@/hooks/useColor';
import { Colors } from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSets } from '@/hooks/useSets';
import { AddRemoveSets } from './AddRemoveSets';

interface Props {
  routes: {
    key: string;
    title: string;
  }[]
}

export const SetsContainer: FC<Props> = ({ routes }) => {
  const bgColor = useColor('#ffffff', Colors.slate800)
  const indicatorColor = useColor("#ffbf1b", "#bb4f02")
  const layout = useWindowDimensions();

  const { sets, addSet, removeSet, updateSet } = useSets();

  const [index, setIndex] = useState(0)

  const renderScene = SceneMap(
    routes.reduce<{ [key: string]: () => JSX.Element }>((scenes, route) => {
      scenes[route.key] = () => (
        <ThemedView className="p-4">
          {sets[route.key].map((set, setIndex) => (
            <View key={setIndex} className="mb-4">
              <TextInput
                value={set.reps}
                onChangeText={(text) => updateSet(route.key, setIndex, 'reps', text)}
                placeholder="Repetitions"
                keyboardType="numeric"
                className="border p-2 mb-2"
              />
              <TextInput
                value={set.weight}
                onChangeText={(text) => updateSet(route.key, setIndex, 'weight', text)}
                placeholder="Weight"
                keyboardType="numeric"
                className="border p-2"
              />
            </View>
          ))}
          <AddRemoveSets length={sets[route.key].length} routeKey={route.key} />
        </ThemedView>
      );
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
