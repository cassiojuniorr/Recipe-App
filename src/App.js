import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodsId from './pages/FoodsId';
import FoodsIdInProgress from './pages/FoodsIdInProgress';
import DrinksId from './pages/DrinksId';
import DrinksIdInProgress from './pages/DrinksIdInProgress';

function App() {
  return (
    <div className="color">
      <Switch>
        <Route exact path="/" component={ Login } />

        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:recipeId" component={ FoodsId } />
        <Route
          path="/foods/:recipeId/in-progress"
          component={ FoodsIdInProgress }
        />

        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:recipeId" component={ DrinksId } />
        <Route
          path="/drinks/:recipeId/in-progress"
          component={ DrinksIdInProgress }
        />

        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
