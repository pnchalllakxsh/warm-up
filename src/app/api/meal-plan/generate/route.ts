import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scheduleIntensity, dietaryRestrictions, budgetLimit, availableIngredients, fitnessGoal } = body;

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Dynamic Mock Response based on inputs
    const isVegetarian = dietaryRestrictions === 'Vegetarian' || dietaryRestrictions === 'Vegan';
    
    const mockPlan = {
      budget_analysis: {
        estimated_total: Math.max(12.50, parseFloat((budgetLimit * 0.8).toFixed(2))),
        feasibility_score: budgetLimit < 15 ? 'Low' : 'High',
        rationale: `Used your available pantry items (${availableIngredients || 'basics'}) to keep costs ${budgetLimit < 15 ? 'as low as possible' : 'well under your $' + budgetLimit + ' budget'}.`
      },
      meals: {
        breakfast: {
          name: isVegetarian ? 'Overnight Oats with Berries' : 'Egg & Turkey Bacon Wrap',
          prep_time_mins: 5,
          ingredients: isVegetarian ? ['Oats', 'Almond Milk', 'Mixed Berries'] : ['Eggs', 'Turkey Bacon', 'Tortilla'],
          instructions: ['Mix ingredients', 'Let sit or cook briefly', 'Enjoy'],
          nutrition: { protein: isVegetarian ? '12g' : '22g', carbs: '45g', fat: '10g', calories: 350 }
        },
        lunch: {
          name: isVegetarian ? 'Quinoa & Black Bean Salad' : 'Chicken & Quinoa Salad',
          prep_time_mins: 15,
          ingredients: isVegetarian ? ['Quinoa', 'Black Beans', 'Corn', 'Lime'] : ['Chicken Breast', 'Quinoa', 'Spinach'],
          instructions: ['Chop ingredients', 'Mix with dressing', 'Serve cold'],
          nutrition: { protein: isVegetarian ? '18g' : '35g', carbs: '55g', fat: '15g', calories: 450 }
        },
        dinner: {
          name: isVegetarian ? 'Tofu Stir-fry with Broccoli' : 'Salmon with Roasted Veggies',
          prep_time_mins: 20,
          ingredients: isVegetarian ? ['Tofu', 'Broccoli', 'Soy Sauce', 'Rice'] : ['Salmon Filet', 'Broccoli', 'Olive Oil', 'Rice'],
          instructions: ['Preheat oven/pan', 'Cook protein', 'Steam/roast veggies', 'Serve over rice'],
          nutrition: { protein: isVegetarian ? '25g' : '40g', carbs: '40g', fat: '18g', calories: 550 }
        }
      },
      grocery_list: [
        { item: isVegetarian ? 'Tofu' : 'Salmon', category: 'Protein', substitution: isVegetarian ? 'Tempeh' : 'Chicken Breast', estimatedCost: 6.50 },
        { item: 'Broccoli', category: 'Produce', substitution: 'Cauliflower', estimatedCost: 2.00 },
        { item: 'Quinoa', category: 'Pantry', substitution: 'Brown Rice', estimatedCost: 4.00 }
      ],
      todoList: [
        { id: '1', time: '08:00', task: 'Prepare breakfast', completed: false },
        { id: '2', time: '12:30', task: 'Assemble lunch salad', completed: false },
        { id: '3', time: '18:00', task: 'Chop veggies for dinner', completed: false },
        { id: '4', time: '18:15', task: 'Cook dinner protein', completed: false }
      ]
    };

    return NextResponse.json(mockPlan);

  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
