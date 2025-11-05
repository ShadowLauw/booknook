import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

type BackButtonProps = {
  color?: string;
  size?: number;
};

export default function BackButton({
  color = "white",
  size = 24,
}: BackButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity className="" onPress={() => router.back()}>
      <ChevronLeftIcon color={color} size={size} />
    </TouchableOpacity>
  );
}
