import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { getMeals } from "../../../lib/storage";
import { Meal } from "../../../lib/type";
import { useUser } from "@clerk/clerk-expo";


export default function MealsList() {
  const [meals, setMeals] = React.useState<Meal[]>([]);
  const router = useRouter();
  const { user } = useUser();
  
  useFocusEffect(
    React.useCallback(() => {
      if (user) getMeals(user.id).then(setMeals);
    }, [user])
  );

  const renderItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/(main)/(home)/${item.id}`)}>
      <Image
        source={require("../../../assets/plate.jpg")}
        style={styles.icon}
        resizeMode="contain"
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.line}>{item.foods.length} ingredients</Text>
        <Text style={styles.line}>Kcal : {item.totalCalories.toFixed(0)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(m) => m.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F7", paddingHorizontal: 16 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  icon: { width: 48, height: 48, marginRight: 12 },
  cardContent: { flex: 1 },
  title: { fontWeight: "600", fontSize: 16, marginBottom: 4 },
  line: { fontSize: 12, color: "#555" },
});
