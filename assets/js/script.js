var searchForm = document.querySelector('#search-form')
var inputTxt = document.querySelector('#inputText')
var array = JSON.parse(localStorage.getItem("History")) || [];

var formSubmitHandler = function (event) {
  event.preventDefault();

  var movieName = inputTxt.value.trim();

  if (movieName) {
    getMovie(movieName);
    getGiphy(movieName);
    populateHistory(movieName)
  }
};

var getMovie = function (movie) {
  var movieKey = '99f8cdba'
  var fetchURL = `http://www.omdbapi.com/?apikey=${movieKey}&s=${movie}`;
  
  fetch(fetchURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });
};

var getGiphy = function (movie) {
  var gifKey = 'fAFBnnC9FOkKZx1M1xDCXcB0TBTgjgCJ'
  var fetchURL = `https://api.giphy.com/v1/channels/search?api_key=${gifKey}&q=${movie}`;
  

fetch(fetchURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });
};

// create function for history Log
var populateHistory (movie){
  Array.push(movieName);
  localStorage.setItem("History", JSON.stringify(array));
  renderHistory();
};

for(let i = 0; i < array.length; i++){
  function(){
    var searchLogEl = document.createElement('button');
    searchLogEl.textContent = array[i];
    searchLogEl.classList.add('btn btn-primary');
    searchLogEl.append(searchLogEl);
  };
}

searchForm.addEventListener('submit', formSubmitHandler);