import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/inProgress.css';
// import { takeRecipe } from '../services/fetchApi';
import saveDoneRecipes from '../services/saveDoneRecipes';
import toggleFavorite from '../services/toggleFavorite';
import getProgress from '../services/getProgress';

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
    strIngredient5: 'Csda',
    strIngredient6: 'ghg',
    strIngredient7: 'wrk',
    strIngredient8: 'Cdfsd',
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
  const [finishState, setFinish] = useState({ isDisabled: true });
  const [redirectState, setRedirect] = useState({ redirect: false });
  const [copyState, setCopy] = useState({ copyed: false });

  useEffect(() => {
    const getRecipe = async () => {
      // const recipe = await takeRecipe(pageActual, idPost);

      setRecipe({ recipe: recipes });
    };
    return getRecipe();
  }, []);

  // useEffect(() => {
  //   const checks = localStorage.getItem('CheckBoxIds');
  //   const checkList = JSON.parse(checks);
  //   if (checkList[0] !== undefined || checkList[0] !== null) {
  //     checkList.forEach((elm) => {
  //       const check = document.getElementById(elm);
  //       check.setAttribute('checked', true);
  //       check.value = 'checked';
  //       setMarked({ marked: true });
  //     });
  //   }
  // }, [ingredientState]);

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
    toggleFavorite(recipe[0], urlId, path);
    getProgress(recipe[0], urlId, path);
    setFavorite(!favoriteState);
  };

  const favoriteButton = (fav) => {
    if (fav === false) {
      return (<img
        src={ whiteHeartIcon }
        alt="Favorite BTN"
        data-testid="favorite-btn"
      />);
    }
    if (fav === true) {
      return (<img
        src={ blackHeartIcon }
        alt="Favorite BTN"
        data-testid="favorite-btn"
      />);
    }
  };

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
    if (target.checked === true) {
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
      setchecks(rmvCheck);
    }
  };

  const habilitFinishBTN = () => {
    const arrCheck = localStorage.getItem('favoriteRecipes');
    const checkList = JSON.parse(arrCheck) ? JSON.parse(arrCheck) : [];
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
  const { isDisabled } = finishState;
  const { copyed } = copyState;
  const { recipe } = recipeState;

  return (
    <div className="containerInProgress">
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
                  />
                  <p name={ index } className="">{`${measureState[index]}, ${ing}`}</p>
                </li>

              ))}
            </ul>
            <span data-testid="instructions">{recipe[0].strInstructions}</span>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isDisabled }
              onClick={ () => toggleFinish() }
            >
              Finish Recipe
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
