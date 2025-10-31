import { Book } from "@/types/book";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Rating from "./Rating";
import { HR } from "@expo/html-elements";
import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import { useState } from "react";
import { black } from "tailwindcss/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookOpenIcon, HeartIcon } from "react-native-heroicons/outline";

export default function BookDetail({ book }: { book: Book }) {
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  return (
    <>
      <View className="flex-1 relative">
        <ScrollView contentContainerClassName="pt-2 pb-12">
          <View className="bg-gray-200 w-full absolute rounded-3xl min-h-screen top-60 p-4 z-5" />
          <View className="justify-center items-center mt-4">
            <View className="shadow-lg shadow-gray-500 rounded-lg">
              <Image
                source={{ uri: book.cover }}
                style={{ width: 200, height: 300 }}
                className="rounded-lg"
              />
            </View>
            <View className="p-6">
              <Text className="text-2xl font-bold text-center">
                {book.title}
              </Text>
              <Text className="text-lg font-semibold font- text-center italic">
                {book.author}
              </Text>
              <Rating rating={book.rating} />
              <View className="mt-2 [&>*]:text-gray-700">
                <Text className="font-semibold mb-1">Summary</Text>
                <Text className="">{book.summary}</Text>
                <HR />
                <View className="flex flex-row">
                  <Text className="w-1/2">
                    <Text className="font-semibold">{"Genre: "}</Text>
                    <Text>{book.genre}</Text>
                  </Text>
                  <Text className="w-1/2">
                    <Text className="font-semibold">{"Language: "}</Text>
                    <Text>{"ENGLISH"}</Text>
                  </Text>
                </View>
                <HR />
                <Pressable onPress={() => setDetailsOpen(!detailsOpen)}>
                  <View className="bg-gray-300 p-2 rounded-2xl">
                    <View className="flex flex-row items-center gap-1">
                      <Text className="font-semibold">Details</Text>
                      {detailsOpen ? (
                        <ChevronDownIcon size={16} color={black} />
                      ) : (
                        <ChevronRightIcon size={16} color={black} />
                      )}
                    </View>
                    {detailsOpen && (
                      <View className="flex flex-col gap-2 mt-2">
                        <View className="flex flex-row">
                          <Text className="w-1/2">
                            <Text className="font-semibold">{"Pages: "}</Text>
                            <Text>{"360"}</Text>
                          </Text>
                          <Text className="w-1/2">
                            <Text className="font-semibold">{"ISBN: "}</Text>
                            <Text>{"2222222222222"}</Text>
                          </Text>
                        </View>
                        <View className="flex flex-row">
                          <Text className="w-1/2">
                            <Text className="font-semibold">
                              {"Publisher: "}
                            </Text>
                            <Text>{"Random Publishing LLC"}</Text>
                          </Text>
                          <Text className="w-1/2">
                            <Text className="font-semibold">
                              {"Publishing date: "}
                            </Text>
                            <Text>{"2025-10-01"}</Text>
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="flex flex-row gap-2 absolute bottom-0 z-20 p-6 pb-4">
          <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 bg-amber-500 p-3 rounded-xl">
            <Text className="text-white font-semibold text-center">
              Add to wishlist
            </Text>
            <HeartIcon size={20} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 bg-red-500 p-3 rounded-xl">
            <Text className="text-white font-semibold text-center">
              Add to collection
            </Text>
            <BookOpenIcon size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView className="bg-gray-200" />
    </>
  );
}
