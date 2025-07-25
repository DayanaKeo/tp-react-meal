import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Stack, Redirect } from "expo-router";

export default function AuthLayout() {
  return (
    <>
      <SignedIn>
        <Redirect href="/(main)" />
      </SignedIn>

      <SignedOut>
        <Stack screenOptions={{ headerShown: false }} />
      </SignedOut>
    </>
  );
}
