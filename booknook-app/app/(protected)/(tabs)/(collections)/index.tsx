import BookListDisplay from "@/components/BookListDisplay";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Book } from "@/types/book";
import { getUserLibrary, getUserWishlist } from "@/lib/userBooks";

const PAGE_SIZE = 20;

export default function Collections() {
  const [tab, setTab] = useState<"wishlist" | "mybooks">("mybooks");
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [wishlistPage, setWishlistPage] = useState(0);
  const [myBooksPage, setMyBooksPage] = useState(0);
  const [hasMoreWishlist, setHasMoreWishlist] = useState(true);
  const [hasMoreLibrary, setHasMoreLibrary] = useState(true);

  useEffect(() => {
    initialFetch();
  }, []);

  const initialFetch = async () => {
    setWishlistPage(0);
    setMyBooksPage(0);
    setHasMoreLibrary(true);
    setHasMoreWishlist(true);

    setLoading(true);
    try {
      const [libraryData, wishlistData] = await Promise.all([
        getUserLibrary(0, PAGE_SIZE - 1),
        getUserWishlist(0, PAGE_SIZE - 1),
      ]);

      setMyBooks(libraryData);
      setWishlist(wishlistData);
      setWishlistPage(1);
      setMyBooksPage(1);

      if (libraryData.length < PAGE_SIZE) {
        setHasMoreLibrary(false);
      }
      if (wishlistData.length < PAGE_SIZE) {
        setHasMoreWishlist(false);
      }
    } catch (error) {
      console.error("Failed to fetch user collections:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLoadMore = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (tab === "wishlist" && hasMoreWishlist) {
        const newItems = await getUserWishlist(
          wishlistPage * PAGE_SIZE,
          (wishlistPage + 1) * PAGE_SIZE - 1
        );
        setWishlistPage((prev) => prev + 1);

        if (newItems.length < PAGE_SIZE) {
          setHasMoreWishlist(false);
        }
      } else if (hasMoreLibrary) {
        const newItems = await getUserLibrary(
          myBooksPage * PAGE_SIZE,
          (myBooksPage + 1) * PAGE_SIZE - 1
        );
        setMyBooksPage((prev) => prev + 1);

        if (newItems.length < PAGE_SIZE) {
          setHasMoreLibrary(false);
        }
      }
    } catch (error) {
      console.error("Failed to load more books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1" edges={["left", "right"]}>
      {/* Tabs Header */}
      <View className="flex-row border-b border-gray-200">
        <Pressable
          className="flex-1 items-center py-3"
          onPress={() => setTab("mybooks")}
        >
          <Text
            className={`text-md ${
              tab === "mybooks" ? "font-bold text-black" : "text-gray-400"
            }`}
          >
            My Books
          </Text>
        </Pressable>
        <Pressable
          className="flex-1 items-center py-3"
          onPress={() => setTab("wishlist")}
        >
          <Text
            className={`text-md ${
              tab === "wishlist" ? "font-bold text-black" : "text-gray-400"
            }`}
          >
            Wishlist
          </Text>
        </Pressable>
      </View>

      {/* Tab content */}
      <View className="flex-1">
        <BookListDisplay
          data={tab === "wishlist" ? wishlist : myBooks}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          loading={loading}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            initialFetch();
          }}
        />
      </View>
    </SafeAreaView>
  );
}
