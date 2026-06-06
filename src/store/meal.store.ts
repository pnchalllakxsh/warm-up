import { create } from 'zustand'

export interface Meal {
  name: string
  prep_time_mins: number
  ingredients: string[]
  instructions: string[]
  nutrition: {
    protein: string
    carbs: string
    fat: string
    calories: number
  }
}

export interface GroceryItem {
  item: string
  category: string
  substitution: string
  estimatedCost: number
}

export interface TodoStep {
  id: string
  time: string
  task: string
  completed?: boolean
}

export interface MealPlan {
  budget_analysis: {
    estimated_total: number
    feasibility_score: string // "High", "Medium", "Low"
    rationale: string
  }
  meals: {
    breakfast: Meal
    lunch: Meal
    dinner: Meal
  }
  grocery_list: GroceryItem[]
  todoList: TodoStep[]
}

export interface PlannerInput {
  scheduleIntensity: string
  dietaryRestrictions: string
  budgetLimit: number
  availableIngredients: string
  fitnessGoal: string
}

interface MealStore {
  apiKey: string
  input: PlannerInput
  loading: boolean
  error: string | null
  mealPlan: MealPlan | null
  checkedGroceries: string[]
  setApiKey: (key: string) => void
  setInput: (input: PlannerInput) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setMealPlan: (plan: MealPlan | null) => void
  toggleGrocery: (item: string) => void
  toggleTodoStep: (id: string) => void
  resetPlan: () => void
}

export const useMealStore = create<MealStore>((set) => ({
  apiKey: typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') || '' : '',
  input: {
    scheduleIntensity: 'Busy day with evening workout',
    dietaryRestrictions: 'None',
    budgetLimit: 30,
    availableIngredients: 'Rice, eggs, onion',
    fitnessGoal: 'Maintenance',
  },
  loading: false,
  error: null,
  mealPlan: null,
  checkedGroceries: [],
  setApiKey: (key) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini_api_key', key)
    }
    set({ apiKey: key })
  },
  setInput: (input) => set({ input }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setMealPlan: (mealPlan) => set({ mealPlan, checkedGroceries: [] }),
  toggleGrocery: (item) =>
    set((state) => ({
      checkedGroceries: state.checkedGroceries.includes(item)
        ? state.checkedGroceries.filter((g) => g !== item)
        : [...state.checkedGroceries, item],
    })),
  toggleTodoStep: (id) =>
    set((state) => {
      if (!state.mealPlan) return state
      const updatedSteps = state.mealPlan.todoList.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step
      )
      return {
        mealPlan: {
          ...state.mealPlan,
          todoList: updatedSteps,
        },
      }
    }),
  resetPlan: () => set({ mealPlan: null, checkedGroceries: [], error: null }),
}))
