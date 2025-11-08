import { TextInput, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { black, gray } from "tailwindcss/colors";

type SearchBarProps = {
  className?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
};

export function Searchbar({
  className,
  value,
  onChangeText,
  onSubmit,
}: SearchBarProps) {
  return (
    <View className={`flex-row items-center relative ${className}`}>
      <TextInput
        className="bg-white w-full p-3 px-10 rounded-md"
        placeholder="Search a title or a ISBN..."
        placeholderTextColor="rgba(128,128,128,0.5)"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      <View className="absolute m-2">
        <MagnifyingGlassIcon color={black} size={24} />
      </View>
      {value && (
        <TouchableOpacity
          onPress={() => onChangeText("")}
          className="absolute m-2 right-0"
        >
          <XMarkIcon color={gray[500]} size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
}
