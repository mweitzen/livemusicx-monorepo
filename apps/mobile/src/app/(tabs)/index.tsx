import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "~/components/HelloWave";
import { MobileAuth } from "~/components/MobileAuth";
import ParallaxScrollView from "~/components/ParallaxScrollView";
import { ThemedText } from "~/components/ThemedText";
import { ThemedView } from "~/components/ThemedView";
import { api } from "~/utils/api";

export default function HomeScreen() {
  const { data: events, status } = api.events.getUpcoming.useQuery();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("../../assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>Step 1: Try it</ThemedText>
        {events ? (
          events.map((event) => (
            <ThemedText key={event.id}>{event.name}</ThemedText>
          ))
        ) : status === "pending" ? (
          <ThemedText>Loading.....</ThemedText>
        ) : (
          <ThemedText>Nothing</ThemedText>
        )}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>Step 2: Explore</ThemedText>
        <MobileAuth />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type='defaultSemiBold'>npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type='defaultSemiBold'>app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type='defaultSemiBold'>app</ThemedText> to{" "}
          <ThemedText type='defaultSemiBold'>app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
