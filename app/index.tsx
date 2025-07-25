import { StyleSheet, Text, View } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Index() {
  return (
    <>
      {/* <SignedIn>
        <Redirect href="/(main)/(home)" />
      </SignedIn> */}

      <SignedOut>
        <Redirect href="/(auth)/signup" />
      </SignedOut>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
