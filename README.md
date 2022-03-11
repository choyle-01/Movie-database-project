# Project proposal
_Authors, Benjamin Zah & Michael Hoyle_

​
Our goal is to make a web application that takes searched movie from database and populates the app with gifs from the movie and related actors. 
​
## APIs
​
* [OMDB](https://www.omdbapi.com/)
* [Giphy](https://developers.giphy.com/docs/api#quick-start-guide)

_both APIs are free of use for these requirements_
​
## Future functions
​
* User able to search/find desired movie
* User will then be able to target selected movie
* User is then able to search through related gifs below
* More features will be implemented after

var type = data.Search[i].Type;
    var typeResult = document.createElement("p");
    typeResult.textContent = type;
    typeResult.classList.add('typeClass');
    movieResults.append(typeResult);