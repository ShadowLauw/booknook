import { Book } from "@/types/book";
import { useRouter } from "expo-router";
import { TouchableOpacity, Text, Image, View } from "react-native";

export default function BookHorizontalSummary({ book }: { book: Book }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/[id]",
          params: { id: book.id, title: book.title },
        })
      }
      className="p-2 border-b border-neutral-500 flex flex-row gap-4"
    >
      <Image
        source={{ uri: book.cover }}
        className="w-12 rounded-t-lg aspect-[10/16]"
      />
      <View className="flex-1">
        <Text numberOfLines={3} ellipsizeMode="tail" className="font-medium">
          {book.title}
        </Text>
        <Text className="text-gray-500 text-sm">{book.author}</Text>
      </View>
    </TouchableOpacity>
  );
}
