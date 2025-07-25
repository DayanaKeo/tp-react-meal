// app/(main)/_layout.tsx
import { Tabs, Redirect } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";


export default function MainLayout() {
  return (
    <>
      <SignedOut>
        <Redirect href="/(auth)/login" />
      </SignedOut>

      <SignedIn>
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "black" }}>
          <Tabs.Screen
            name="(home)"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="add"
            options={{
              title: "Add",
              tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
            }}
          />
        </Tabs>
      </SignedIn>
    </>
  );
}
