const getProgress = (Ingredient, id, page, bool) => {
  const progressStore = JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
    ? JSON.parse(localStorage.getItem('inProgressRecipes')) : [];

  const filterProgress = (progressStore !== false)
    ? progressStore.filter((elm) => elm.id === id) : [];

  if (filterProgress.length === 0) {
    const objProgress = {
      [id]: [Ingredient],
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(
      [...progressStore, objProgress],
    ));
  }
  if (bool === false && filterProgress.length !== 0) {
    const rmvProg = progressStore.filter((rcp) => rcp.id !== id);
    localStorage.setItem('inProgressRecipes', JSON.stringify(rmvProg));
  }
};

export default getProgress;
