import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootStack />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function RootStack() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={true}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>
      {/* <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" options={{ gestureEnabled: false }} />
      </Stack.Protected> */}
    </Stack>
  );
}
