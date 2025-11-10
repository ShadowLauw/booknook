import { mockBooks } from "@/mock-data/books";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import BookSummaryDisplay from "./BookSummaryDisplay";
import { Book } from "@/types/book";

type BookListDisplayProps = {
  data: Book[];
  onEndReached: () => void;
  onEndReachedThreshold: number;
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
};
export default function BookListDisplay({
  data,
  onEndReached,
  onEndReachedThreshold = 0.5,
  loading = false,
  refreshing,
  onRefresh,
}: BookListDisplayProps) {
  return (
    <FlashList
      refreshing={refreshing}
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={3}
      renderItem={({ item }) => <BookSummaryDisplay book={item} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-24"
      ListEmptyComponent={
        <Text className="text-center text-gray-500 mt-4">
          No books found. Pull to refresh.
        </Text>
      }
      ListFooterComponent={
        loading && !refreshing ? <ActivityIndicator /> : null
      }
    />
  );
}
