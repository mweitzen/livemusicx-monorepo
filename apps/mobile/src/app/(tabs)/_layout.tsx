import { Tabs, Redirect } from "expo-router";

import { TabBarIcon } from "~/components/navigation/TabBarIcon";
import { Colors } from "~/constants/Colors";
import { useColorScheme } from "~/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "globe" : "globe-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='bookmarks'
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "bookmarks" : "bookmarks-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='tickets'
        options={{
          title: "Tickets",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "ticket" : "ticket-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
