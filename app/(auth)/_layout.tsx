import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const isLoggedIn = false;

  if (isLoggedIn) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
  );
}
