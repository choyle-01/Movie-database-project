var searchForm = document.querySelector('#search-form')
var inputTxt = document.querySelector('#inputText')
var movieResults = document.querySelector('#movie-result')
var array = JSON.parse(localStorage.getItem("History")) || [];

var formSubmitHandler = function (event) {
  event.preventDefault();

  var movieName = inputTxt.value.trim();

  if (movieName) {
    getMovie(movieName);
    getGiphy(movieName);
    // populateHistory(movieName)
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
    console.log(data.Search);
    movieResults.innerHTML = '';
    for (let i = 0; i < data.Search.length; i++) {
      var title = (data.Search[i].Title);
      var titleResult = document.createElement('h5')
      titleResult.textContent = title;
      movieResults.append(titleResult);

      var type = (data.Search[i].Type);
      var typeResult = document.createElement('p');
      typeResult.textContent = type;
      movieResults.append(typeResult);

      var releaseYear = (data.Search[i].Year);
      var releaseYearResult = document.createElement('p');
      releaseYearResult.textContent = releaseYear;
      movieResults.append(releaseYearResult);

      var imdbLink = (data.Search[i].imdbID)
      var imdbLinkResult = document.createElement('a');
      imdbLinkResult.setAttribute('target', '_blank')
      imdbLinkResult.href = `https://www.imdb.com/title/${imdbLink}/`;
      imdbLinkResult.textContent = `https://www.imdb.com/title/${imdbLink}/`;
      movieResults.append(imdbLinkResult);

      var poster = (data.Search[i].Poster);
      var posterResults = document.createElement('img');
      posterResults.setAttribute('alt', title + ' Poster')
      posterResults.src= poster;
      movieResults.append(posterResults);
    }
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
// var populateHistory = function (movieName) {
//   Array.push(movieName);
//   localStorage.setItem("History", JSON.stringify(array));
//   renderHistory();
//   for(let i = 0; i < array.length; i++){
//     (function(){
//       var searchLogEl = document.createElement('button');
//       searchLogEl.textContent = array[i];
//       searchLogEl.classList.add('btn btn-primary');
//       searchLogEl.append(searchLogEl);
//     })();
//   }
// };


searchForm.addEventListener('submit', formSubmitHandler);