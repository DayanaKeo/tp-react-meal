import * as SecureStore from "expo-secure-store";

export const tokenCache = {
  getToken: () => SecureStore.getItemAsync("clerk_token"),
  saveToken: (value: string) => SecureStore.setItemAsync("clerk_token", value),
};
