import BookDetail from "@/components/BookDetail";
import { mockBooks } from "@/mock-data/books";
import { Book } from "@/types/book";
import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";

export default function BookDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const book = mockBooks.find((b) => b.id === id);

  if (!book) return <Text>Book not found</Text>;

  return <BookDetail book={book} />;
}
