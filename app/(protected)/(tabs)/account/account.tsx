import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

export default function Account() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (err: any) {
      Alert.alert("Logout failed", err.message || "Unknown error");
    }
  };

  return (
    <View className="p-2 pt-16 flex-1 items-center bg-white">
      <View className="max-w-96 w-full items-center gap-6">
        <View className="w-full p-4 bg-gray-100 rounded-xl">
          <Text className="text-gray-600 font-semibold">Username</Text>
          <Text className="text-gray-800">{user?.username || "N/A"}</Text>
        </View>

        <View className="w-full p-4 bg-gray-100 rounded-xl">
          <Text className="text-gray-600 font-semibold">Email</Text>
          <Text className="text-gray-800">{user?.email || "N/A"}</Text>
        </View>

        <TouchableOpacity
          className="bg-red-500 py-3 px-6 w-full rounded-xl mt-4"
          onPress={handleLogout}
        >
          <Text className="text-white text-center font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
