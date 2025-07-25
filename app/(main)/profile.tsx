import { useAuth, useUser } from "@clerk/clerk-expo";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Profile() {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.email}>Bonjour {user?.primaryEmailAddress?.emailAddress}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
        <Text style={styles.btnTxt}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#F5F5F7" },
  email: { textAlign: "center", marginBottom: 24, fontSize: 14, color: "#555" },
  btn: { alignSelf: "center" },
  btnTxt: { color: "crimson", fontWeight: "600", fontSize: 16 },
});
