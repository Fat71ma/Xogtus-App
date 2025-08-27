import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Trash } from "lucide-react-native";
import ImageViewing from "react-native-image-viewing";

export default function EditScreen() {
  const { imageUris } = useLocalSearchParams<{ imageUris?: string }>();
  const [photos, setPhotos] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const numColumns = 3; // 3 photos per row
  const imageSize = Dimensions.get("window").width / numColumns - 12;

  // Load saved photos
  const loadPhotos = async () => {
    try {
      const stored = await AsyncStorage.getItem("savedPhotos");
      if (stored) setPhotos(JSON.parse(stored));
    } catch (error) {
      console.log("Error loading photos:", error);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, [imageUris]);

  // Delete a photo
  const deletePhoto = async (uri: string) => {
    try {
      const updated = photos.filter((photo) => photo !== uri);
      setPhotos(updated);
      await AsyncStorage.setItem("savedPhotos", JSON.stringify(updated));
    } catch (error) {
      console.log("Error deleting photo:", error);
    }
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View className="relative m-1">
      <TouchableOpacity
        onPress={() => {
          setSelectedIndex(index);
          setVisible(true);
        }}
      >
        <Image
          source={{ uri: item }}
          style={{ width: imageSize, height: imageSize, borderRadius: 8 }}
        />
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        onPress={() => deletePhoto(item)}
        className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
      >
        <Trash size={16} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-lightBg dark:bg-darkBg p-3">
      <Text className="text-xl font-bold text-accent dark:text-accentLight mb-4 text-center">
        My Gallery
      </Text>

      {photos.length > 0 ? (
        <FlatList
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text className="text-lightText dark:text-darkText text-center">
          No saved photos yet.
        </Text>
      )}

      {/* Fullscreen viewer */}
      <ImageViewing
        images={photos.map((uri) => ({ uri }))}
        imageIndex={selectedIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
}
