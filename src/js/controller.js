import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    // console.log(resultsView);

    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) load recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderMessage();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1 - get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2 - load search results
    await model.loadSearchResults(query); // Not stored because doesn't return anything - just updates state.

    // 3 - render results
    resultsView.render(model.getSearchResultsPage(1));

    // 4 - render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (gotoPage) {
  // 3 - render new results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // 4 - render new pagination buttons
  paginationView.render(model.state.search);
};

// window.addEventListener('hashchange', controlRecipes);
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
