import { Stack } from "expo-router";
import colors from "tailwindcss/colors";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.amber[500] },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Account" }} />
    </Stack>
  );
}
