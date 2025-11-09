import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { HeartIcon as HeartOutline } from "react-native-heroicons/outline";
import { HeartIcon as HeartSolid } from "react-native-heroicons/solid";
import {
  addToWishlist,
  removeFromWishlist,
  isBookInWishlist,
} from "@/lib/userBooks";
import type { Book } from "@/types/book";

export default function WishlistHeartButton({
  className,
  bookId,
}: {
  className?: string;
  bookId: string;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const exists = await isBookInWishlist(bookId);
        setIsFavorite(exists);
      } catch (err) {
        console.error("Failed to check wishlist:", err);
      }
    };
    fetchStatus();
  }, [bookId]);

  const handleToggleWishlist = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isFavorite) {
        await removeFromWishlist(bookId);
        setIsFavorite(false);
      } else {
        await addToWishlist(bookId);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Failed to toggle wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      onPress={handleToggleWishlist}
      className={`${className ?? ""} flex items-center justify-center`}
      disabled={loading}
    >
      {isFavorite ? (
        <HeartSolid size={24} color="white" />
      ) : (
        <HeartOutline size={24} color="white" />
      )}
    </Pressable>
  );
}
