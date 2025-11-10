import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
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
  const cooldownActive = useRef(false);
  const SCAN_COOLDOWN = 2000;

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ["ean-13"],
    onCodeScanned: (codes) => {
      if (cooldownActive.current) return;

      cooldownActive.current = true;
      setTimeout(() => (cooldownActive.current = false), SCAN_COOLDOWN);
      router.push({
        pathname: "/[id]",
        params: { id: codes[0].value!, isbn: "true" },
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
