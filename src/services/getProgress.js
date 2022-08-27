const getProgress = (ingredient, id, page, bool) => {
  const progressStore = JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
    ? JSON.parse(localStorage.getItem('inProgressRecipes')) : [];

  const filterProgress = (progressStore !== false)
    ? progressStore.filter((elm) => elm.id === id) : [];

  if (page === 'meal' && filterProgress.length === 0 && bool === true) {
    const objProgressMeal = {
      meals: { [id]: [ingredient] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      [...progressStore, objProgressMeal],
    ));
  }

  if (page === 'drink' && filterProgress.length === 0 && bool === true) {
    const objProgressDrink = {
      cocktails: { [id]: [ingredient] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      [...progressStore, objProgressDrink],
    ));
  }

  if (bool === true && filterProgress.length !== 0) {
    const rmvProg = progressStore.filter((ing) => ing.page.id !== id);
    localStorage.setItem('inProgressRecipes', JSON.stringify(rmvProg));
  }
};

export default getProgress;
