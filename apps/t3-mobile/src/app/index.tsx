import { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import type { RouterOutputs } from "@repo/trpc";
import { api } from "@repo/trpc/mobile";
import { useSignIn, useSignOut, useUser } from "~/utils/auth";

function PostCard(props: {
  post: RouterOutputs["post"]["all"][number];
  onDelete: () => void;
}) {
  return (
    <View className='flex flex-row rounded-lg bg-muted p-4'>
      <View className='flex-grow'>
        <Link
          asChild
          href={{
            pathname: "/post/[id]",
            params: { id: props.post.id },
          }}
        >
          <Pressable className=''>
            <Text className='text-xl font-semibold text-primary'>
              {props.post.title}
            </Text>
            <Text className='mt-2 text-foreground'>{props.post.content}</Text>
          </Pressable>
        </Link>
      </View>
      <Pressable onPress={props.onDelete}>
        <Text className='font-bold uppercase text-primary'>Delete</Text>
      </Pressable>
    </View>
  );
}

function MobileAuth() {
  const user = useUser();
  const signIn = useSignIn();
  const signOut = useSignOut();

  return (
    <>
      <Text className='pb-2 text-center text-xl font-semibold text-white'>
        {user?.name ?? "Not logged in"}
      </Text>
      <Button
        onPress={() => (user ? signOut() : signIn())}
        title={user ? "Sign Out" : "Sign In With Discord"}
        color={"#5B65E9"}
      />
    </>
  );
}

export default function Index() {
  return (
    <SafeAreaView className='bg-background'>
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className='h-full w-full bg-background p-4'>
        <Text className='pb-2 text-center text-5xl font-bold text-foreground'>
          Create <Text className='text-primary'>T3</Text> Turbo
        </Text>

        <MobileAuth />

        <View className='py-2'>
          <Text className='font-semibold italic text-primary'>
            Press on a post
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
