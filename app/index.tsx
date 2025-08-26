import "../global.css";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-lightBg dark:bg-darkBg">
      <Text className="text-xl font-bold text-accent dark:text-accentLight">
        Welcome to Xogtus-Camera-App!
      </Text>
    </View>
  );
}