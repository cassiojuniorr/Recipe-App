import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />

        <Route exact path="/foods" component={ Foods } />
        <Route path="/foods/:recipeId" component={ Foods } />
        <Route path="/foods/:recipeId/in-progress" component={ Foods } />

        <Route exact path="/drinks" component={ Drinks } />
        <Route path="/drinks/:recipeId" component={ Drinks } />
        <Route path="/drinks/:recipeId/in-progress" component={ Drinks } />

        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
