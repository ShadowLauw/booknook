import { Text, View } from "react-native";

export default function Collection() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>My Collection</Text>

      <View className="flex gap-4">
        <View className="size-40 bg-white rounded-xl shadow"></View>
        <View className="size-40 bg-white rounded-xl drop-shadow"></View>
      </View>
    </View>
  );
}
