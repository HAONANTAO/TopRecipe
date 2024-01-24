import React from 'react'
import styles from "./index.module.scss"
import Button from '@/components/Button'

import { classNameStyled } from '@/utils'

const Header = (props) => {
  const { header_info, id, editHandler, deleteHandler, className, ...rest } = props
  return (
    <>
      <div className={styles['recipe_header']}>
        <h3 className={styles['recipe_title']}>{header_info}</h3>
        <div className={styles['recipe-btn-group']}>
          {/* <Button className="btn-primary" onClick={editHandler}>Edit</Button> */}
          <Button className="btn-danger" onClick={
            (e) => {
              e.stopPropagation()
              deleteHandler(id)
            }
          }>Delete</Button>
        </div>
      </div>
    </>
  )
}

export default Header