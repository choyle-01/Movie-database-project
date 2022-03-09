var searchForm = document.querySelector('#search-form')
var inputTxt = document.querySelector('#inputText')

var formSubmitHandler = function (event) {
  event.preventDefault();

  var movieName = inputTxt.value.trim();

  if (movieName) {
    getMovie(movieName);
    getgiphy(movieName);
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
}
var getgiphy = function (movie) {
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
}

searchForm.addEventListener('submit', formSubmitHandler);