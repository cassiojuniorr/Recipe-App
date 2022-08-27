import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/inProgress.css';
import { takeRecipe } from '../services/fetchApi';
import saveDoneRecipes from '../services/saveDoneRecipes';
import toggleFavorite from '../services/toggleFavorite';
import getProgress from '../services/getProgress';

const copy = require('clipboard-copy');

function RecipeInProgress({ pageActual, recipeId }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const pathWithBars = pathname.split('/');
  const path = pathWithBars[1];
  const urlId = pathname.replace(/\D/g, '');

  // referência https://backefront.com.br/como-usar-useparams-react/
  const { idPost } = useParams();

  const [recipeState, setRecipe] = useState({ recipe: [] });
  const [ingredientState, setIngredient] = useState([]);
  const [measureState, setMeasure] = useState([]);
  const [favoriteState, setFavorite] = useState(false);
  const [checksState, setchecks] = useState([]);
  const [checkedState, setChecked] = useState(false);
  const [checksIdState, setchecksId] = useState({ id: [] });
  const [finishState, setFinish] = useState(true);
  const [copyState, setCopy] = useState({ copyed: false });

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await takeRecipe(pageActual, recipeId);

      setRecipe({ recipe: [recipe] });
    };

    const getLocalStorage = () => {
      const favoriteStore = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
        ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

      setFavorite(favoriteStore.some((recipe) => recipe.id === recipeId));
    };

    getLocalStorage();
    getRecipe();
  }, []);

  const getIngredients = () => {
    const { recipe } = recipeState;

    const ingredients = recipe.length !== 0 ? Object.keys(recipe[0])
      .filter((elm) => elm.includes('strIngredient')) : [];

    const measuteI = recipe.length !== 0 ? Object.keys(recipe[0])
      .filter((key) => key.includes('strMeasute')) : [];

    const filterIngredients = ingredients
      .filter((elm) => (recipe[0][elm] !== null))
      .filter((i) => recipe[0][i].length !== 0);

    setIngredient(filterIngredients);
    setMeasure(measuteI);
  };

  useEffect(() => { getIngredients(); }, [recipeState]);

  const makeFave = () => {
    const { recipe } = recipeState;
    toggleFavorite(recipe[0], urlId, path, favoriteState);
    setFavorite(!favoriteState);
  };

  const favoriteButton = (fav) => (
    <img
      src={ (fav === true) ? blackHeartIcon : whiteHeartIcon }
      alt="Favorite BTN"
      data-testid="favorite-btn"
    />
  );

  const handleShare = () => {
    if (pageActual === 'Meal') {
      copy(`http://localhost:3000/foods/${urlId}`);
    }
    if (pageActual === 'Drink') {
      copy(`http://localhost:3000/drinks/${urlId}`);
    }
    setCopy({ copyed: true });
    setTimeout(() => setCopy(false), Number('2000'));
  };

  const setCheckBox = ({ target }) => {
    const check = document.getElementsByName(target.id);
    setChecked(!checkedState);
    getProgress(ingredientState[target.id],
      urlId, pageActual.toLowerCase(), target.checked);
    if (target.checked === true) {
      setchecksId({ id: [...checksIdState.id, ingredientState[target.id]] });
      check[0].className = 'marked';
      if (checksState.includes(target.id)) {
        const rmvCheck = checksState.filter((elm) => elm !== target.id);
        setchecks(rmvCheck);
      } else {
        setchecks([...checksState, target.id]);
      }
    }
    if (target.checked === false) {
      check[0].className = '';
      const rmvCheck = checksState.filter((elm) => elm !== target.id);
      const filterProgress = checksIdState.id.filter((pro) => pro !== target.id);
      setchecks(rmvCheck);
      setchecksId({ id: [filterProgress] });
    }
  };

  const habilitFinishBTN = () => {
    const checkList = JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : [];

    if (checkList.length === ingredientState.length) {
      setFinish(false);
    } else {
      setFinish(true);
    }
  };

  const toggleFinish = () => {
    saveDoneRecipes(recipeState.recipe[0], urlId, pageActual);
    history.push('/done-recipes');
  };

  const { copyed } = copyState;
  const { recipe } = recipeState;

  return (
    <div className="containerInProgress">
      {
        recipe[0] !== undefined
        && (
          <div key={ (pageActual === 'Meal') ? recipe[0].idMeal : recipe[0].idDrink }>
            <h1 data-testid="recipe-title">
              {(pageActual === 'Meal')
                ? recipe[0].strMeal
                : recipe[0].strDrink}
            </h1>
            <img
              src={
                (pageActual === 'Meal')
                  ? recipe[0].strMealThumb
                  : recipe[0].strDrinkThumb
              }
              alt="recipePhoto"
              data-testid="recipe-photo"
              className="imgInProgress"
            />
            { copyed && (<h1>Link copied!</h1>)}
            <button
              type="button"
              onClick={ handleShare }
            >
              <img src={ shareIcon } alt="share recipe" data-testid="share-btn" />
            </button>
            <button
              type="button"
              onClick={ () => makeFave() }
            >
              { favoriteButton(favoriteState) }
            </button>
            <span data-testid="recipe-category">{recipe[0].strCategory}</span>
            <ul>
              {ingredientState.map((ing, index) => (
                <li data-testid={ `${index}-ingredient-step` } key={ index }>
                  <input
                    type="checkbox"
                    onChange={ () => habilitFinishBTN() }
                    onClick={ (e) => setCheckBox(e) }
                    id={ index }
                    value={ checkedState }
                  />
                  <p
                    name={ index }
                    className=""
                    id={ index }
                  >
                    {`${measureState[index]}, ${ing}`}
                  </p>
                </li>

              ))}
            </ul>
            <span data-testid="instructions">{recipe[0].strInstructions}</span>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ finishState }
              onClick={ () => toggleFinish() }
            >
              Finish Recipe
            </button>
          </div>
        )
      }
    </div>
  );
}
RecipeInProgress.propTypes = {
  pageActual: propTypes.string.isRequired,
  recipeId: propTypes.string.isRequired,
};

export default connect(null, null)(RecipeInProgress);
