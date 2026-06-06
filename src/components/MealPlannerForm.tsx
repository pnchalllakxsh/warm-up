'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMealStore } from '@/store/meal.store'
import { useState } from 'react'
import axios from 'axios'

const schema = z.object({
  scheduleIntensity: z.string().min(3, 'Please describe your day briefly.'),
  dietaryRestrictions: z.string().min(1, 'Required'),
  budgetLimit: z.number().min(1, 'Budget must be greater than 0'),
  availableIngredients: z.string().optional(),
  fitnessGoal: z.string().min(1, 'Required'),
})

type Form = z.infer<typeof schema>

export function MealPlannerForm() {
  const { input, setInput, setLoading, setError, setMealPlan } = useMealStore()
  const [step, setStep] = useState(1)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: input,
  })

  const nextStep = async () => {
    let valid = false
    if (step === 1) valid = await trigger(['scheduleIntensity', 'fitnessGoal'])
    if (step === 2) valid = await trigger(['dietaryRestrictions', 'budgetLimit', 'availableIngredients'])
    if (valid) setStep((s) => s + 1)
  }

  const prevStep = () => setStep((s) => s - 1)

  const onSubmit = async (data: Form) => {
    setInput({ ...data, availableIngredients: data.availableIngredients || '' })
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('/api/meal-plan/generate', data)
      setMealPlan(response.data)
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.error || 'Failed to generate meal plan. Check your API key.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Plan Your Day</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Step {step} of 2
        </p>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded mt-4 overflow-hidden">
          <div
            className="bg-sky-500 h-full transition-all duration-300"
            style={{ width: step === 1 ? '50%' : '100%' }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-slate-200">
                How busy is your day?
              </label>
              <textarea
                {...register('scheduleIntensity')}
                placeholder="e.g., Working 9-5, gym in the evening, only 20 mins to cook lunch..."
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-3 bg-transparent dark:text-white focus:ring-2 focus:ring-sky-500 outline-none h-28"
              />
              {errors.scheduleIntensity && (
                <p className="text-sm text-red-500 mt-1">{errors.scheduleIntensity.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-slate-200">
                Fitness Goal
              </label>
              <select
                {...register('fitnessGoal')}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-3 bg-transparent dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
              >
                <option value="Maintenance">Maintenance</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="High Energy">High Energy</option>
              </select>
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="w-full py-3 rounded-lg bg-slate-900 dark:bg-sky-500 text-white font-medium hover:bg-slate-800 dark:hover:bg-sky-600 transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-slate-200">
                Dietary Restrictions
              </label>
              <select
                {...register('dietaryRestrictions')}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-3 bg-transparent dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
              >
                <option value="None">None</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Keto">Keto</option>
                <option value="Gluten-Free">Gluten-Free</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-slate-200">
                Daily Budget Limit ($)
              </label>
              <input
                type="number"
                {...register('budgetLimit', { valueAsNumber: true })}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-3 bg-transparent dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
              />
              {errors.budgetLimit && (
                <p className="text-sm text-red-500 mt-1">{errors.budgetLimit.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-slate-200">
                Available Pantry Ingredients
              </label>
              <textarea
                {...register('availableIngredients')}
                placeholder="e.g., Rice, 2 eggs, some leftover chicken..."
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-3 bg-transparent dark:text-white focus:ring-2 focus:ring-sky-500 outline-none h-20"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-lg bg-sky-500 text-white font-medium hover:bg-sky-600 transition-colors"
              >
                Generate Plan
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
