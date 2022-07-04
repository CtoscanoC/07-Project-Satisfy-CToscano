let searchButton = $("#searchRecipes")

//runs the API request upon hitting the 'Get Recipes' button
searchButton.click (function()  {
  console.log("button pressed")
  sendApiRequest()
});

//runs the API request upon hitting the enter button
$(document).keypress(function (e) {
  if (e.which == 13) {
    console.log("enter pressed")
    sendApiRequest()
    return false;
  }
});

// API request and creation of variables for usage with the data. The variables need to be interpolated ${} and inverted commas are needed
async function sendApiRequest(){
  let APP_ID = "70cfd7b6"
  let API_KEY = "3c907ee335071481a2da16c76c9fcfde"
  let query = $("#search-recipe").val();
  let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`);
  console.log(response)
  let data = await response.json()
  console.log(data)

  $("#content").empty() //empties the content area

  for (var i = 0; i <= 11; i++) { //sets the number of cards to 12
  //defines card content, card content is drawn from the objects defined by the API request
  var foodContent = 
    `<div class="card col-3 offset-0.5" id="recipe-${data.hits[i].recipe.label}-${i}" style="width: 18rem;">
      <img src="${data.hits[i].recipe.image}" class="card-img-top" id="foodImg" alt="${data.hits[i].recipe.label}">
      <div class="card-body">
        <h5 class="card-title" id="foodTitle">${data.hits[i].recipe.label}</h5>
        <p class="card-text" id="foodLabel">Food Class:
        ${data.hits[i].recipe.dietLabels}
        </p>
        <a href="${data.hits[i].recipe.url}" target="_blank" class="btn btn-primary" id="pageLink">The recipe is here!</a>
      </div>
      <button class="btn btn-primary" id="saveMe-${i}" style="margin-bottom: 1px;">Save</button>
    </div>
  </div>`


$("#content").append(foodContent); //appends the cards defined above to the content area

//Defines what happens on clicking the 'Save' button at the bottom of each recipe card
  let saveBtn = $(`#saveMe-${i}`)
  saveBtn.click (function()  {
    //turns the save button grey and changes 'save' into 'saved'
  saveBtn.html("Saved");
  saveBtn.css("background-color", "grey");
 
  let savedTitle = $(this).siblings(".card-body").children("#foodTitle").html(); //defines the corresponding recipe title to the save button
  let savedLabel = $(this).siblings(".card-body").children("#foodLabel").html(); //defines the corresponding health label to the save button
  let savedUrl = $(this).siblings(".card-body").children("a").attr('href'); //defines the corresponding recipe link to the save button
  let savedImg = $(this).siblings("#foodImg").attr('src');  //defines the corresponding image to the save button
 
  
  let foodId = $(this).parent().attr("id"); //sets the ID of the key for local storage

  let foodObject = {'title':savedTitle, 'label':savedLabel, 'link': savedUrl, 'image': savedImg}; 
  //sets the above defined variables into an object

  localStorage.setItem(foodId,JSON.stringify(foodObject)) //saves the foodObject object as a string into local storage

});

}
}
//What happens on clicking the 'Get Saved Recipes' Button
let savedRecipesBtn = $('#savedRecipes')
savedRecipesBtn.click (async function(){
  $("#content").empty() //empties the content area

  let keysOld = Object.keys(localStorage); //sets all the keys from local storage to a single variable
  let keys = keysOld.filter(function(val) {
    return val.includes("recipe")
  });
  
  console.log(keys)

for (var i = 0; i <= keys.length-1; i++){
  let savedItem = localStorage.getItem(keys[i]) //pulls all the objects from local storage
  let savedObj = await JSON.parse(savedItem) //converts local storage data into an object
  
  //console.log(keysTrue)
  //console.log(savedObj)
  
  //defines card content, card content is drawn from the objects pulled from local storage
  var foodContent = 
  `<div class="card col-3 offset-0.5" id="${savedObj.title}-${i}" style="width: 18rem;">
      <img src="${savedObj.image}" class="card-img-top" id="foodImg" alt="${savedObj.title}"/> 
      <div class="card-body">
        <h5 class="card-title" id="foodTitle">${savedObj.title}</h5>
       <p class="card-text" id="foodLabel">
        ${savedObj.label}
        </p>
        <a href="${savedObj.link}" class="btn btn-primary" id="pageLink">The recipe is here!</a>
      </div>
      <button class="btn btn-primary" id="deleteBtn-${i}">Delete</button>
   </div>
  </div>`
//need to make sure the image is ready before loading, otherwise an error occurs

$("#content").append(foodContent); //appends the cards defined above to the content area

//What happens on clicking the 'delete' Button on each recipe card
let delBtn = $(`#deleteBtn-${i}`) 

delBtn.click (function()  {
// console.log('delBtn pressed')
  $(this).parent(".card").remove() //removes the parent 'card', which remove all items in the div
  let removeID = $(this).parent().attr("id") //selects the id of the specific card (which is the same as its key in local storage)
  
  localStorage.removeItem(removeID); //removes the selected item from local storage
})
 }
 })


var dropDown = document.getElementById("myDropdown");
var btn = document.querySelector(".dropbtn");

function drop() {
  dropDown.classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

btn.addEventListener("click", drop);

