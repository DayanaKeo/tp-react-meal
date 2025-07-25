import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter, Link } from "expo-router";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;
    try {
      const res = await signIn.create({ identifier: emailAddress, password });
      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId });
        router.replace("/(main)/(home)");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bienvenue</Text>
      <Text style={styles.subtitle}>Connectez‑vous pour continuer</Text>

      <TextInput
        style={styles.input}
        placeholder="Adresse e‑mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={emailAddress}
        onChangeText={setEmailAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <View style={styles.linkRow}>
        <Text style={styles.linkLabel}>Pas encore de compte ?</Text>
        <Link href="/signup" style={styles.link}>
          S’inscrire
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fefefe" },
  heading: { fontSize: 32, fontWeight: "bold", marginBottom: 4, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 32, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  linkRow: { flexDirection: "row", justifyContent: "center", gap: 4 },
  linkLabel: { color: "#555" },
  link: { color: "#000", fontWeight: "600" },
});
