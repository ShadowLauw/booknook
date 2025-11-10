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
import { useEffect, useState } from "react";
import { black } from "tailwindcss/colors";
import { BookOpenIcon, HeartIcon } from "react-native-heroicons/outline";
import {
  addToLibrary,
  isBookInLibrary,
  removeFromLibrary,
} from "@/lib/userBooks";

export default function BookDetail({ book }: { book: Book }) {
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const exists = await isBookInLibrary(book.id);
        setIsAdded(exists);
      } catch (err) {
        console.error("Failed to check library:", err);
      }
    };
    fetchStatus();
  }, [book]);

  const handleToggleLibrary = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isAdded) {
        await removeFromLibrary(book.id);
        setIsAdded(false);
      } else {
        await addToLibrary(book);
        setIsAdded(true);
      }
    } catch (err) {
      console.error("Failed to toggle library:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View className="flex-1 relative">
        <ScrollView contentContainerClassName="pt-2">
          <View className="bg-gray-200 w-full absolute rounded-3xl min-h-[200vh] flex-1 top-60 p-4 z-5" />
          <View className="justify-center items-center mt-4 pb-36">
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
                {book.authors}
              </Text>
              <Rating rating={book.rating} size={24} />
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
                    <Text>{book.language}</Text>
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
                          <View className="w-1/2">
                            <Text className="font-semibold">{"Pages: "}</Text>
                            <Text>{book.n_pages}</Text>
                          </View>
                          <View className="w-1/2">
                            <Text className="font-semibold">{"ISBN: "}</Text>
                            <Text>{book.isbn}</Text>
                          </View>
                        </View>
                        <View className="flex flex-row">
                          <View className="w-1/2">
                            <Text className="font-semibold">
                              {"Publisher: "}
                            </Text>
                            <Text>{book.publisher}</Text>
                          </View>
                          <View className="w-1/2">
                            <Text className="font-semibold">
                              {"Publishing date: "}
                            </Text>
                            <Text>{book.publishing_date}</Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="flex flex-row gap-2 absolute bottom-24 z-20 p-6 py-3">
          <TouchableOpacity
            onPress={handleToggleLibrary}
            className={`flex-1 flex-row items-center justify-center gap-2 ${isAdded ? "bg-red-500" : "bg-amber-500"} p-3 rounded-xl`}
          >
            <Text className="text-white font-semibold text-center">
              {isAdded ? "Remove from library" : "Add to library"}
            </Text>
            <BookOpenIcon size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
