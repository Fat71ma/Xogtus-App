import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";

// Welcome Screen
export function WelcomeScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-500 mb-4">
        Welcome to Xogtus Camera!
      </Text>

      <TouchableOpacity
        className="bg-blue-500 px-6 py-3 rounded-2xl shadow"
        onPress={() => navigation.navigate("Camera")}
      >
        <Text className="text-white font-semibold text-lg">Open Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

// Camera Screen
export function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-lg text-gray-700">Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-lg text-red-500">No access to camera</Text>
      </View>
    );
  }

  // Show captured photo
  if (photoUri) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Image source={{ uri: photoUri }} style={{ width: "100%", height: "100%" }} />
        <TouchableOpacity
          className="absolute bottom-10 bg-blue-500 px-6 py-3 rounded-full"
          onPress={() => setPhotoUri(null)}
        >
          <Text className="text-white font-semibold text-lg">Retake</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Live camera preview
  return (
    <View className="flex-1 bg-black">
      <Camera ref={cameraRef} style={{ flex: 1 }} type={Camera.Constants.Type.back} />
      <TouchableOpacity
        className="absolute bottom-10 self-center bg-blue-500 px-6 py-3 rounded-full"
        onPress={async () => {
          if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setPhotoUri(photo.uri);
          }
        }}
      >
        <Text className="text-white font-semibold text-lg">Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
}