

const searchFood=()=>{
    const searchInput=document.getElementById('search-input');
    const searchInputText=searchInput.value;
    // console.log(searchInputText);
    if(searchInputText==''){
        return alert("please type a valid food items");
    }else{
    searchInput.value='';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`)
    .then(res=>res.json())
    .then(data=>searchResults(data.meals));
    }
}
// desire meal 

const searchResults=(meals)=>{
    // console.log(meals);
    const searchMeals=document.getElementById('search-results');
    searchMeals.innerHTML='';
    if(!meals){
        return alert("Please type a valid food items");
    }else{
    meals.forEach(meal=>{
        // console.log(meal);
        const div =document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div onclick="loadMealDetails('${meal.idMeal}')" class="card h-100">
        <img src=${meal.strMealThumb} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
        </div>
      </div>
        `;
        searchMeals.appendChild(div);
    });
    }
}

// single meal information 

const loadMealDetails=(mealId)=>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayMealDetails(data.meals[0]));
}

const displayMealDetails=(meal)=>{
    // console.log(meal);
    const singleMealdetails=document.getElementById('meal-details');
    singleMealdetails.innerHTML='';
    const div=document.createElement('div');
    div.classList.add('card');
    div.innerHTML=`
        <img src=${meal.strMealThumb} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
            <a href=${meal.strYoutube} class="btn btn-danger">See on YouTube</a>
        </div>
    `;
    singleMealdetails.appendChild(div);
}