import React from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Bot, Camera, BookImage, Clock } from "lucide-react-native"; 
import { useColorScheme } from "nativewind";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function BottomBar() {
  const { colorScheme } = useColorScheme();

  // Save photo URIs permanently
  const savePhoto = async (uri: string) => {
    try {
      const existing = await AsyncStorage.getItem("savedPhotos");
      const photos = existing ? JSON.parse(existing) : [];
      photos.push(uri);
      await AsyncStorage.setItem("savedPhotos", JSON.stringify(photos));
    } catch (error) {
      console.log("Error saving photo:", error);
    }
  };

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
      await savePhoto(uri);

      Alert.alert("Saved!", "Photo saved to gallery 📸");

      router.push({
        pathname: "/EditScreen",
        params: { imageUris: JSON.stringify([uri]) },
      });
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
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);

      for (const uri of uris) {
        await MediaLibrary.createAssetAsync(uri);
        await savePhoto(uri);
      }

      router.push({
        pathname: "/EditScreen",
        params: { imageUris: JSON.stringify(uris) },
      });
    }
  };

  // 🕒 Go to History (all saved photos)
  const goToHistory = () => {
    router.push({
      pathname: "/EditScreen",
      params: { imageUris: "[]" }, 
    });
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

      {/* 🤖 Bot Button */}
      {/* <TouchableOpacity>
        <Bot
          size={28}
          color={colorScheme === "dark" ? "#9DC183" : "#228B22"}
        />
      </TouchableOpacity> */}

      {/* 🕒 History Button */}
      <TouchableOpacity onPress={goToHistory}>
        <Clock
          size={28}
          color={colorScheme === "dark" ? "#9DC183" : "#228B22"}
        />
      </TouchableOpacity>
    </View>
  );
}
