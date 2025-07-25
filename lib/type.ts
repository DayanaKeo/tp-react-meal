export interface Food {
    id: string;
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    image?: string;
  }
  
  export interface Meal {
    id: string;
    name: string;
    date: string;
    foods: Food[];
    totalCalories: number;
  }
  