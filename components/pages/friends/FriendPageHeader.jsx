import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedText, ThemedView } from '@/components/ThemedComponents';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { fetchFriendInfo } from '@/api/friends';
import { useTranslation } from 'react-i18next';

export function FriendPageHeader({ id, theme, router }) {
  const { t } = useTranslation()
  const styles = useGlobalStyles();

  const { data: friend, isLoading, isError, error } = useQuery(
    {
      queryKey: ['friendInfo', id],
      queryFn: () => fetchFriendInfo(parseInt(id)),
      enabled: !!id,
      refetchOnWindowFocus: false
    }
  );

  if (isLoading) {
    return (
      <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
        <ActivityIndicator size="large" color={theme === "light" ? "black" : "white"} />
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
        <ThemedText>{t('error_fetching_friend_info')}: {error.message}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView lightClassName='bg-slate-300' darkClassName='bg-slate-800' style={[{ padding: 12 }, styles.safeArea]}>
      <View>
        <TouchableOpacity className="absolute z-10" onPress={() => { router.back() }}>
          <AntDesign color={theme === "light" ? "black" : "white"} name='arrowleft' size={42} />
        </TouchableOpacity>
        <ThemedText numberOfLines={1} ellipsizeMode='middle' className='pl-10 text-3xl text-center font-poppinsBold translate-y-1'>
          {friend?.nickname}
        </ThemedText>
      </View>
    </ThemedView>
  );
}
