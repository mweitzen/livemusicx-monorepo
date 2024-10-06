import "@repo/ui/styles.css";
import "react-native-reanimated";

import { useEffect } from "react";
import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { TRPCProvider } from "@repo/trpc/mobile";
import { getBaseUrl } from "~/utils/base-url";
import { getToken } from "~/utils/session-store";
import { useColorScheme } from "~/hooks/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const baseUrl = getBaseUrl();
  const token = getToken();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TRPCProvider
      baseUrl={baseUrl}
      token={token}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name='index'
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='(tabs)'
            options={{ headerShown: false }}
          />
          <Stack.Screen name='+not-found' />
        </Stack>
      </ThemeProvider>
    </TRPCProvider>
  );
}
