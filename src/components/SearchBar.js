import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { inputSearch,
    fetchAPISearch,
    searchMeal,
    handleInputSearch,
    handleButtonFilter } = useContext(MyContext);

  return (
    <div
      className="absolute bg-white w-screen flex justify-center"
    >

      <div
        className="flex flex-col"
      >
        <div
          className="flex
        justify-around
        py-2
        "
        >

          <input
            type="text"
            data-testid="search-input"
            value={ inputSearch }
            onChange={ handleInputSearch }
            className="
          sm:w-64 justify-self-start
          border-2 border-slate-300
          rounded-lg
          px-2
          focus:border-slate-400
          mx-2
          "
          />
          <button
            type="button"
            data-testid="exec-search-btn"
            name="searchButton"
            onClick={ (e) => { fetchAPISearch(); handleButtonFilter(e); } }
            className="
          sm:w-36
          bg-slate-400
          px-2
          rounded-lg
          text-white
          mx-2
          "
          >
            Procurar
          </button>
        </div>
        <div
          className="flex justify-around
      py-1"
        >

          <label htmlFor="ingredient-search-radio">
            <input
              id="ingredient-search-radio"
              type="radio"
              data-testid="ingredient-search-radio"
              value="Ingredient"
              defaultChecked="checked"
              onClick={ searchMeal }
              name="filterRadio"
              className="m-1"
            />
            Ingredient

          </label>
          <label htmlFor="name-search-radio">

            <input
              id="name-search-radio"
              type="radio"
              data-testid="name-search-radio"
              value="Name"
              onClick={ searchMeal }
              name="filterRadio"
              className="m-1"

            />
            Name
          </label>
          <label htmlFor="first-letter-search-radio">
            <input
              id="first-letter-search-radio"
              type="radio"
              data-testid="first-letter-search-radio"
              value="First letter"
              onClick={ searchMeal }
              name="filterRadio"
              className="m-1"

            />
            First Letter

          </label>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
