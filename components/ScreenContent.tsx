import { Text, View } from 'react-native';

import { EditScreenInfo } from './EditScreenInfo';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View className="items-center flex-1 justify-center bg-lightBg dark:bg-darkBg">
      <Text className="text-xl font-bold text-lightText dark:text-darkText">{title}</Text>
      <View className="h-[1px] my-7 w-4/5 bg-accentBrown" />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};
