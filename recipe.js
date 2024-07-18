const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchButton");
const result = document.getElementById("results");

searchBtn.addEventListener('click',searchRecipe);

//function to handle recipe search
function searchRecipe(){
  //search meal from input
    const searchMeals = searchInput.value;
   
   //when you click search and input is empty
    if(searchMeals === ''){
    return result.innerHTML = '<p>Please search for a meal</p>'
   }
   
   //This is an API from mealdb  
   const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeals}`

   //fetch the data from url
   fetch(url)
   .then((res)=>res.json())
   .then((data)=> {
    //displays when no recipes are found
    if(data.meals === null){
        return result.innerHTML = '<p>Recipe cannot be found</p>'
    }
    else{
        //displays recipe
        const recipes = data.meals;
        //this will display the names,pictures,area from,ingredients and instructions
        const display = recipes.map(recipe => `
           <div>
            <h2>${recipe.strMeal}</h2>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <p>Area: ${recipe.strArea}</p>
            <h3>Ingredients:</h3>
            <ul>
                <li>${handleIngredients(recipe)}</li>
            <ul>
            <h3>Instructions:</h3>
            <p1>${recipe.strInstructions}</p1>
          </div>
        `).join('');
            result.innerHTML = display;
    }
   })
   .catch(error => {
    console.error('Error:', error);
    result.innerHTML = '<p>An error occurred while fetching recipes.</p>';
  });
}

// function to handle measure and ingredient display
function handleIngredients(recipe){
  let handleIngredientMeasure = '';// this empty string will be used to store list of ingredients and measures for a recipe in html lab

  //It loops from 1 to 20 using variable i
  for(let i=1; i <= 20; i++){
     // Iterates through the recipe ingredients and measures 
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

      // Holds the value of current and checks if ingredient exists and is not empty
    if(ingredient && ingredient.trim() !== ''){
    // This makes the HTML list item for the ingredient and measure
      handleIngredientMeasure += `<li>${measure} ${ingredient}<li>`;
    }
  }
  return handleIngredientMeasure;// Returns string containing the HTML list items  
}