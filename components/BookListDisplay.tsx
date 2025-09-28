import { mockBooks } from "@/mock-data/books";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";

export default function BookListDisplay() {
  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={mockBooks}
        numColumns={2}
        columnWrapperClassName="gap-4 px-4"
        contentContainerClassName="gap-4 py-4"
        renderItem={({ item }) => (
          <View className="bg-white rounded-lg shadow flex-1">
            <Image
              source={{ uri: item.cover }}
              className="h-60 w-full rounded-t-lg p-2 pb-0"
            />
            <View className="p-2">
              <Text className="font-bold text-base">{item.title}</Text>
              <Text className="text-sm text-gray-500">{item.author}</Text>
              <Text className="text-yellow-500">{`⭐ ${item.rating}`}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
