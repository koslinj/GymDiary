import React from 'react'
import { ThemedText, ThemedView } from '../ThemedComponents'
import { Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';

export const UploadFile = ({file, setFile}) => {

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  return (
    <ThemedView className='items-center'>
      <ThemedView className='flex w-40 h-40 rounded-full border-2 dark:border-white overflow-hidden'>
        {file ? (
          <Image source={{ uri: file.uri }} style={{ flexGrow: 1 }} />
        ) : (
          <TouchableOpacity
            className="flex-grow justify-center"
            onPress={pickImage}
          >
            <ThemedText className="text-lg text-center opacity-40">Pick an image</ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>
      {file && (
        <TouchableOpacity
          className="bg-red-500 w-14 h-14 border-2 -mt-6 dark:border-white rounded-full items-center justify-center"
          onPress={() => setFile(null)}
        >
          <AntDesign name="close" size={40} color="black" />
        </TouchableOpacity>
      )}
    </ThemedView>
  )
}