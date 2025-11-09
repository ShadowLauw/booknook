import { Stack } from "expo-router";
import { Pressable } from "react-native";
import { MagnifyingGlassIcon, PlusIcon } from "react-native-heroicons/outline";
import colors from "tailwindcss/colors";

export default function CollectionsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.amber[500] },
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerLeft: () => (
          <Pressable
            onPress={() => console.log("Open search")}
            className="p-2 rounded-full active:opacity-70"
          >
            <MagnifyingGlassIcon size={22} color="black" />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            onPress={() => console.log("Add new item")}
            className="p-2 rounded-full active:opacity-70"
          >
            <PlusIcon size={24} color="black" />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "My collections" }} />
    </Stack>
  );
}
