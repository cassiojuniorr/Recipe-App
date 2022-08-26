import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import isFavorite from '../images/whiteHeartIcon.svg';
import notFavorite from '../images/blackHeartIcon.svg';
import style from '../styles/inProgress.module.scss';
import { takeRecipe } from '../services/fetchApi';
import saveDoneRecipes from '../services/saveDoneRecipes';
import toggleFavorite from '../services/toggleFavorite';

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
  // {
  //   idDrink: '178319',
  //   strDrink: 'GG',
  //   strCategory: 'Ordinary Drink',
  //   strAlcoholic: 'Optional alcohol',
  //   strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  //   strInstructions: 'Pick through your lentils for any foreign debris, rinse them',
  //   strIngredient1: 'Galliano',
  //   strIngredient2: 'Ginger ale',
  //   strIngredient3: 'Ice',
  // },
];

function RecipeInProgress({ pageActual }) {
  const history = useHistory();
  const { location: pathname } = history;

  // referência https://backefront.com.br/como-usar-useparams-react/
  const { idPost } = useParams();

  const [recipeState, setRecipe] = useState({ recipe: [] });
  const [ingredientState, setIngredient] = useState([]);
  const [measureState, setMeasure] = useState([]);
  const [favoriteState, setFavorite] = useState(false);
  const [checksState, setchecks] = useState([]);
  const [markedState, setMarked] = useState({ marked: false });
  const [finishState, setFinish] = useState({ isDisabled: true });
  const [redirectState, setRedirect] = useState({ redirect: false });
  const [copyState, setCopy] = useState({ copyed: false });

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await takeRecipe(pageActual, idPost);
      setRecipe({ recipe });
    };
    return getRecipe();
  }, []);

  // useEffect(() => {
  //   const checks = localStorage.getItem('CheckBoxIds');
  //   const checkList = JSON.parse(checks);
  //   if (checkList[0] !== undefined) {
  //     checkList.forEach((elm) => {
  //       const check = document.getElementById(elm);
  //       check.setAttribute('checked', true);
  //       check.value = 'checked';
  //       setMarked({ marked: true });
  //     });
  //   }
  // }, [ingredientState]);

  const getIngredients = () => {
    const ingredients = recipes.length !== 0 ? Object.keys(recipes[0])
      .filter((elm) => elm.includes('strIngredient')) : [];

    const measuteI = recipes.length !== 0 ? Object.keys(recipes[0])
      .filter((key) => key.includes('strMeasute')) : [];

    setIngredient(ingredients);
    setMeasure(measuteI);
  };

  useEffect(() => { getIngredients(); }, [recipeState]);

  const makeFave = () => {
    const { recipe } = recipeState;
    toggleFavorite(recipe[0], idPost, pageActual);
    setFavorite(!favoriteState);
  };

  const favoriteButton = (isfavorite) => {
    if (isfavorite === false) {
      return (<img src={ isFavorite } alt="Favorite BTN" data-testid="favorite-btn" />);
    }
    if (isfavorite === true) {
      return (<img src={ notFavorite } alt="Favorite BTN" data-testid="favorite-btn" />);
    }
  };

  const handleShare = () => {
    const url = pathname.replace('/in-progress', '');
    copy(`http://localhost:3000${url}`);
    setCopy({ copyed: true });
    setTimeout(() => setCopy(false), Number('2000'));
  };

  const setCheckBox = ({ target }) => {
    if (target.checked === true) {
      setMarked((prev) => ({ marked: !prev.favoriteState.marked }));
      if (checksState.includes(target.id)) {
        const rmvCheck = checks.filter((elm) => elm !== target.id);
        setchecks(rmvCheck);
      }
      setchecks([...checksState, target.id]);
    }

    const rmvCheck = checksState.filter((elm) => elm !== target.id);
    setchecks(rmvCheck);
    setMarked((prev) => ({ marked: !prev.favoriteState.marked }));
  };

  const habilitCheckBox = () => {
    setMarked((prev) => ({ marked: !prev.favoriteState.marked }));
    // localStorage.setItem('inProgressRecipes', recipe);
    const arrCheck = localStorage.getItem('CheckBoxIds');
    const checkList = JSON.parse(arrCheck);
    if (checkList.length === ingredientState.length - 1) {
      setFinish({ isDisabled: false });
    }

    setFinish({ isDisabled: true });
  };

  const toggleFinish = () => {
    saveDoneRecipes(recipeState.recipe[0], idPost, pageActual);
    setRedirect({ redirect: true });
  };

  const { redirect } = redirectState;
  const { marked } = markedState;
  const { isDisabled } = finishState;
  const { copyed } = copyState;
  const { recipe } = recipeState;
  const { containerInProgress, imgInProgress } = style;

  return (
    <div className={ containerInProgress }>
      aqui
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
              className={ imgInProgress }
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
              onClick={ makeFave }
            >
              { favoriteButton(favoriteState) }
            </button>
            <span data-testid="recipe-category">{recipe[0].strCategory}</span>
            {
              ingredientState.map((ing, index) => (
                (marked === true) ? (
                  <div data-testid={ `${index}-ingredient-step` }>
                    <s name={ index }>{`${measureState[index]}, ${ing}`}</s>

                    <input
                      type="checkbox"
                      value={ marked }
                      onChange={ () => habilitCheckBox() }
                      onClick={ () => setCheckBox() }
                      id={ index }
                    />

                  </div>
                ) : (
                  <div data-testid={ `${index}-ingredient-step` }>
                    <p name={ index }>{`${measureState[index]}, ${ing}`}</p>

                    <input
                      type="checkbox"
                      value={ marked }
                      onChange={ () => habilitCheckBox() }
                      onClick={ () => setCheckBox() }
                      id={ index }
                    />
                  </div>
                )
              ))
            }
            <span data-testid="instructions">{recipe[0].strInstructions}</span>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isDisabled }
              onClick={ () => toggleFinish() }
            >
              FINISH
            </button>
          </div>
        )
      }
      {redirect && <Redirect to="/done-recipes" />}
    </div>
  );
}
RecipeInProgress.propTypes = {
  pageActual: propTypes.string.isRequired,
};

export default connect(null)(RecipeInProgress);
