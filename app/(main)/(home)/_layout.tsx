// app/(main)/(home)/_layout.tsx
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      
      <Stack.Screen
        name="index"
        options={{ title: "Mes recettes" }}
      />
      
      <Stack.Screen
        name="[id]"
        options={{ title: "Détails" }}
      />
    </Stack>
  );
}
