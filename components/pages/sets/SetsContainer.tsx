import { ThemedView } from '@/components/ThemedComponents';
import { FC, useState, useMemo } from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { useColor } from '@/hooks/useColor';
import { Colors } from '@/constants/Colors';
import { SetScene } from './SetScene';
import { useBlackOrWhite } from '@/hooks/useBlackOrWhite';

interface Props {
  routes: {
    key: string;
    title: string;
  }[];
}

export const SetsContainer: FC<Props> = ({ routes }) => {
  const bgColor = useColor('#ffffff', Colors.slate800);
  const textColor = useBlackOrWhite()
  const indicatorColor = useColor("#ffbf1b", "#bb4f02");
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const renderScene = useMemo(() => {
    return SceneMap(
      routes.reduce<{ [key: string]: () => JSX.Element }>((scenes, route) => {
        scenes[route.key] = () => <SetScene routeKey={route.key} />;
        return scenes;
      }, {})
    );
  }, [routes]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      scrollEnabled={true}
      indicatorStyle={{ backgroundColor: indicatorColor }}
      style={{ backgroundColor: bgColor }}
      tabStyle={{ width: 'auto' }}
      labelStyle={{ fontSize: 16, color: textColor }}
    />
  );

  return (
    <ThemedView className="flex-1">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </ThemedView>
  );
};
