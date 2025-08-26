import { View, TouchableOpacity } from 'react-native';
import { Bot, Camera, BookImage } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export default function BottomBar() {
  const { colorScheme } = useColorScheme();
  return (
    <View className="absolute bottom-0 w-full flex-row items-center justify-around border-t border-accentLight bg-lightBg p-4 dark:bg-darkBg">
      <TouchableOpacity>
        <BookImage size={28} color={colorScheme === 'dark' ? '#9DC183' : '#228B22'} />
      </TouchableOpacity>
      <TouchableOpacity className="-translate-y-3/4">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-accent shadow-lg">
          <Camera size={40} color={colorScheme === 'dark' ? '#121212' : '#F5F5F5'} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <Bot size={28} color={colorScheme === 'dark' ? '#9DC183' : '#228B22'} />
      </TouchableOpacity>
    </View>
  );
}
