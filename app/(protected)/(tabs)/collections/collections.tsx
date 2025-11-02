import BookListDisplay from "@/components/BookListDisplay";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Collections() {
  const [tab, setTab] = useState<"wishlist" | "mybooks">("wishlist");

  return (
    <SafeAreaView className="flex-1" edges={["left", "right"]}>
      {/* Tabs Header */}
      <View className="flex-row border-b border-gray-200">
        <Pressable
          className="flex-1 items-center py-3"
          onPress={() => setTab("wishlist")}
        >
          <Text
            className={`text-md ${tab === "wishlist" ? "font-bold text-black" : "text-gray-400"}`}
          >
            Wishlist
          </Text>
        </Pressable>
        <Pressable
          className="flex-1 items-center py-3"
          onPress={() => setTab("mybooks")}
        >
          <Text
            className={`text-md ${tab === "mybooks" ? "font-bold text-black" : "text-gray-400"}`}
          >
            My Books
          </Text>
        </Pressable>
      </View>

      {/* Tab content */}
      <View className="flex-1">
        {tab === "wishlist" ? <BookListDisplay /> : <BookListDisplay />}
      </View>
    </SafeAreaView>
  );
}
