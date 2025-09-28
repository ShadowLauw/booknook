import { TextInput, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

type SearchBarProps = {
  className?: string;
};

export function Searchbar({ className }: SearchBarProps) {
  return (
    <View className={`flex-row items-center relative ${className}`}>
      <TextInput
        className="bg-white w-full p-3 pl-10 rounded-md"
        placeholder="Search a title or a ISBN..."
        placeholderTextColor="rgba(128,128,128,0.5)"
      />
      <View className="absolute m-2">
        <MagnifyingGlassIcon size={24} />
      </View>
    </View>
  );
}
