export function classNameStyled(className, styles, preStyles) {
  const classList = className ? className.split(' ') : []
  const preStyleList = preStyles ? preStyles.split(' ') : []
  // console.log("classList: ", classList);
  const classListStyled = classList.map((item) => { return styles[item] })

  // console.log("classListStyled: ", classListStyled);
  // console.log("preStyleList: ", preStyleList);
  preStyleList.forEach((item) => {
    // console.log("item: ", item);
    // console.log("styles[item]: ", styles[item]);
    classListStyled.unshift(styles[item])
    // console.log("classListStyled: ", classListStyled);
  })
  // console.log("classListStyled.join(' ') : ", classListStyled.join(' '));
  return classListStyled.join(' ')
}
