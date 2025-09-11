import { useAuth } from "@/context/AuthContext";
import { Stack, useRouter } from "expo-router";

export default function ProtectedLayout() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // Seems like the guard doesn't automatically reroute if I try to access directly with the url
  if (!isLoggedIn) return router.replace("/(auth)/login");

  return <Stack screenOptions={{ headerShown: false }} />;
}
