import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useColor } from '@/hooks/useColor';
import { Colors } from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Series() {
  const bgColor = useColor('#ffffff', Colors.slate800)
  const indicatorColor = useColor("#ffbf1b", "#bb4f02")
  const layout = useWindowDimensions();
  const { selectedExercises } = useLocalSearchParams()
  const parsedExercises: string[] = JSON.parse(selectedExercises as string);

  const [sets, setSets] = useState<{ [key: string]: { reps: string, weight: string }[] }>(
    parsedExercises.reduce((acc, name) => {
      acc[name] = [{ reps: '', weight: '' }];
      return acc;
    }, {} as { [key: string]: { reps: string, weight: string }[] })
  );

  const [index, setIndex] = useState(0)

  const routes = parsedExercises.map(name => (
    { key: name, title: name }
  ));

  const addSet = (exercise: string) => {
    setSets(prevSets => ({
      ...prevSets,
      [exercise]: [...prevSets[exercise], { reps: '', weight: '' }],
    }));
  };

  const removeSet = (exercise: string) => {
    setSets(prevSets => ({
      ...prevSets,
      [exercise]: prevSets[exercise].slice(0, -1),
    }));
  };

  const updateSet = (exercise: string, index: number, field: 'reps' | 'weight', value: string) => {
    setSets(prevSets => {
      const updatedSets = [...prevSets[exercise]];
      updatedSets[index][field] = value;
      return {
        ...prevSets,
        [exercise]: updatedSets,
      };
    });
  };

  const renderScene = SceneMap(
    routes.reduce<{ [key: string]: () => JSX.Element }>((scenes, route) => {
      scenes[route.key] = () => (
        <ThemedView className="p-4">
          {sets[route.key].map((set, setIndex) => (
            <View key={setIndex} className="mb-4">
              <ThemedText className="mb-2">Set {setIndex + 1}</ThemedText>
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
          {sets[route.key].length > 1 ? (
            <ThemedView className='flex-row justify-between'>
              <TouchableOpacity onPress={() => addSet(route.key)} className='flex-row items-center space-x-2'>
                <FontAwesome5 name="plus-circle" size={36} color={Colors.green600} />
                <ThemedText className='font-poppinsBold text-lg'>Add Set</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeSet(route.key)} className='flex-row items-center space-x-2'>
                <FontAwesome5 name="minus-circle" size={36} color={Colors.red600} />
                <ThemedText className='font-poppinsBold text-lg'>Remove Set</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          ) : (
            <ThemedView className='flex-row justify-start'>
              <TouchableOpacity onPress={() => addSet(route.key)} className='flex-row items-center space-x-2'>
                <FontAwesome5 name="plus-circle" size={36} color={Colors.green600} />
                <ThemedText className='font-poppinsBold text-lg'>Add Set</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
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
