import React from 'react'
import styles from "./index.module.scss"
import Button from '@/components/Button'
import Header from '@/components/Header'
import Panel from '@/components/Panel'

import { classNameStyled } from '@/utils'


const Recipe = (props) => {

  const { id, name, servings, cookTime, instructions, ingredients, className, handleRecipeSelect, handleRecipeDelete, selectedRecipeId, lastSelectedRecipeId, ...rest } = props

  const [chosen, setChosen] = React.useState(false)
  const [lastChosen, setLastChosen] = React.useState(false)

  const [recipeClassNameList, setRecipeClassNameList] = React.useState(['recipe'])

  const [recipeClassName, setRecipeClassName] = React.useState()

  function removeClassName(className) {
    setRecipeClassNameList(list => list.filter(item => item !== className))
  }

  function addClassName(className) {
    removeClassName(className)
    setRecipeClassNameList(list => [...list, className])
  }

  React.useEffect(() => {
    id === selectedRecipeId ? setChosen(true) : setChosen(false)
  }, [id, selectedRecipeId])

  React.useEffect(() => {
    id === lastSelectedRecipeId ? setLastChosen(true) : setLastChosen(false)
  }, [id, lastSelectedRecipeId])

  React.useEffect(() => {

    chosen ? addClassName('chosen') : removeClassName('chosen')

  }, [chosen])

  React.useEffect(() => {

    lastChosen ? addClassName('last-chosen') : removeClassName('last-chosen')

  }, [lastChosen])

  React.useEffect(() => {
    console.log('recipeClassNameList: ', recipeClassNameList);
    setRecipeClassName(classNameStyled(className, styles, recipeClassNameList.join(' ')))
  }, [recipeClassNameList])

  return (
    <div className={styles['recipe_border']}>
      <div className={recipeClassName}
        onClick={() => handleRecipeSelect(id)}
      >
        <Header
          header_info={name}
          id={id}
          deleteHandler={handleRecipeDelete}
        />
        <Panel
          cookTime={cookTime}
          servings={servings}
          instructions={instructions}
          ingredients={ingredients}
        />
      </div>
    </div>

  )
}

const RecipeList = (props) => {
  let {
    recipes,
    selectedRecipeId,
    lastSelectedRecipeId,
    handleRecipeSelect,
    handleRecipeAdd, handleRecipeDelete,
    recipeClassName, addClassName, ...rest
  } = props

  recipeClassName = classNameStyled(recipeClassName, styles, 'container')

  addClassName = classNameStyled(addClassName, styles, 'add')

  return (
    <div className={recipeClassName}>
      <div className={styles['title']}>
        <span>Topcoder Recipes</span>
      </div>
      <div>
        {
          recipes.map((recipe) => {
            return (
              <Recipe key={recipe.id} {...recipe}
                handleRecipeSelect={handleRecipeSelect} selectedRecipeId={selectedRecipeId}
                handleRecipeDelete={handleRecipeDelete}
                lastSelectedRecipeId={lastSelectedRecipeId}
              />
            )
          })
        }
      </div>

      <div className={addClassName}>
        <Button
          className="btn-primary"
          onClick={handleRecipeAdd}
        >Add Recipe</Button>
      </div>
    </div>
  )
}

export default RecipeList

export { Recipe }