const toggleFavorite = (recipe, id, page, bool) => {
  const favoriteStore = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

  const filterFavorite = (favoriteStore !== false)
    ? favoriteStore.filter((elm) => elm.id === id) : [];

  if (filterFavorite.length === 0) {
    const objFav = {
      id,
      type: page,
      nationality: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
      image: recipe.strMealThumb
        ? recipe.strMealThumb : recipe.strDrinkThumb,
    };

    localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteStore, objFav]));
  }
  if (bool === true && filterFavorite.length !== 0) {
    const rmvFav = favoriteStore.filter((rcp) => rcp.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(rmvFav));
  }
};

export default toggleFavorite;
