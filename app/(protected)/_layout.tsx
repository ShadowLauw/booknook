import { useAuth } from "@/context/AuthContext";
import { Stack, useRouter } from "expo-router";

export default function ProtectedLayout() {
  const router = useRouter();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
