import { Stack } from "expo-router";
import { View } from "react-native";
import BottomBar from "../components/BottomBar";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="EditScreen" options={{ title: "Edit Screen" }} />
      </Stack>
      <BottomBar />
    </View>
  );
}