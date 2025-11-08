import { useRouter } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { neutral } from "tailwindcss/colors";
import Rating from "./Rating";
import { Book } from "@/types/book";
import BookSummaryDisplay from "./BookSummaryDisplay";

export default function BookListScrollDisplay({ data }: { data: Book[] }) {
  const router = useRouter();

  return (
    <View className="h-fit flex">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        contentContainerClassName="p-2"
        renderItem={({ item }) => <BookSummaryDisplay book={item} />}
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
