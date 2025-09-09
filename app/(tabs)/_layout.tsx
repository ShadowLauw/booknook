import { Redirect, Tabs } from "expo-router";

export default function TabLayout() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          //TODO ICON
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "My booknook",
          //TODO ICON
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "My account",
          //TODO ICON
        }}
      />
    </Tabs>
  );
}
