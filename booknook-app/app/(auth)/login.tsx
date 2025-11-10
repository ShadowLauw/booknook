import AuthInput from "@/components/AuthInput";
import { useAuth } from "@/context/AuthContext";
import { useAuthForm } from "@/hooks/useAuthForm";
import { loginSchema } from "@/schemas/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AtSymbolIcon, LockClosedIcon } from "react-native-heroicons/outline";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const { form, errors, handleChange, handleSubmit } = useAuthForm(
    loginSchema,
    { email: "", password: "" }
  );

  const onSubmit = async () => {
    if (!handleSubmit()) return;

    try {
      setLoading(true);
      setAuthError("");
      await signIn(form.email, form.password);
    } catch (err: any) {
      setAuthError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="p-2 pt-16 flex items-center">
      <View className="max-w-96 items-center gap-6">
        <AuthInput
          icon={<AtSymbolIcon size={24} />}
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          error={errors.email}
        />
        <AuthInput
          icon={<LockClosedIcon size={24} />}
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          error={errors.password}
          secureTextEntry={!showPassword}
          toggleSecure={() => setShowPassword(!showPassword)}
        />

        {authError && <Text className="text-red-500">{authError}</Text>}

        <TouchableOpacity
          className="bg-amber-500 py-3 px-6 w-screen max-w-full rounded-xl"
          onPress={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-bold">Login</Text>
          )}
        </TouchableOpacity>
        <Pressable onPress={() => router.replace("/register")}>
          <Text className="text-amber-800 underline">
            Don't have an account? Register
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
