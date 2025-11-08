import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Book } from "@/types/book";
import { searchBooks } from "@/lib/googleBooks";
import BookSummaryDisplay from "@/components/BookSummaryDisplay";
import { Searchbar } from "@/components/Searchbar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function SearchPage() {
  const { query } = useLocalSearchParams<{ query: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);

  const router = useRouter();

  const PAGE_SIZE = 10;

  const fetchBooks = async () => {
    if (!query || loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await searchBooks(query, page * PAGE_SIZE, PAGE_SIZE);
      if (res.length < PAGE_SIZE) setHasMore(false);
      setBooks((prev) => [...prev, ...res]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBooks([]);
    setPage(0);
    setHasMore(true);
    fetchBooks();
  }, [query]);

  return (
    <View className="flex-1 w-full">
      <View className="p-3 gap-3 flex-row items-center z-10">
        <Searchbar
          className="flex-1"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={() => {
            if (searchQuery.trim()) {
              router.replace(
                `/search?query=${encodeURIComponent(searchQuery)}`
              );
            }
          }}
        />
        <TouchableOpacity className="flex-row items-center gap-2 bg-white p-2 rounded-md shadow-sm">
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
      <FlashList
        className="pb-24"
        data={books}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => <BookSummaryDisplay book={item} />}
        onEndReached={fetchBooks}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        maintainVisibleContentPosition={{ disabled: true }}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
}
