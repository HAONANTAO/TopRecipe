import React from 'react'
import { useState, useEffect } from 'react'
import { v4 as uuidV4 } from 'uuid'

import RecipeList, { Recipe } from '@/components/Recipe'
import EditorPanel from '@/components/EditorPanel'

const sampleRecipes = [
  {
    id: uuidV4(),
    name: "Plain Chicken",
    servings: 3,
    cookTime: "2:45",
    instructions: [
      "Put salt on Chicken",
      "Put chicken in oven",
      "Eat chicken"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Chicken",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Salt",
        amount: "1 Tbs"
      }
    ]
  },
  {
    id: uuidV4(),
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions: [
      "Put paprika on Pork",
      "Put pork in oven",
      "Eat pork"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  },
  {
    id: uuidV4(),
    name: "Plain Apple Pai",
    servings: 10,
    cookTime: "3:45",
    instructions: [
      "Put apples in pie",
      "Put pie in oven",
      "Eat pie"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  }
]

const App = () => {

  const [recipes, setRecipes] = useState(sampleRecipes)

  const [selectedRecipeId, setSelectedRecipeId] = useState()

  const [lastSelectedRecipeId, setLastSelectedRecipeId] = useState()

  useEffect(() => {
    console.log('selectedRecipeId: ', selectedRecipeId);
  }, [selectedRecipeId])

  useEffect(() => {
    console.log('lastSelectedRecipeId: ', lastSelectedRecipeId);
  }, [lastSelectedRecipeId])

  function handleSelectRecipe() {
    return recipes.find(recipe => recipe.id === selectedRecipeId)
  }

  function handleRecipeSelect(id) {
    if (selectedRecipeId && id !== selectedRecipeId) {
      setLastSelectedRecipeId(selectedRecipeId)
    }
    setSelectedRecipeId(id)
  }

  function handleRecipeChange(id, recipe) {
    console.log('id: ', id);
    console.log('recipe: ', recipe);
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidV4(),
      name: "Demo",
      servings: 1,
      cookTime: "1:00",
      instructions: [
        "Instruction 1",
        "Instruction 2"
      ],
      ingredients: [
        {
          id: uuidV4(),
          name: "demo",
          amount: "1 Tbs"
        }
      ]
    }
    handleRecipeSelect(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId !== null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <>
      <RecipeList
        recipes={recipes}
        selectedRecipeId={selectedRecipeId}
        lastSelectedRecipeId={lastSelectedRecipeId}
        handleRecipeSelect={handleRecipeSelect}
        handleRecipeAdd={handleRecipeAdd}
        handleRecipeDelete={handleRecipeDelete}
      />
      {
        selectedRecipeId &&
        <EditorPanel
          handleSelectRecipe={handleSelectRecipe}
          handleRecipeSelect={handleRecipeSelect}
          handleRecipeChange={handleRecipeChange}
        />
      }
    </>

  )
}

export default App