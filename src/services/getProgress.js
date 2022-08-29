const getProgress = (ingredient, id, page, bool) => {
  const progressStore = JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
    ? JSON.parse(localStorage.getItem('inProgressRecipes'))
    : { cocktails: {}, meals: {} };

  if (page === 'meal' && bool === true) {
    if (Object.keys(progressStore.meals).includes(id) === false) {
      const obj = { ...progressStore.meals, [id]: [ingredient] };
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { ...progressStore, meals: obj },
      ));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { ...progressStore,
          meals: {
            ...progressStore.meals,
            [id]: [...progressStore.meals[id], ingredient] },
        },
      ));
    }
  }
  if (page === 'drink' && bool === true) {
    if (Object.keys(progressStore.cocktails).includes(id) === false) {
      const obj = { ...progressStore.cocktails, [id]: [ingredient] };
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { ...progressStore, cocktails: obj },
      ));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { ...progressStore,
          cocktails: {
            ...progressStore.cocktails,
            [id]: [...progressStore.cocktails[id], ingredient] },
        },
      ));
    }
  }

  if (page === 'meal' && bool === false) {
    const rmvProg = progressStore.meals[id].filter((ing) => ing !== ingredient);
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { ...progressStore, meals: { ...progressStore.meals, [id]: rmvProg } },
    ));
  }
  if (page === 'drink' && bool === false) {
    const rmvProg = progressStore.cocktails[id].filter((ing) => ing !== ingredient);
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { ...progressStore, cocktails: { ...progressStore.cocktails, [id]: rmvProg } },
    ));
  }
};

export default getProgress;
