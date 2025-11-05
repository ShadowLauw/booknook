import AuthInput from "@/components/AuthInput";
import { useAuth } from "@/context/AuthContext";
import { useAuthForm } from "@/hooks/useAuthForm";
import { registerSchema } from "@/schemas/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserIcon,
} from "react-native-heroicons/outline";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  const { form, errors, handleChange, handleSubmit } = useAuthForm(
    registerSchema,
    { username: "", email: "", password: "", confirmPassword: "" }
  );

  const onSubmit = async () => {
    if (!handleSubmit()) return;

    try {
      setLoading(true);
      setAuthError("");

      await signUp(form.email, form.password, form.username);

      router.replace("/");
    } catch (err: any) {
      setAuthError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="p-2 pt-16 flex items-center">
      <View className="max-w-96 items-center gap-6">
        <AuthInput
          icon={<UserIcon size={24} />}
          placeholder="Username"
          value={form.username}
          onChangeText={(text) => handleChange("username", text)}
          error={errors.username}
        />
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
        <AuthInput
          icon={<LockClosedIcon size={24} />}
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          error={errors.confirmPassword}
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
            <Text className="text-white text-center font-bold">Register</Text>
          )}
        </TouchableOpacity>
        <Pressable onPress={() => router.replace("/login")}>
          <Text className="text-amber-800 underline">
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
