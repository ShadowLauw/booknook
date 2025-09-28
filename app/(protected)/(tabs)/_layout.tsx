import { Tabs } from "expo-router";
import {
  BookOpenIcon,
  HomeIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import colors from "tailwindcss/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        animation: "none",
        headerShown: true,
        tabBarActiveTintColor: colors.amber[500],
        tabBarShowLabel: true,
        headerStyle: { backgroundColor: colors.amber[500] },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <HomeIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "My collections",
          tabBarIcon: ({ color }) => <BookOpenIcon size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "My account",
          tabBarIcon: ({ color }) => <UserIcon size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
