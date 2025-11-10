import BookHorizontalSummary from "@/components/BookHorizontalSummary";
import BookListScrollDisplay from "@/components/BookListScrollDisplay";
import { Searchbar } from "@/components/Searchbar";
import { searchBooks } from "@/lib/googleBooks";
import { mockBooks } from "@/mock-data/books";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const res = await searchBooks(searchQuery, 0, 3);
        setResults(res);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  return (
    <SafeAreaView
      className="flex-1 bg-amber-500"
      edges={["left", "right", "top"]}
    >
      <View className="p-3 gap-3 flex-row items-center z-10">
        <Searchbar
          className="flex-1"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={() => {
            if (searchQuery.trim()) {
              router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
            }
          }}
        />
        <TouchableOpacity
          onPress={() => router.push("/scanner")}
          className="flex-row items-center gap-2 bg-white p-2 rounded-md shadow-sm"
        >
          <MaterialCommunityIcons
            className="justify-end"
            name="barcode-scan"
            size={24}
            color="black"
          />
          <Text
            style={{ color: "rgba(128,128,128,0.5)" }}
            className="text-base"
          >
            Scan
          </Text>
        </TouchableOpacity>
      </View>
      {results.length > 0 && (
        <View className="bg-white mt-2 rounded-md shadow-md">
          {results.map((book) => (
            <BookHorizontalSummary key={book.id} book={book} />
          ))}
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="pt-2 bg-white"
      >
        {/* <Text className="font-bold text-2xl px-4">Trending</Text>
        <BookListScrollDisplay data={mockBooks} />
        <Text className="font-bold text-2xl px-4">Continue reading</Text>
        <BookListScrollDisplay data={mockBooks} />
        <Text className="font-bold text-2xl px-4">Recently added</Text>
        <BookListScrollDisplay data={mockBooks} /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
