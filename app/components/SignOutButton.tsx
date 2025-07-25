// src/components/SignOutButton.tsx  (en dehors de app/)
import { useAuth } from "@clerk/clerk-expo";
import { Button } from "react-native";

export default function SignOutButton() {
  const { signOut } = useAuth();
  return <Button title="Se déconnecter" onPress={() => signOut()} />;
}
