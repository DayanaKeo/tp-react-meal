import { Stack } from "expo-router";

export default function AddLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"  options={{ title: "Add" }} />
      <Stack.Screen name="camera" options={{ title: "Scan" }} />
    </Stack>
  );
}
