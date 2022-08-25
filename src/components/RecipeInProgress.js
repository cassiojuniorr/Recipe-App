import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import isFavorite from '../images/whiteHeartIcon.svg';
import notFavorite from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress({ pageActual, drinks, meals, recp }) {
  const [pageState, setPage] = useState({ page: '' });
  const [recipeState, setRecipe] = useState({ recipe: [] });
  const [redirectState, setRedirect] = useState({ redirect: false });
  const [markedState, setMarked] = useState({ marked: false });
  const [favoriteState, setFavorite] = useState({ favoriteIcon: false });
  const [favoriteListState, setFavoriteList] = useState([]);
  const [finishState, setFinish] = useState({ isDisabled: true });
  const [copyState, setCopy] = useState({ copyed: false });
  const { pathname } = useLocation();

  // referência https://backefront.com.br/como-usar-useparams-react/
  const { idPost } = useParams();

  const data = {
    recipeName: (pageActual === 'foods') ? 'strMeal' : 'strDrink',
    recipeImage: (pageActual === 'foods') ? 'strMealThumb' : 'strDrinkThumb',
    recipeCategory: (pageActual === 'foods') ? 'strCategory' : 'strAlcoholic',
  };

  useEffect(() => {
    const page = pageActual.includes('Foods') ? 'foods' : 'drinks';
    const pag = drinks.length > 0;
    const recipes = pag ? drinks : meals;
    const recipe = recipes.find((elm) => (
      (page === foods) ? elm.idMeal === idPost : elm.idDrinks === idPost
    ));

    setRecipe({ recipe });
    setPage({ page });
  }, []);

  const ingredientBox = () => {
    const { recipe } = recipeState;
    setMarked((prevState) => ({ marked: !prevState.marked }));
    localStorage.setItem('inProgressRecipes', recipe);
  };

  const toggleFavorite = () => {
    let local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!Array.isArray(local)) local = [];
    if (local.some((elm) => elm.id === idPost)) {
      const list = local.filter((recipe) => recipe.id !== idPost);
      setFavoriteList(list);
      localStorage.setItem('inProgressRecipes', list);
    }
    localStorage.setItem('inProgressRecipes', [...list,
      {
        id,
        type: (pageActual === 'foods') ? 'food' : 'drink',
        nationality: recp.strArea ? recp.strArea : '',
        category: recp.strCategory,
        alcoholicOrNot: recp.strAlcoholic ? recp.strAlcoholic : '',
        name: recp[data.recipeName],
        image: recp[data.recipeImage],
      }]);
    setFavoriteList(JSON.parse(localStorage.getItem('inProgressRecipes')));
    setFavorite((prevState) => ({ favoriteIcon: !prevState.favoriteIcon }));
  };

  const toggleFinish = () => {
    setRedirect({ redirect: true });
  };

  const handleShare = () => {
    const url = pathname.replace('/in-progress', '');
    copy(`http://localhost:3000${url}`);
    setCopy({ copyed: true });
  };

  const { recipe } = recipeState;
  const { page } = pageState;
  const { redirect } = redirectState;
  const { marked } = markedState;
  const { favoriteIcon } = favoriteState;
  const { isDisabled } = finishState;
  const { copyed } = copyState;

  return (
    <div>
      {
        recipe.map((elm, i) => (
          <div key={ (page === 'foods') ? elm.idMeal : elm.idDrinks }>
            <img
              src={
                (page === 'foods')
                  ? elm.strMealThumb
                  : elm.strDrinkThumb
              }
              alt="recipePhoto"
              data-testid="recipe-photo"
            />

            <span data-testid="recipe-title">
              {(page === 'foods')
                ? elm.strMeal
                : elm.strDrink}
            </span>

            { copyed && (<h1>Link copied!</h1>)}

            <button
              type="button"
              onClick={ handleShare }
            >
              <img src={ shareIcon } alt="share recipe" data-testid="share-btn" />
            </button>

            <button
              type="button"
              onClick={ toggleFavorite }
            >
              {
                favoriteListState.some((fav) => fav.id === idPost)
                  ? (() => setFavorite({ favoriteIcon: true }))
                  : (() => setFavorite({ favoriteIcon: false }))
              }
              <img
                src={
                  (favoriteIcon) ? isFavorite : notFavorite
                }
                alt="favorite-btn"
                data-testid="favorite-btn"
              />
            </button>

            <span data-testid="recipe-category">{elm.strCategory}</span>

            <div
              data-testid={ `${i}-ingredient-step` }
            >
              <span>
                { marked === true ? (

                  <s>{elm.strIngredient.concat(i)}</s>
                ) : (
                  elm.strIngredient.concat(i)
                )}
              </span>

              <input
                type="checkbox"
                value={ marked }
                onChange={ ingredientBox }
              />
            </div>
            <span data-testid="instructions">{elm.strInstructions}</span>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isDisabled }
              onClick={ toggleFinish }
            >
              FINISH
            </button>
          </div>
        ))
      }
      {redirect && <Redirect to="/done-recipes" />}
    </div>

  );
}

RecipeInProgress.propTypes = {
  meals: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
  drinks: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
  pageActual: propTypes.string.isRequired,
  recp: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
};

const mapStateToProps = ({ recipeReducer: { meals, drinks } }) => ({ meals, drinks });

export default connect(mapStateToProps)(RecipeInProgress);
