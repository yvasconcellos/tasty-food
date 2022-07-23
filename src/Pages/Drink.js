import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ContextRecipe from '../context/ContextRecipe';
import RecomendationCard from '../components/RecomendationCard';
import MyContext from '../context/MyContext';
import ShareAndFavorite from '../components/ShareAndFavorite';

function Drink({ match: { params: { id } }, location: { pathname } }) {
  const { fetchRecipe, dataRecipe,
    ingredientData,
    fetchRecomendation, recomendation, recipesInProgress,
    setRecipesInProgress } = useContext(ContextRecipe);
  const { setTypeFood } = useContext(MyContext);
  const history = useHistory();
  const [progressDrink, setProgressDrink] = useState(false);

  useEffect(() => {
    setTypeFood('drink');
    fetchRecomendation('drink');
    fetchRecipe(id, 'drink');
  }, []);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') && dataRecipe[0] !== undefined) {
      const result = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setRecipesInProgress(result);
      const continueRecipe = Object
        .keys(result.cocktails).includes(dataRecipe[0].idDrink);
      if (continueRecipe) {
        setProgressDrink(true);
      } else {
        setProgressDrink(false);
      }
    }
  }, [dataRecipe[0]]);

  const changeStatusRecipe = () => {
    setRecipesInProgress({ ...recipesInProgress,
      cocktails: { ...recipesInProgress.cocktails,
        [dataRecipe[0].idDrink]: dataRecipe[0],
      } });
    localStorage.setItem(
      'inProgressRecipes', JSON.stringify({ ...recipesInProgress,
        cocktails: { ...recipesInProgress.cocktails,
          [dataRecipe[0].idDrink]: dataRecipe[0],
        } }),
    );
  };

  return (
    (dataRecipe !== null && dataRecipe[0] !== undefined)

      && (
        <div>
          <img
            className="w-100"
            data-testid="recipe-photo"
            src={ dataRecipe[0].strDrinkThumb }
            alt={ dataRecipe[0].strDrink }
          />
          <div className="d-flex justify-content-between">
            <div>

              <p data-testid="recipe-title">
                {dataRecipe[0].strDrink}
              </p>
              <p data-testid="recipe-category">
                {dataRecipe[0].strAlcoholic}
              </p>
            </div>
            <ShareAndFavorite
              linkCopy={ pathname }
              type="drink"
              id={ id }
              area=""
              category={ dataRecipe[0].strCategory }
              alcoholic={ dataRecipe[0].strAlcoholic }
              name={ dataRecipe[0].strDrink }
              image={ dataRecipe[0].strDrinkThumb }
              testid="share-btn"
              favtestid="favorite-btn"

            />
          </div>
          <ul>
            {ingredientData.map((item, index) => (
              <li
                key={ item }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item}`}
              </li>))}
          </ul>
          <p
            data-testid="instructions"
          >
            {dataRecipe[0].strInstructions}
          </p>
          {recomendation.length > 0
          && <RecomendationCard typeCard="food" />}
          {progressDrink
            ? (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="fixed-bottom"
                onClick={ () => {
                  history.push(`/drinks/${id}/in-progress`);
                } }
              >
                Continue Recipe

              </button>)
            : (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="fixed-bottom"
                onClick={ () => {
                  changeStatusRecipe();
                  history.push(`/drinks/${id}/in-progress`);
                } }
              >
                Start Recipe

              </button>)}
        </div>)
  );
}

Drink.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape({ id: PropTypes.string }) },
  ).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default Drink;
