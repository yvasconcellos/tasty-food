import React, { useContext, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Filter from '../components/Filter';

function Recipes() {
  const { fetchAPI, dataFiltered } = useContext(MyContext);
  const twelve = 12;

  useEffect(() => {
    fetchAPI('food');
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Header titlePage="Meals" hasSearch />
      <Filter />
      <FoodCard
        base={ dataFiltered }
        quantity={ twelve }
        page="principal"
        typeCard="food"
      />
      <Footer />
    </div>
  );
}

export default Recipes;
