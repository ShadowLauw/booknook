import BookDetail from "@/components/BookDetail";
import WishlistHeartButton from "@/components/WishlistHeartButton";
import { getBook } from "@/lib/googleBooks";
import { Book } from "@/types/book";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

export default function BookDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<Book | undefined>(undefined);
  const navigation = useNavigation();

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

  useEffect(() => {
    if (!book || !id) return;
    navigation.setOptions({
      title: book.title ?? "Book details",
      headerBackButtonDisplayMode: "minimal",
      headerRight: () => (
        <WishlistHeartButton
          book={book}
          className="py-2 h-max w-10 flex items-center justify-center"
        />
      ),
    });
  }, [navigation, id, book]);

  if (book === undefined) return <ActivityIndicator />;
  return <BookDetail book={book} />;
}
