const getProgress = (recipe, id, page) => {
  const progressStore = JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
    ? JSON.parse(localStorage.getItem('inProgressRecipes')) : [];

  const filterProgress = (progressStore !== false)
    ? progressStore.filter((elm) => elm.id === id) : [];

  if (filterProgress.length === 0) {
    const objProgress = {
      id,
      type: page,
      nationality: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
      image: recipe.strMealThumb
        ? recipe.strMealThumb : recipe.strDrinkThumb,
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(
      [...progressStore, objProgress],
    ));
  }

  const rmvProg = progressStore.filter((rcp) => rcp.id !== id);
  localStorage.setItem('inProgressRecipes', JSON.stringify(rmvProg));
};

export default getProgress;
