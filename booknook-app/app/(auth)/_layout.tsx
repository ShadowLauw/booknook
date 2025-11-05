import { Stack } from "expo-router";
import colors from "tailwindcss/colors";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.amber[500],
        },
        headerTintColor: colors.white,
        headerTitle: "",
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
