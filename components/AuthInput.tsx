import { ReactNode } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";

type AuthInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: ReactNode;
  error?: string;
  secureTextEntry?: boolean;
  toggleSecure?: () => void;
};

export default function AuthInput({
  value,
  onChangeText,
  placeholder,
  icon,
  error,
  secureTextEntry,
  toggleSecure,
}: AuthInputProps) {
  return (
    <View className="w-full gap-1">
      <View className="flex-row items-center gap-3 w-full">
        {icon}
        <TextInput
          className="bg-white grow p-4 rounded-xl flex-1"
          placeholder={placeholder}
          placeholderTextColor="rgba(128,128,128,0.5)"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
        {toggleSecure && (
          <TouchableOpacity onPress={toggleSecure}>
            {secureTextEntry ? (
              <EyeSlashIcon size={24} />
            ) : (
              <EyeIcon size={24} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500">{error}</Text>}
    </View>
  );
}
