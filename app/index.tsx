import { ActivityIndicator, View } from 'react-native'

const StartPage = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={100} />
    </View>
  )
}

export default StartPage
