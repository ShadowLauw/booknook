import { mockBooks } from "@/mock-data/books";
import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";

export default function BookDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const book = mockBooks.find((b) => b.id === id);

  if (!book) return <Text>Book not found</Text>;

  return (
    <View className="">
      <Text className="text-2xl font-bold">{book.title}</Text>
      <Image
        source={{ uri: book.cover }}
        className="w-full h-80 rounded-lg mt-4"
      />
      <Text className="mt-4 text-gray-700">
        <Text className="mt-4 text-gray-700">{book.summary}</Text>
      </Text>
    </View>
  );
}
