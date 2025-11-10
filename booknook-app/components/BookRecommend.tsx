import { getBookByTitle } from "@/lib/googleBooks";
import { Book } from "@/types/book";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Image, Text, View } from "react-native";

export default function BookRecommend({ titles }: { titles: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await Promise.all(
          titles.map((title) => getBookByTitle(title))
        );
        setBooks(fetchedBooks.filter(Boolean));
      } catch (err) {
        console.error("Error fetching recommended books:", err);
      }
    };

    if (titles && titles.length > 0) {
      fetchBooks();
    }
  }, [titles]);

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/explore/[id]",
              params: { id: item.id, title: item.title },
            })
          }
          className="flex-row bg-white rounded-xl shadow p-3 my-2"
        >
          <Image
            source={{ uri: item.cover }}
            className="w-20 h-28 rounded-md"
          />

          <View className="flex-1 ml-3 justify-start">
            <Text className="text-lg font-bold mb-1">
              {item.title || "Untitled"}
            </Text>
            {item.authors && (
              <Text className="text-gray-500 mb-1">{item.authors}</Text>
            )}
            {item.summary && (
              <Text
                className="text-gray-700 text-sm"
                numberOfLines={5}
                ellipsizeMode="tail"
              >
                {item.summary}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingBottom: 12 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
