import { Link } from "expo-router";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "~/assets/images/icon.png";
const App = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerClassName='h-full'>
        <View className='bg-background px-4 w-full h-full flex justify-center items-center gap-4'>
          <View className='flex gap-1 flex-row items-center'>
            <Image
              source={Logo}
              className='h-12 w-12'
              resizeMode='contain'
            />
            <Text className='text-foreground text-4xl'>Live Music</Text>
          </View>
          <Text className='text-4xl font-bold text-foreground text-center'>
            Discover local, live music in your area.
          </Text>
          <Text>
            Explore upcoming events, discover new performers, find venues, and
            take control of your live experiences.
          </Text>
          <Link
            href='/home'
            asChild
          >
            <TouchableOpacity className='rounded-xl py-4 px-6 flex justify-center items-center bg-primary'>
              <Text className='text-primary-foreground'>
                Continue to Home Screen
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
