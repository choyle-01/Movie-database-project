var gifKey = 'fAFBnnC9FOkKZx1M1xDCXcB0TBTgjgCJ'

var getMovie = function () {
var movieKey = '99f8cdba'
var fetchURL = `http://www.omdbapi.com/?apikey=${movieKey}&`;

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

getMusic();