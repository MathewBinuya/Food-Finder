const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const recipesContainer = document.getElementById('recipe');

async function getRecipes(query) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await res.json();
  return data.meals || [];
}

function displayRecipes(recipes) {
  recipesContainer.innerHTML = "";
  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <h3>${recipe.strMeal}</h3>
      <p>${recipe.strCategory}</p>
      <h4>${recipe.strArea}</h4>
    `;
    recipesContainer.appendChild(card);
  });
}

// default search
getRecipes("soup").then(displayRecipes);

// Search button
searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;
  const recipes = await getRecipes(query);
  displayRecipes(recipes);
  searchInput.value = "";

});

// Enter key support
searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

