import { Stack } from "expo-router";
import colors from "tailwindcss/colors";

export default function AccountLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.amber[500] },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="account" options={{ title: "My account" }} />
    </Stack>
  );
}
