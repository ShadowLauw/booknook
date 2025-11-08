import WishlistHeartButton from "@/components/WishlistHeartButton";
import { Stack } from "expo-router";
import { Button, View } from "react-native";
import { HeartIcon as HeartOutline } from "react-native-heroicons/outline";
import { HeartIcon as HeartSolid } from "react-native-heroicons/solid";
import colors, { black } from "tailwindcss/colors";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.amber[500] },
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerBackButtonMenuEnabled: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen
        name="[id]"
        options={({ route }) => ({
          title:
            (route.params as { id: string; title: string })?.title ??
            "Title not found",
          headerBackButtonDisplayMode: "minimal",
          headerRight: () => (
            <WishlistHeartButton className="py-2 h-max w-10 flex items-center justify-center" />
          ),
        })}
      />
      <Stack.Screen name="search" options={{ title: "Search" }} />
    </Stack>
  );
}
