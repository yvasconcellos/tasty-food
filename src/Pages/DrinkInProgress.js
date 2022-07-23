import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ContextRecipe from '../context/ContextRecipe';
import ShareAndFavorite from '../components/ShareAndFavorite';
import ListCheck from '../components/ListCheck';

function DrinkInProgress({ match: { params: { id } }, location: { pathname } }) {
  const { dataRecipe,
    ingredientData,
    ingredientsContinue,
    setIngredientsContinue,
    fetchRecipe,
    doneRecipesStorage,
    setDoneRecipesStorage,
  } = useContext(ContextRecipe);
  const history = useHistory();
  const [ingredientChecked, setIngredientChecked] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [ingredientCheckedName, setIngredientCheckedName] = useState([]);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const onHandleCheck = ({ target: { checked, name } }) => {
    if (checked) {
      setIngredientChecked([...ingredientChecked, checked]);
      setIngredientCheckedName([...ingredientCheckedName, name]);
      localStorage.setItem('doneIngredients', JSON.stringify({
        ...ingredientsContinue,
        [id]: [...ingredientCheckedName, name],
      }));
    } else {
      const removeTrue = ingredientChecked.slice(1);
      setIngredientChecked(removeTrue);
      const filterIngredients = ingredientCheckedName.filter((item) => (item !== name));
      localStorage.setItem('doneIngredients', JSON.stringify({
        ...ingredientsContinue,
        [id]: filterIngredients,
      }));
      setIngredientCheckedName(filterIngredients);
    }
  };

  useEffect(() => {
    fetchRecipe(id, 'drink');
    if (localStorage.getItem('doneIngredients')
    && JSON.parse(localStorage.getItem('doneIngredients'))[id]) {
      const result = JSON.parse(localStorage.getItem('doneIngredients'));
      setIngredientsContinue(result);
      setIngredientCheckedName(result[id]);
    }
  }, []);

  useEffect(() => {
    if (dataRecipe[0] !== undefined) {
      if (ingredientCheckedName.length === ingredientData.length) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
      setIngredientsContinue({
        ...ingredientsContinue,
        [id]: ingredientCheckedName,
      });
    }
  }, [ingredientCheckedName]);

  const sendDoneToStorage = () => {
    const objDone = {
      id,
      type: 'drink',
      nationality: '',
      category: dataRecipe[0].strCategory,
      alcoholicOrNot: dataRecipe[0].strAlcoholic,
      name: dataRecipe[0].strDrink,
      image: dataRecipe[0].strDrinkThumb,
      doneDate: today.toLocaleDateString(),
      tags: dataRecipe[0].strTags !== null ? dataRecipe[0].strTags.split(',') : [],
    };
    setDoneRecipesStorage([...doneRecipesStorage, objDone]);
    localStorage
      .setItem('doneRecipes', JSON.stringify([...doneRecipesStorage, objDone]));
  };

  return (
    dataRecipe[0] !== undefined

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
              linkCopy={ pathname.replace('/in-progress', '') }
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
            {ingredientData.map(
              (ingredi, index) => (<ListCheck
                id={ id }
                key={ index }
                item={ ingredi }
                index={ index }
                onChange={ (e) => onHandleCheck(e) }
              />),
            )}
          </ul>
          <p
            data-testid="instructions"
          >
            {dataRecipe[0].strInstructions}
          </p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="fixed-bottom w-100"
            onClick={ () => { sendDoneToStorage(); history.push('/done-recipes'); } }
            disabled={ btnDisabled }

          >
            Finalizar Drink

          </button>
        </div>)
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape({ id: PropTypes.string }) },
  ).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default DrinkInProgress;
