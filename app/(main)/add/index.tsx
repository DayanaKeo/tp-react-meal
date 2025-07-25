import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { nanoid } from "nanoid/non-secure";
import { searchFood } from "../../../lib/edamam";
import { addMeal } from "../../../lib/storage";
import { Food, Meal } from "../../../lib/type";

export default function AddMeal() {
  const router = useRouter();
  const { user } = useUser();
  const { food: incoming } = useLocalSearchParams<{ food?: string }>();

  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Food[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    if (incoming) {
      const f: Food = JSON.parse(incoming);
      setFoods((prev) => [...prev, f]);
      router.setParams({});
    }
  }, [incoming]);

  useEffect(() => {
    if (query.length < 2) return setResults([]);
    const t = setTimeout(() => {
      searchFood(query).then((arr) => {
        const chosen = new Set(foods.map((f) => f.id));
        const uniques = arr.filter((f) => !chosen.has(f.id));
        setResults(uniques);
      });
    }, 400);
    return () => clearTimeout(t);
  }, [query, foods]);

  const addFoodItem = (item: Food) => {
    setFoods((prev) => [...prev, item]);
    setQuery("");
    setResults([]);
  };

  const save = async () => {
    if (!user || !name || foods.length === 0) return;
    const total = foods.reduce((t, f) => t + f.calories, 0);
    const meal: Meal = {
      id: nanoid(),
      name,
      date: new Date().toISOString(),
      foods,
      totalCalories: total,
    };
    await addMeal(user.id, meal);
    router.replace("/(main)/(home)");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F5F5F7" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={results.length ? results : foods}          /* liste principale */
        keyExtractor={(item, idx) =>
          (results.length ? `res-${item.id}` : `sel-${item.id}`) + `-${idx}`
        }
        renderItem={({ item }) =>
          results.length ? (
            <TouchableOpacity
              style={styles.result}
              onPress={() => addFoodItem(item)}
            >
              {item.image && <Image source={{ uri: item.image }} style={styles.thumb} />}
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.selItem}>
              <View style={styles.row}>
                {item.image && <Image source={{ uri: item.image }} style={styles.thumb} />}
                <Text>{item.name}</Text>
              </View>
              <Text style={styles.macro}>{item.calories.toFixed(0)} kcal</Text>
            </View>
          )
        }
        ListHeaderComponent={
          <View>
            <TextInput
              style={styles.input}
              placeholder="Recipe name"
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity
              style={styles.scanBtn}
              onPress={() => router.push("/(main)/add/camera")}
            >
              <Text style={styles.scanTxt}>Scan 📸</Text>
            </TouchableOpacity>
  
            <TextInput
              style={styles.input}
              placeholder="Search food"
              value={query}
              onChangeText={setQuery}
            />
  
            {/* espace après header */}
            <View style={{ height: 8 }} />
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.saveBtn} onPress={save}>
            <Text style={styles.saveTxt}>Create Recipe</Text>
          </TouchableOpacity>
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  scanBtn: {
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 16,
  },
  scanTxt: { color: "#fff", fontWeight: "600" },
  result: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  thumb: { width: 28, height: 28, borderRadius: 14 },
  selItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 1,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  macro: { color: "#555", fontSize: 12 },
  saveBtn: {
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 14,
  },
  saveTxt: { color: "#fff", fontWeight: "600" },
});
