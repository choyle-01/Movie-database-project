 
var getMusic = function () {
var fetchURL = 'https://api.uberchord.com/v1';

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