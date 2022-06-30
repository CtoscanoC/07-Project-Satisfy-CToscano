let searchButton = $(".btn")

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
    `<div class="card col-3 offset-0.5" id="${query}-${i}" style="width: 18rem;">
      <img src="${data.hits[i].recipe.image}" class="card-img-top" id="foodImg" alt="${data.hits[i].recipe.label}">
      <div class="card-body">
        <h5 class="card-title" id="foodTitle">${data.hits[i].recipe.label}</h5>
        <p class="card-text" id="foodLabel">Food Class:
        ${data.hits[i].recipe.dietLabels}
        </p>
        <a href="${data.hits[i].recipe.url}" target="_blank" class="btn btn-primary">The recipe is here!</a>
      </div>
      <button class="btn btn-primary" id="saveMe-${i}">Save</button>
    </div>
  </div>`


$("#content").append(foodContent); //appends the cards defined above to the content area

//Defines what happens on clicking the 'Save' button at the bottom of each recipe card
  let saveBtn = $(`#saveMe-${i}`)
  saveBtn.click (function()  {
  saveBtn.html("Saved");
  saveBtn.css("background-color", "grey");
  console.log('saveBtn pressed')
  let savedTitle = $(this).siblings(".card-body").children("#foodTitle").html(); //defines the corresponding recipe title to the save button
  let savedLabel = $(this).siblings(".card-body").children("#foodLabel").html(); //defines the corresponding health label to the save button
  let savedUrl = $(this).siblings(".card-body").children("a").attr('href'); //defines the corresponding recipe link to the save button
  let savedImg = $(this).siblings("#foodImg").attr('src');  //defines the corresponding image to the save button
 
  
  let foodId = $(this).parent().attr("id");

  let foodObject = {'title':savedTitle, 'label':savedLabel, 'link': savedUrl, 'image': savedImg}; 
  //sets the above defined variables into an object

  localStorage.setItem(foodId,JSON.stringify(foodObject)) //saves the foodObject object as a string into local storage

});

}
}
//What happens on clicking the 'Get Saved Recipes' Button
let savedRecipesBtn = $('.savedRecipesBtn')
savedRecipesBtn.click (function(){
  $("#content").empty() //empties the content area

  let keys = Object.keys(localStorage); //sets all the keys from local storage to a single variable

for (var i = 0; i <= keys.length; i++){
  let savedItem = localStorage.getItem(keys[i]) //pulls all the objects from local storage
  let savedObj = JSON.parse(savedItem) //converts local storage data into an object

   //defines card content, card content is drawn from the objects pulled from local storage
  var foodContent = 
  `<div class="card col-3 offset-0.5" id="${keys[i]}" style="width: 18rem;">
      <img src="${savedObj.image}" class="card-img-top" id="foodImg" alt="${savedObj.title}">
      <div class="card-body">
        <h5 class="card-title" id="foodTitle">${savedObj.title}</h5>
       <p class="card-text" id="foodLabel">
        ${savedObj.label}
        </p>
        <a href="${savedObj.link}" class="btn btn-primary" id="foodLink">The recipe is here!</a>
      </div>
      <button class="btn btn-primary" id="deleteBtn-${i}">Delete</button>
   </div>
  </div>`

$("#content").append(foodContent); //appends the cards defined above to the content area

let delBtn = $(`#deleteBtn-${i}`)
delBtn.click (function()  {
console.log('delBtn pressed')
  $(this).parent(".card").remove()
  let removeID = $(this).parent().attr("id")
  console.log(removeID)
  localStorage.removeItem(removeID);
})
}
console.log();

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

