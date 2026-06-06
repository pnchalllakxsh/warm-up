# Technical Specification: AI Cooking Planner Micro-App

## Hackathon Theme
Build an AI-powered micro application that generates a personalized cooking and meal planning to-do list based on a user's day, preferences, schedule, budget, and available ingredients.

### Deliverables:
* Breakfast, Lunch, and Dinner plans
* Grocery shopping list
* Ingredient substitutions
* Budget feasibility analysis
* Cooking To-Do List

---

## Product Vision: "AI Daily Kitchen Copilot"
Most meal planning applications are static. This app behaves like an AI cooking assistant that understands:
* User schedule & available cooking time
* Budget constraints
* Dietary restrictions & allergies
* Existing pantry inventory
* Fitness goals

---

## User Flow & Data Models

### 1. User Inputs
**Personal Information:**
* Diet Type: Vegetarian, Vegan, Non-Vegetarian, Keto, High Protein, Gluten Free
* Fitness Goals: Weight Loss, Muscle Gain, Maintenance, High Energy
* Daily Budget (e.g., $50 or ₹500)
* People Count

**Day Schedule:**
* Preferred cooking times for Breakfast, Lunch, and Dinner (in minutes)

**Pantry Inventory & Allergies:**
* Available ingredients (e.g., rice, onion, tomato)
* Allergies (e.g., peanuts, soy)

### 2. AI Planning Engine constraints
* **Constraint 1:** Cooking time <= available time.
* **Constraint 2:** Stay within budget.
* **Constraint 3:** Avoid allergies.
* **Constraint 4:** Match diet strictly.
* **Constraint 5:** Prioritize pantry ingredients to minimize the grocery list.

### 3. AI Response Schema
The system prompts the LLM to return a structured JSON conforming to the output requirements:
* `mealPlan`: Detailed breakfast, lunch, and dinner objects (ingredients, cook time, instructions).
* `groceryList`: List of missing items with estimated costs.
* `substitutions`: Alternatives for common allergens or expensive items.
* `budgetAnalysis`: Total estimated spend, remaining budget, and status (`within_budget`, `near_limit`, `exceeds_budget`).
* `todoList`: Step-by-step cooking timeline combining all meals into an actionable checklist.

---

## Technical Stack

Since this is a Hackathon micro-app, we are prioritizing speed, clean architecture, and avoiding over-engineering while maintaining a premium UI.

### Frontend & API Layer
* **Framework:** Next.js 15 (App Router) - Handles both the UI and backend API routes.
* **Styling:** Tailwind CSS + `next-themes` (Dark/Light mode).
* **State Management:** Zustand (for global meal planner state) + React Query (for async data fetching).
* **Forms & Validation:** React Hook Form + Zod.
* **Icons:** Inline SVGs to avoid dependency bloat.

*(Note: We will bypass a heavy NestJS/PostgreSQL backend to ensure we can build a highly polished, functional prototype within the hackathon time limits. State will be managed locally/in-memory for the demo).*

### AI Integration
* **Model:** Google Gemini (e.g., Gemini 1.5/2.5 Flash).
* **Integration:** Next.js Serverless API Route calling the Gemini REST API, ensuring API keys remain secure on the backend.

---

## Extended Features (Hackathon Bonus Ideas)
If time permits, these features will serve as differentiators:
1. **Leftover Utilization Engine:** Explicitly ask the user what leftovers they have to reduce food waste.
2. **Nutrition Analyzer:** Show macro breakdowns for the generated plan.
3. **Grocery Cost Optimizer:** Highlight which ingredients are eating up the budget.
