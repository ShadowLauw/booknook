import { Platform, Pressable, Text, View } from "react-native";
import { MenuView } from "@react-native-menu/menu";
import { PlusIcon } from "react-native-heroicons/outline";
import { useRouter } from "expo-router";

export default function AddMenuButton() {
  const router = useRouter();

  return (
    <View className="absolute bottom-6 right-6 z-50">
      <MenuView
        title="Actions"
        onPressAction={({ nativeEvent }) => {
          switch (nativeEvent.event) {
            case "search":
              router.push("/search");
              break;
            case "scanner":
              router.push("/scanner");
              break;
            default:
              break;
          }
        }}
        actions={[
          {
            id: "search",
            title: "Search",
            titleColor: "#2367A2",
            image: Platform.select({
              ios: "magnifyingglass",
            }),
            imageColor: "#2367A2",
          },
          {
            id: "scanner",
            title: "Scan",
            titleColor: "#F59E0B",
            image: Platform.select({
              ios: "barcode.viewfinder",
            }),
            imageColor: "#F59E0B",
          },
        ]}
        shouldOpenOnLongPress={false}
      >
        <Pressable className="bg-amber-500 w-14 h-14 rounded-full justify-center items-center">
          <PlusIcon size={24} color="white" />
        </Pressable>
      </MenuView>
    </View>
  );
}
