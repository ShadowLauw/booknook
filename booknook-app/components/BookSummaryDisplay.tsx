import { TouchableOpacity, View, Image, Text } from "react-native";
import Rating from "./Rating";
import { useRouter } from "expo-router";
import { Book } from "@/types/book";

export default function BookSummaryDisplay({ book }: { book: Book }) {
  const router = useRouter();
  return (
    <View className="bg-white rounded-lg shadow m-2 flex-col justify-between w-32">
      <TouchableOpacity
        className="p-2"
        onPress={() =>
          router.push({
            pathname: "/explore/[id]",
            params: { id: book.id, title: book.title },
          })
        }
      >
        <Image
          source={{ uri: book.cover }}
          className="w-full rounded-t-lg aspect-[10/16]"
        />
        <View className="pt-1">
          <Text
            className="font-bold text-sm"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {book.title}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-xs text-gray-500"
          >
            {book.authors}
          </Text>
          <Rating rating={book.rating} size={12} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
