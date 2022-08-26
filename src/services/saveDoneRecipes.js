const saveDoneRecipes = (recipe, id, page) => {
  const doneStore = JSON.parse(localStorage.getItem('doneRecipes')) !== null
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];

  const doneFilter = doneStore !== false
    ? doneStore.filter((elm) => elm.id === id) : [];

  const data = new Date(Date.now());

  if (doneFilter.length === 0) {
    const objDone = {
      id,
      type: page,
      nationality: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe.strMeal ? recipe.strMeal : '',
      image: recipe.strMealThumb
        ? recipe.strMealThumb : recipe.strDrinkThumb,
      data,
      tags: recipe.strTags,
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...doneStore, objDone]));
  }

  const rmvDone = doneFilter.filter((elm) => elm.id !== id);
  localStorage.setItem('doneRecipes', JSON.stringify(rmvDone));
};

export default saveDoneRecipes;
