import { ThemedView } from "@/components/ThemedComponents";
import { useColor } from "@/hooks/useColor";
import { FC, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity } from "react-native";

interface Props {
  uri: string
  size: "ICON" | "BIG"
}

export const ProfilePhoto: FC<Props> = ({uri, size}) => {
  const [loading, setLoading] = useState(true)

  let wh = "w-20 h-20"
  if(size === "BIG"){
    wh = "w-44 h-44"
  }

  return (
    <ThemedView className={`overflow-hidden ${wh} rounded-full border-2 ${useColor('border-black', 'border-white')}`}>
      {uri && (
        <>
          {loading && (
            <ThemedView className='flex-grow flex justify-center items-center'>
              <ActivityIndicator
                size="large"
                color="#888888"
              />
            </ThemedView>
          )}
          <Image
            source={{ uri: `https://backend-diary-jqjw.onrender.com/images/profilePhotos/${uri}` }}
            style={{ flexGrow: loading ? 0 : 1 }}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </>
      )}
    </ThemedView>
  )
}