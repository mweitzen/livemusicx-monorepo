import { Text, View } from "react-native";

import { api } from "~/utils/api";

export default function HomeScreen() {
  // const { data: events, status } = api.events.getUpcoming.useQuery();

  return (
    <View className='flex-1 justify-center items-center bg-primary'>
      <Text className='text-green-500 text-3xl'>Nothing</Text>
    </View>
  );
}
