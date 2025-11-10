import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { MagnifyingGlassIcon, PlusIcon } from "react-native-heroicons/outline";
import colors from "tailwindcss/colors";

export default function CollectionsLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.amber[500] },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{ title: "My collections" }} />
    </Stack>
  );
}
