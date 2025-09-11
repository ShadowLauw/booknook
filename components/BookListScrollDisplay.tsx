import { useRouter } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { neutral } from "tailwindcss/colors";
import Rating from "./Rating";

type Book = {
  id: string;
  cover: string;
  title: string;
  author: string;
  rating: number;
};

export default function BookListScrollDisplay({ data }: { data: Book[] }) {
  const router = useRouter();

  return (
    <View className="h-fit flex">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        contentContainerClassName="p-2"
        renderItem={({ item }) => (
          <View className="bg-white rounded-lg shadow m-2 w-44 flex-col justify-between">
            <TouchableOpacity
              className="p-2"
              onPress={() => router.push(`/book/${item.id}`)}
            >
              <Image
                source={{ uri: item.cover }}
                className="h-56 w-full rounded-t-lg"
              />
              <View className="pt-1">
                <Text
                  className="font-bold text-sm"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </Text>
                <Text className="text-xs text-gray-500">{item.author}</Text>
                <Rating rating={item.rating} />
              </View>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View className="bg-neutral-300 rounded-lg shadow m-2 w-44 flex-1">
            <TouchableOpacity className="flex-1 items-center justify-center">
              <Text className="text-neutral-400 text-xl font-bold">
                See More
              </Text>

              <ChevronRightIcon
                size={64}
                className="m-4"
                color={neutral[400]}
              />
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}
