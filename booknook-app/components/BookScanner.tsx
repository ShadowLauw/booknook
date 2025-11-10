import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";

export default function BookScanner() {
  const router = useRouter();
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ["ean-13"],
    onCodeScanned: (codes) => {
      router.push({
        pathname: "/[id]",
        params: { id: codes[0].toString(), isbn: "true" },
      });
    },
  });

  if (device == null)
    return (
      <View className="flex flex-row gap-2">
        <ActivityIndicator />
        <Text>Loading...</Text>
      </View>
    );
  if (!hasPermission) return <Text>Camera access refused.</Text>;

  return (
    <View className="flex-1">
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    </View>
  );
}
