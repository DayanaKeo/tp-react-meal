import { Food } from "./type";


const APP_ID = process.env.EXPO_PUBLIC_EDAMAM_APP_ID!;
const APP_KEY = process.env.EXPO_PUBLIC_EDAMAM_APP_KEY!;

const mapFood = (f: any): Food => ({
  id: f.food.foodId,
  name: f.food.label,
  calories: f.food.nutrients.ENERC_KCAL ?? 0,
  proteins: f.food.nutrients.PROCNT ?? 0,
  carbs: f.food.nutrients.CHOCDF ?? 0,
  fats: f.food.nutrients.FAT ?? 0,
  image: f.food.image,
});

const uniq = <T extends { id: string }>(arr: T[]) =>
  Array.from(new Map(arr.map((i) => [i.id, i])).values());

export const searchFood = async (q: string): Promise<Food[]> => {
  const url =
    `https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(q)}` +
    `&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const res  = await fetch(url);
  const json = await res.json();

  return uniq(json.hints ?? []).slice(0, 10).map(mapFood);
};

export const foodByUpc = async (code: string): Promise<Food | null> => {
  const url = `https://api.edamam.com/api/food-database/v2/parser?upc=${code}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  const mappedArray: Food[] = (json.hints ?? []).map(mapFood);
  const uniques: Food[] = Array.from(new Map(mappedArray.map((i) => [i.id, i])).values());
  return uniques.length > 0 ? uniques[0] : null;
}

