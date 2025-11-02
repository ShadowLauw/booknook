import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";
import {
  BookOpenIcon,
  HomeIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import colors from "tailwindcss/colors";

export default function TabLayout() {
  return (
    <NativeTabs iconColor={colors.amber[500]}>
      <NativeTabs.Trigger name="(home)">
        {Platform.select({
          ios: <Icon sf="house" />,
          android: <Icon src={<HomeIcon size={24} />} />,
        })}
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="collections">
        {Platform.select({
          ios: <Icon sf="book" />,
          android: <Icon src={<BookOpenIcon size={24} />} />,
        })}
        <Label>Collections</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="account">
        {Platform.select({
          ios: <Icon sf="person" />,
          android: <Icon src={<UserIcon size={24} />} />,
        })}
        <Label>Account</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
