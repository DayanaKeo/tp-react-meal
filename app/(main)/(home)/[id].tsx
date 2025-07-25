import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { getMeals, deleteMeal } from "../../../lib/storage";
import { Meal } from "../../../lib/type";

export default function MealDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useUser();
  const router = useRouter();
  const [meal, setMeal] = React.useState<Meal | null>(null);

  React.useEffect(() => {
    if (!user) return;
    getMeals(user.id).then((all) =>
      setMeal(all.find((m) => m.id === id) ?? null)
    );
  }, [id, user]);

  const remove = async () => {
    if (!user || !id) return;
    await deleteMeal(user.id, id);
    router.back();
  };

  if (!meal) return null;

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.title}>{meal.name}</Text>
        <Text style={styles.line}>{meal.foods.length} ingredients</Text>
        <Text style={styles.line}>
          Kcal : {meal.totalCalories.toFixed(0)}
        </Text>
      </View>

      <Text style={styles.section}>Ingredients :</Text>

      <FlatList
        data={meal.foods}
        keyExtractor={(f, idx) => `ing-${f.id}-${idx}`}
        renderItem={({ item }) => (
          <View style={styles.ingCard}>
            <Text style={styles.ingName}>{item.name}</Text>
            <View style={styles.nuts}>
              <Text style={styles.nutLine}>
                Protein : {item.proteins.toFixed(1)} g
              </Text>
              <Text style={styles.nutLine}>
                Fat : {item.fats.toFixed(1)} g
              </Text>
              <Text style={styles.nutLine}>
                Carbs : {item.carbs.toFixed(1)} g
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />

      <TouchableOpacity style={styles.delBtn} onPress={remove}>
        <Text style={styles.delTxt}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F7", padding: 16 },
  headerCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    elevation: 2,
  },
  title: { fontWeight: "600", fontSize: 18, marginBottom: 6 },
  line: { fontSize: 13, color: "#555" },
  section: { fontWeight: "600", fontSize: 16, marginBottom: 12 },
  ingCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    elevation: 1,
  },
  ingName: { fontWeight: "500", flex: 1 },
  nuts: { alignItems: "flex-end" },
  nutLine: { fontSize: 12, color: "#555" },
  delBtn: {
    backgroundColor: "crimson",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },
  delTxt: { color: "#fff", fontWeight: "600" },
});
