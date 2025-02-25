const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipe_container = document.querySelector('.recipe_container');
const recipe_detils_content = document.querySelector('.recipe-detils-content');
const recipe_closebtn = document.querySelector('.recipe-closebtn');

const fetcrecipe = async (query) =>{
    recipe_container.innerHTML="<h2> Fetching Recipes....</h2>";
    try{


  const data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response = await data.json();

  recipe_container.innerHTML="";
  response.meals.forEach(meal =>{
    const recipediv = document.createElement('div');
    recipediv.classList.add('recipe');
    recipediv.innerHTML=`<img src="${meal.strMealThumb}" />
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish </p>
    <p>belongs to <span>${meal.strCategory}</span>category</p>
    `
     const button =  document.createElement ('button'); 
     button.textContent = "view recipe";  
     recipediv.appendChild(button);

    
     button.addEventListener('click',()=>{
      openRecipe(meal);
     })


    recipe_container.appendChild(recipediv);
  }); 
}catch(error){
  recipe_container.innerHTML="<h2> Error In Fetching Recipes.</h2>";
}
  //console.log(response.meals[0]);
}

const fetchingredient =(meal)=>{
  console.log(meal);
  let ing ="";
  for(let i=1;i<=20;i++){
   const ings=meal[`strIngredient${i}`];
   if(ings){
    const measure = meal[`strMeasure${i}`];
    ing +=`<li>${measure} ${ings}</li>`;
   }
   else{
    break;
   }
  }
return ing;

}

const openRecipe = (meal)=>{

  recipe_detils_content.innerHTML=
  `<h2 class="recipename";>${meal.strMeal}</h2>
   <h3>Ingredents : </h3> 
   <ul class="ingredientlist";> ${fetchingredient(meal)}</ul> 
   <div class="Instructions">
   <h3>Instructions:</h3>
   <p >${meal.strInstructions}</p>
   
   <a href="${meal.strYoutube}"; style="color: white;"  > check out on youtube</a>
   </div>`;
   

  recipe_detils_content.parentElement.style.display="block";
  
}
recipe_closebtn.addEventListener('click',()=>{
recipe_detils_content.parentElement.style.display="none";

});
searchbtn.addEventListener('click' , (e)=>{
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    if(!searchinput){
      recipe_container.innerHTML=`<h2>type the meal in the search boc.. </h2>`;
      return ;
    }
    fetcrecipe(searchinput);
//  console.log("button clicked");
 

});
