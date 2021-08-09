import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import "./App.css";
import Recipe from "./Recipe";

const App = () => {
  const APP_ID = "f05cba75";
  const APP_KEY = "80230515bbea463782200c5655315d9e";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  // Request is made once initially when the page is refreshed
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getSearch = (e) => {
    e.preventDefault();
    setRecipes([]);
    setQuery(search);
    setLoading(true);
    setSearch("");
  };
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    setLoading(false);
  };
  return (
    <div className="App">
      <div className="header">
        <h1 onClick={() => setRecipes([])}>🍟Yummy Life🍕</h1>
        <p>Your Favourite Recipe App</p>
      </div>
      <form onSubmit={getSearch} className="search-form">
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={updateSearch}
          placeholder="Search for Yummy Food🍔"
        />
        <button disabled={search === ""} className="search-btn">
          Search
        </button>
      </form>
      {loading ? (
        <div className="w-100 d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <></>
      )}
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={(recipe.recipe.calories / 1000).toFixed(2)}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
