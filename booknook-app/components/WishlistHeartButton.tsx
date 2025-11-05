import { useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { HeartIcon as HeartOutline } from "react-native-heroicons/outline";
import { HeartIcon as HeartSolid } from "react-native-heroicons/solid";

export default function WishlistHeartButton({
  className,
}: {
  className: string;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Pressable onPress={() => setIsFavorite(!isFavorite)} className={className}>
      {isFavorite ? (
        <HeartSolid size={24} color="white" />
      ) : (
        <HeartOutline size={24} color="white" />
      )}
    </Pressable>
  );
}
