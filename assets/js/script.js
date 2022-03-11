var searchForm = document.querySelector("#search-form");
var inputTxt = document.querySelector("#inputText");
var movieResults = document.querySelector("#movie-result");
var gifResults = document.querySelector("#gif-result");
var searchLog = document.querySelector(".search-log");
var array = JSON.parse(localStorage.getItem("History")) || [];

buildMovieCard() {
  // var cardEl =  document.createElement("div");
  // cardEl.classList.add('card', 'row');
  var title = data.Search[i].Title;
  var titleResult = document.createElement("h5");
  titleResult.textContent = title;
  titleResult.classList.add('card-title', 'text-center', 'col-md-4');
  movieResults.append(titleResult);
  
  // var type = data.Search[i].Type;
  // var typeResult = document.createElement("p");
  // typeResult.textContent = type;
  // typeResult.classList.add('typeClass');
  // movieResults.append(typeResult);
  
  var releaseYear = data.Search[i].Year;
  var releaseYearResult = document.createElement("p");
  releaseYearResult.textContent = releaseYear;
  releaseYearResult.classList.add('card-text', 'text-center', 'col-md-4');
  movieResults.append(releaseYearResult);
  
  var imdbLink = data.Search[i].imdbID;
  var imdbLinkResult = document.createElement("a");
  imdbLinkResult.setAttribute("target", "_blank");
  imdbLinkResult.href = `https://www.imdb.com/title/${imdbLink}/`;
  imdbLinkResult.textContent = `https://www.imdb.com/title/${imdbLink}/`;
  imdbLinkResult.classList.add('card-text', 'text-center', 'col-md-4')
  movieResults.append(imdbLinkResult);
  
  var poster = data.Search[i].Poster;
  var posterResults = document.createElement("img");
  posterResults.setAttribute("alt", title + " Poster");
  posterResults.src = poster;
  posterResults.classList.add('img-fluid', 'rounded-start', 'col-md-4');
  movieResults.append(posterResults);
};


var formSubmitHandler = function (event) {
  event.preventDefault();

  var movieName = inputTxt.value.trim();

  if (movieName) {
    getMovie(movieName);
    getGiphy(movieName);
    populateHistory(movieName);
  }
};

// getMovie fetch
var getMovie = function (movie) {
  var movieKey = "99f8cdba";
  var fetchURL = `http://www.omdbapi.com/?apikey=${movieKey}&s=${movie}`;

  fetch(fetchURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.Search);
      movieResults.innerHTML = "";
      for (let i = 0; i < data.Search.length; i++) {
        buildMovieCard(data[i]);
      }
    })

    .catch(function (err) {
      console.log(err);
    });
};

// getGiphy fetch
var getGiphy = function (movie) {
  var gifKey = "fAFBnnC9FOkKZx1M1xDCXcB0TBTgjgCJ";
  var fetchURL = `https://api.giphy.com/v1/gifs/search?api_key=${gifKey}&q=${movie}`;

  fetch(fetchURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (object) {
      gifResults.innerHTML = "";
      console.log(object);
      for (let i = 0; i < 5; i++) {
        var gif = object.data[i].images.original.url;
        var gifEl = document.createElement("img");
        gifEl.classList.add("gifs");
        gifEl.setAttribute("alt", movie + " gif");
        gifEl.src = gif;

        gifResults.append(gifEl);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};
console.log(getGiphy);

// create function for history Log
var populateHistory = function (movie) {
  array.push(movie);
  window.localStorage.setItem("History", JSON.stringify(array));
  renderHistory();
};

var renderHistory = function () {
  searchLog.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    (function () {
      var histBtn = document.createElement("button");
      histBtn.textContent = array[i];
      histBtn.classList.add("btn", "btn-primary", "p-3", "m-1");
      searchLog.append(histBtn);

      histBtn.addEventListener("click", function () {
        getMovie(histBtn.innerText);
        getGiphy(histBtn.innerText);
      });
    })();
  }
};

renderHistory();
searchForm.addEventListener("submit", formSubmitHandler);
