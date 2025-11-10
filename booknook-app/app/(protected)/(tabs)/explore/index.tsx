import BookHorizontalSummary from "@/components/BookHorizontalSummary";
import BookRecommend from "@/components/BookRecommend";
import { Searchbar } from "@/components/Searchbar";
import { searchBooks } from "@/lib/googleBooks";
import { getUserLibrary } from "@/lib/userBooks";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loadingReco, setLoadingReco] = useState(true);
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

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoadingReco(true);

        const userBooks = await getUserLibrary();

        if (!userBooks || userBooks.length === 0) {
          setRecommended([]);
          setLoadingReco(false);
          return;
        }

        const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/recommend`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userBooks }),
          }
        );

        if (!res.ok) throw new Error("Error API recommend");
        const data = await res.json();

        setRecommended(data.recommendations || []);
      } catch (err) {
        console.error("Error reco:", err);
      } finally {
        setLoadingReco(false);
      }
    };

    fetchRecommendations();
  }, []);

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
              router.push(
                `/explore/search?query=${encodeURIComponent(searchQuery)}`
              );
            }
          }}
        />
        <TouchableOpacity
          onPress={() => router.push("/explore/scanner")}
          className="flex-row items-center gap-2 bg-white p-2 rounded-md shadow-sm"
        >
          <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
          <Text className="text-base color-black">Scan</Text>
        </TouchableOpacity>
      </View>

      {results.length > 0 && (
        <View className="bg-white mt-2 rounded-md shadow-md">
          {results.map((book) => (
            <BookHorizontalSummary key={book.id} book={book} />
          ))}
        </View>
      )}
      <View className="flex-1 bg-white">
        {loadingReco ? (
          <ActivityIndicator size="small" color="#000" className="mt-4" />
        ) : recommended.length > 0 ? (
          <BookRecommend titles={recommended.map((i) => i.title)} />
        ) : (
          <Text className="text-gray-500">
            No recommendations at the moment.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
