'use client'

import { useMealStore } from '@/store/meal.store'
import { useState } from 'react'

export function MealPlanDashboard() {
  const { mealPlan, checkedGroceries, toggleGrocery, toggleTodoStep, resetPlan } = useMealStore()
  const [activeTab, setActiveTab] = useState<'meals' | 'groceries' | 'cookmode'>('meals')

  if (!mealPlan) return null

  const meals = [
    { type: 'Breakfast', data: mealPlan.meals.breakfast },
    { type: 'Lunch', data: mealPlan.meals.lunch },
    { type: 'Dinner', data: mealPlan.meals.dinner },
  ]

  return (
    <div className="max-w-3xl mx-auto pb-20">
      {/* Top Bar / Budget Summary */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Daily Plan</h2>
            <p className="text-sm text-slate-500 mt-1">{mealPlan.budget_analysis.rationale}</p>
          </div>
          <button onClick={resetPlan} className="text-sm text-sky-500 font-medium hover:underline">
            Start Over
          </button>
        </div>
        <div className="mt-6 flex items-center justify-between border-t dark:border-slate-700 pt-4">
          <div>
            <p className="text-sm text-slate-500">Estimated Cost</p>
            <p className="text-2xl font-bold text-emerald-500">${mealPlan.budget_analysis.estimated_total}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Feasibility</p>
            <p className="font-semibold dark:text-white">{mealPlan.budget_analysis.feasibility_score}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl mb-6">
        {['meals', 'groceries', 'cookmode'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
              activeTab === tab
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.replace('cookmode', 'Cook Mode')}
          </button>
        ))}
      </div>
      {/* Tab Content: Meals */}
      {activeTab === 'meals' && (
        <div className="space-y-6">
          {meals.map((meal) => (
            <div key={meal.type} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{meal.type}</h3>
                <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">
                  {meal.data.prep_time_mins} mins
                </span>
              </div>
              <p className="font-medium text-lg text-slate-700 dark:text-slate-200 mb-4">{meal.data.name}</p>
              
              <div className="grid grid-cols-4 gap-2 mb-6">
                <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg text-center">
                  <p className="text-[10px] uppercase text-slate-500">Cal</p>
                  <p className="font-semibold text-sm dark:text-white">{meal.data.nutrition.calories}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg text-center">
                  <p className="text-[10px] uppercase text-slate-500">Pro</p>
                  <p className="font-semibold text-sm dark:text-white">{meal.data.nutrition.protein}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg text-center">
                  <p className="text-[10px] uppercase text-slate-500">Carbs</p>
                  <p className="font-semibold text-sm dark:text-white">{meal.data.nutrition.carbs}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg text-center">
                  <p className="text-[10px] uppercase text-slate-500">Fat</p>
                  <p className="font-semibold text-sm dark:text-white">{meal.data.nutrition.fat}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2 dark:text-slate-200">Ingredients:</p>
                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  {meal.data.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Groceries */}
      {activeTab === 'groceries' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 dark:text-white">Shopping List</h3>
          <div className="space-y-4">
            {mealPlan.grocery_list.map((item, i) => {
              const isChecked = checkedGroceries.includes(item.item)
              return (
                <div key={i} className={`flex items-start gap-4 p-3 rounded-lg transition-colors ${isChecked ? 'bg-slate-50 dark:bg-slate-900 opacity-50' : 'bg-slate-50 dark:bg-slate-700/50'}`}>
                  <button 
                    onClick={() => toggleGrocery(item.item)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-slate-500'}`}
                  >
                    {isChecked && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                  </button>
                  <div className="flex-1">
                    <p className={`font-medium ${isChecked ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>{item.item}</p>
                    <p className="text-xs text-slate-500 mt-1">Cost: ~${item.estimatedCost}</p>
                    {item.substitution && (
                      <div className="mt-2 text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 p-2 rounded">
                        <span className="font-semibold">Sub:</span> {item.substitution}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Tab Content: Cook Mode */}
      {activeTab === 'cookmode' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-6 dark:text-white">Action Plan</h3>
          <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-8">
            {mealPlan.todoList.map((step) => (
              <div key={step.id} className="relative pl-6">
                <button
                  onClick={() => toggleTodoStep(step.id)}
                  className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-2 bg-white dark:bg-slate-800 transition-colors ${
                    step.completed ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 dark:border-slate-500'
                  }`}
                />
                <div className={`transition-opacity ${step.completed ? 'opacity-50' : 'opacity-100'}`}>
                  <p className="text-xs font-bold text-sky-500 mb-1">{step.time}</p>
                  <p className={`text-sm font-medium ${step.completed ? 'line-through text-slate-500' : 'text-slate-800 dark:text-white'}`}>
                    {step.task}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
