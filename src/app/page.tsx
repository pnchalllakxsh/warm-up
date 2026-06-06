'use client'

import { MealPlannerForm } from '@/components/MealPlannerForm'
import { MealPlanDashboard } from '@/components/MealPlanDashboard'
import { useMealStore } from '@/store/meal.store'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  const { mealPlan, loading } = useMealStore()

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h1 className="font-bold text-lg dark:text-white">Kitchen Copilot</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 pt-10">
        {!mealPlan && !loading && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Your AI Kitchen Assistant
              </h2>
              <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
                Tell us about your day, budget, and pantry. We'll handle the rest.
              </p>
            </div>
            <MealPlannerForm />
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
              Crafting your perfect day...
            </p>
            <p className="text-sm text-slate-400 mt-2">Analyzing pantry & optimizing budget</p>
          </div>
        )}

        {mealPlan && !loading && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <MealPlanDashboard />
          </div>
        )}
      </div>
    </main>
  )
}
