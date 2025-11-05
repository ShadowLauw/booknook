import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";
import { orange } from "tailwindcss/colors";

type RatingProps = {
  rating: number;
};

export default function Rating({ rating }: RatingProps) {
  const starFull = Math.floor(rating);
  const starHalf = Math.round(rating % 1);
  const starEmpty = 5 - starFull - starHalf;

  return (
    <View className="flex-row items-center">
      {[...Array(starFull)].map((_, i) => (
        <MaterialCommunityIcons
          key={`full-${i}`}
          name="star"
          color={orange[400]}
          size={16}
        />
      ))}
      {starHalf === 1 && (
        <MaterialCommunityIcons
          name="star-half-full"
          color={orange[400]}
          size={16}
        />
      )}
      {[...Array(starEmpty)].map((_, i) => (
        <MaterialCommunityIcons
          key={`empty-${i}`}
          name="star-outline"
          color={orange[400]}
          size={16}
        />
      ))}
      <Text className="px-1 text-orange-400 text-sm">
        ({rating.toFixed(1)})
      </Text>
    </View>
  );
}
