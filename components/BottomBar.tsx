import React from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Bot, Camera, BookImage } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";

export default function BottomBar() {
  const { colorScheme } = useColorScheme();

  // 📸 Open Camera
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();

    if (status !== "granted" || mediaStatus !== "granted") {
      Alert.alert("Permission denied", "Camera & storage access required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await MediaLibrary.createAssetAsync(uri);
      Alert.alert("Saved!", "Photo saved to gallery 📸");

      router.push({ pathname: "/EditScreen", params: { imageUri: uri } });
    }
  };

  // 🖼️ Open Gallery
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Gallery access required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
    
      // Save to gallery (optional)
      await MediaLibrary.createAssetAsync(uri);
    
      // Navigate to EditScreen with the photo
      router.push({ pathname: "/EditScreen", params: { imageUri: uri } });
    }
  };

  return (
    <View className="absolute bottom-0 w-full flex-row items-center justify-around border-t border-accentLight bg-lightBg p-4 dark:bg-darkBg">
      {/* 📂 Gallery Button */}
      <TouchableOpacity onPress={openGallery}>
        <BookImage
          size={28}
          color={colorScheme === "dark" ? "#9DC183" : "#228B22"}
        />
      </TouchableOpacity>

      {/* 📸 Camera Button */}
      <TouchableOpacity className="-translate-y-3/4" onPress={openCamera}>
        <View className="h-20 w-20 items-center justify-center rounded-full bg-accent shadow-lg">
          <Camera
            size={40}
            color={colorScheme === "dark" ? "#121212" : "#F5F5F5"}
          />
        </View>
      </TouchableOpacity>

      {/* 🤖 Bot Button (still empty for now) */}
      <TouchableOpacity>
        <Bot
          size={28}
          color={colorScheme === "dark" ? "#9DC183" : "#228B22"}
        />
      </TouchableOpacity>
    </View>
  );
}
