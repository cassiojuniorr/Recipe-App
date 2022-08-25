import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import isFavorite from '../images/whiteHeartIcon.svg';
import notFavorite from '../images/blackHeartIcon.svg';
import style from '../styles/inProgress.module.scss';
import { takeRecipe } from '../services/fetchApi';

const copy = require('clipboard-copy');

const recipes = [
  {
    idMeal: '52977',
    strMeal: 'Corba',
    strCategory: 'Side',
    alcoholicOrNot: '',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    strTags: ['Soup'],
    strInstructions: 'Pick through your lentils for any foreign debris, rinse them',
    strIngredient1: 'Lentils',
    strIngredient2: 'Onion',
    strIngredient3: 'Carrots',
    strIngredient4: 'Tomato Puree',
    strIngredient5: 'Cumin',
  },
  {
    idDrink: '178319',
    strDrink: 'GG',
    strCategory: 'Ordinary Drink',
    strAlcoholic: 'Optional alcohol',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    strInstructions: 'Pick through your lentils for any foreign debris, rinse them',
    strIngredient1: 'Galliano',
    strIngredient2: 'Ginger ale',
    strIngredient3: 'Ice',
  },
];

function RecipeInProgress({ pageActual }) {
  const [recipeState, setRecipe] = useState({ recipe: [] });
  const [redirectState, setRedirect] = useState({ redirect: false });
  const [markedState, setMarked] = useState({ marked: false });
  const [favoriteState, setFavorite] = useState({ favoriteIcon: false });
  const [favoriteListState, setFavoriteList] = useState([]);
  const [finishState, setFinish] = useState({ isDisabled: true });
  const [copyState, setCopy] = useState({ copyed: false });

  const history = useHistory();

  // referência https://backefront.com.br/como-usar-useparams-react/
  const { idPost } = useParams();

  const getRecipe = async (pageActual, idPost) => {
    const recipe = await takeRecipe(pageActual, idPost);
    setRecipe({ recipe });
  };

  useEffect(() => {
    getRecipe(pageActual, idPost);
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
        type: (pageActual === 'Meal') ? 'Meal' : 'Drink',
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
    const { location: { pathname } } = history;
    const url = pathname.replace('/in-progress', '');
    copy(`http://localhost:3000${url}`);
    setCopy({ copyed: true });
    setTimeout(() => setCopy(false), Number('2000'));
  };

  const { redirect } = redirectState;
  const { marked } = markedState;
  const { favoriteIcon } = favoriteState;
  const { isDisabled } = finishState;
  const { copyed } = copyState;
  const { recipe } = recipeState;

  const ingredients = recipes.length !== 0 ? Object.keys(recipes[0])
    .filter((elm) => elm.includes('strIngredient')) : [];

  const { containerInProgress, imgInProgress } = style;

  return (
    <div className={ containerInProgress }>
      {
        recipes.length > 0
        && (
          recipes.map((elm) => (
            <div key={ (pageActual === 'Meal') ? elm.idMeal : elm.idDrink }>
              <img
                src={
                  (pageActual === 'Meal')
                    ? elm.strMealThumb
                    : elm.strDrinkThumb
                }
                alt="recipePhoto"
                data-testid="recipe-photo"
                className={ imgInProgress }
              />

              <span data-testid="recipe-title">
                {(pageActual === 'Meal')
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

              {
                ingredients.map((ing, index) => (
                  (marked === true) ? (
                    <div>
                      <s data-testid={ `${index}-ingredient-step` }>
                        {
                          ing
                        }
                      </s>

                      <input
                        type="checkbox"
                        value={ marked }
                        onChange={ ingredientBox }
                      />

                    </div>
                  ) : (
                    <div>
                      <p data-testid={ `${index}-ingredient-step` }>{ing}</p>
                      <input
                        type="checkbox"
                        value={ marked }
                        onChange={ ingredientBox }
                      />
                    </div>
                  )
                ))
              }

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
        )
      }
      {redirect && <Redirect to="/done-recipes" />}
    </div>

  );
}

RecipeInProgress.propTypes = {
  // meals: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
  // drinks: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
  pageActual: propTypes.string.isRequired,
  // recp: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
};

// const mapStateToProps = ({ recipeReducer: { meals, drinks } }) => ({ meals, drinks });

export default connect(null)(RecipeInProgress);
