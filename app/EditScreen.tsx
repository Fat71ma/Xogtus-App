import { useLocalSearchParams } from "expo-router";
import { View, Text, Image } from "react-native";

export default function EditScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri?: string }>();

  return (
    <View className="flex-1 items-center justify-center bg-lightBg dark:bg-darkBg">
      <Text className="text-xl font-bold text-accent dark:text-accentLight mb-4">
        Edit Screen
      </Text>

      {imageUri ? (
        <View className="items-center">
          <Text className="text-lightText dark:text-darkText mb-2">
            Preview:
          </Text>
          <Image
            source={{ uri: imageUri }}
            className="rounded-md"
            style={{ width: 250, height: 250 }}
          />
        </View>
      ) : (
        <Text className="text-lightText dark:text-darkText">
          No photo captured yet.
        </Text>
      )}
    </View>
  );
}