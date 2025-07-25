import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "./type";

const key = (uid: string) => `meals_${uid}`;

export const getMeals = async (uid: string): Promise<Meal[]> => {
  const raw = await AsyncStorage.getItem(key(uid));
  return raw ? (JSON.parse(raw) as Meal[]) : [];
};

export const saveMeals = (uid: string, meals: Meal[]) =>
  AsyncStorage.setItem(key(uid), JSON.stringify(meals));

export const addMeal = async (uid: string, meal: Meal) => {
  const meals = await getMeals(uid);
  await saveMeals(uid, [...meals, meal]);
};

export const deleteMeal = async (uid: string, id: string) => {
  const meals = await getMeals(uid);
  await saveMeals(uid, meals.filter((m) => m.id !== id));
};
