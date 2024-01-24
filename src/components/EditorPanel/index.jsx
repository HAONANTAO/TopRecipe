import React from 'react'
import styles from "./index.module.scss"

import { classNameStyled } from '@/utils'
import Button from '@/components/Button'
import { v4 as uuidV4 } from 'uuid';

const EditorPanel = (props) => {
  const { handleRecipeSelect, handleRecipeChange, handleSelectRecipe, ...rest } = props

  const recipe = handleSelectRecipe()

  const { id, name, cookTime, servings, instructions, ingredients } = recipe

  function handleChange(changes) {
    handleRecipeChange(id, { ...recipe, ...changes })
  }

  function handleInstructionDelete(index) {
    handleChange({ instructions: [...instructions.slice(0, index), ...instructions.slice(index + 1)] })
  }

  function handleIngredientDelete(index) {
    handleChange({ ingredients: [...ingredients.slice(0, index), ...ingredients.slice(index + 1)] })
  }

  function handleInstructionAdd() {
    handleChange({ instructions: [...instructions, ''] })
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidV4(),
      name: "",
      amount: ""
    }
    handleChange({ ingredients: [...ingredients, newIngredient] })
  }

  return (
    <div className={styles['container']}>
      <div className={styles['container_header']}>
        <span className={styles['container_title']}>Edit Recipe</span>
        <div>
          <Button className='btn-danger' onClick={() => handleRecipeSelect(null)}>X</Button>
        </div>
      </div>

      <div className={styles['sample_panel']}>
        <div className={styles['panel_item']}>
          <label htmlFor="editor_name">Name</label>
          <input id="editor_name" type="text" value={name} onChange={e => handleChange({ name: e.target.value })} />
        </div>

        <div className={styles['panel_item']}>
          <label htmlFor="cook_time">Cook Time</label>
          <input id="cook_time" type="text" value={cookTime} onChange={e => handleChange({ cookTime: e.target.value })} />
        </div>

        <div className={styles['panel_item']}>
          <label htmlFor="servings">Servings</label>
          <input id="servings" type="number" value={servings} onChange={e => handleChange({ servings: +e.target.value })} />
        </div>
      </div>

      <div className={styles['instructions_panel']}>
        <span className={styles['title']}>Instructions</span>
        {
          instructions && instructions.map((instruction, index) => {
            const instructionId = `instruction-${index}`
            return <div key={index} className={styles['panel_item']}>
              <label htmlFor={instructionId}>{index}: </label>
              <input id={instructionId} type="text" value={instruction} onChange={e => handleChange({ instructions: [...instructions.slice(0, index), e.target.value, ...instructions.slice(index + 1)] })} />
              <Button className='btn-danger' onClick={() => handleInstructionDelete(index)}>X</Button>
            </div>
          })
        }
        <div className={styles['add']}>
          <Button onClick={() => handleInstructionAdd()}>Add Instruction</Button>
        </div>
      </div>

      <div className={styles['ingredients_panel']}>
        <span className={styles['title']}>Ingredients</span>
        <div className={styles['title_item']}>
          <label>Name</label>
          <label>Amount</label>
          <span className={styles['hidden']}>
            <Button className='btn-danger'>X</Button>
          </span>
        </div>
        {
          ingredients && ingredients.map((ingredient, index) => {
            const ingredientId = `ingredient-${index}`
            return <div key={index} className={styles['panel_item']}>
              <input id={ingredientId} type="text" value={ingredient.name} onChange={e => handleChange({ ingredients: [...ingredients.slice(0, index), { ...ingredient, name: e.target.value }, ...ingredients.slice(index + 1)] })} />
              <input type="text" value={ingredient.amount} onChange={e => handleChange({ ingredients: [...ingredients.slice(0, index), { ...ingredient, amount: e.target.value }, ...ingredients.slice(index + 1)] })} />
              <Button className='btn-danger' onClick={() => handleIngredientDelete(index)}>X</Button>
            </div>
          })
        }
        <div className={styles['add']}>
          <Button onClick={() => handleIngredientAdd()}>Add Ingredient</Button>
        </div>
      </div>

    </div>
  )
}

export default EditorPanel