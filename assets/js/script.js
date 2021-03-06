var searchForm = document.querySelector("#search-form");
var inputTxt = document.querySelector("#inputText");
var movieResults = document.querySelector("#movie-result");
var gifResults = document.querySelector("#gif-result");
var searchLog = document.querySelector(".search-log");
var array = JSON.parse(localStorage.getItem("History")) || [];

// Function that runs when the form is submitted. Passes the search term off to functions to fetch the movie info, giphys, and populates search history

var formSubmitHandler = function (event) {
  event.preventDefault();

  var movieName = inputTxt.value.trim();

  if (movieName) {
    getMovie(movieName);
    getGiphy(movieName);
    populateHistory(movieName);
  }
};

// API fetch that gets information on the movie that was searched. Creates the containers to display them in. Also sets up bootsrap styling  

var getMovie = function (movie) {
  var movieKey = "99f8cdba";
  var fetchURL = `https://www.omdbapi.com/?apikey=${movieKey}&s=${movie}`;

  fetch(fetchURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.Search);
      movieResults.innerHTML = "";
      for (let i = 0; i < data.Search.length; i++) {
        var newDiv = document.createElement("div");
        newDiv.classList.add("card-body", "m-3", "text-center");

        var cardEl = document.createElement("div");
        cardEl.classList.add("card", "row");
        var title = data.Search[i].Title;
        var titleResult = document.createElement("h5");
        titleResult.textContent = title;
        titleResult.classList.add("card-title", "text-center", "col-md-12");
        newDiv.appendChild(titleResult);

        var releaseYear = data.Search[i].Year;
        var releaseYearResult = document.createElement("p");
        releaseYearResult.textContent = releaseYear;
        releaseYearResult.classList.add("card-text", "text-center", "col-md-12");
        newDiv.appendChild(releaseYearResult);

        var imdbLink = data.Search[i].imdbID;
        var imdbLinkResult = document.createElement("a");
        imdbLinkResult.setAttribute("target", "_blank");
        imdbLinkResult.href = `https://www.imdb.com/title/${imdbLink}/`;
        imdbLinkResult.textContent = `https://www.imdb.com/title/${imdbLink}/`;
        imdbLinkResult.classList.add("card-text", "text-center", "col-md-12");
        newDiv.appendChild(imdbLinkResult);

        var poster = data.Search[i].Poster;
        var posterResults = document.createElement("img");
        posterResults.setAttribute("alt", title + " Poster");
        posterResults.src = poster;
        posterResults.classList.add("img-fluid", "col-md-6");
        newDiv.appendChild(posterResults);

        movieResults.appendChild(newDiv);
        movieResults.classList.add("movie-results-card");
      }
    })

    .catch(function (err) {
      console.log(err);
    });
};

// API fetch that gets the giphy results for the search term as well and displays them in a simular way to the movie function
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
      for (let i = 0; i < 10; i++) {
        var newDiv = document.createElement('div');
        newDiv.classList.add("card", "m-3");

        var gif = object.data[i].images.original.url;
        var gifEl = document.createElement("img");
        gifEl.classList.add("gifs", "card-body", "img-fluid");
        gifEl.setAttribute("alt", movie + " gif");
        gifEl.src = gif;

        newDiv.append(gifEl);
        gifResults.appendChild(gifEl);
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

// pulls the stored info from local storage and uses it to create buttons for the local storage. Has an event listener to retrieve the info if the history buttons are pressed

var renderHistory = function () {
  searchLog.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    (function () {
      var histBtn = document.createElement("button");
      histBtn.textContent = array[i];
      histBtn.classList.add("btn", "btn-primary", "p-3", "m-1", "history-btn", "btn-grad");
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
