import BookDetail from "@/components/BookDetail";
import { getBook } from "@/lib/googleBooks";
import { mockBooks } from "@/mock-data/books";
import { Book } from "@/types/book";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

export default function BookDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<Book | undefined>(undefined);

  const fetchBook = async () => {
    if (!id) return;

    setBook(undefined);
    try {
      const res = await getBook(id);
      setBook(res);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchBook();
  }, [id]);

  if (book === undefined) return <ActivityIndicator />;
  return <BookDetail book={book} />;
}
