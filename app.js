// Docs & References
// https://en.wikipedia.org/wiki/Special:Random
// https://www.mediawiki.org/wiki/API:Main_page

/* global $ */

var searchBar = document.getElementById('searchBar');
var submitBtn = document.getElementById('submitBtn');
var query = searchBar.value;

var api = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="
var cb = '&callback=JSON_CALLBACK';
var url = ''; //set url from outside addEventListener function

submitBtn.addEventListener('click', function(e) {
    $("ul").empty();
    e.preventDefault();
    var apiUrl = api + "%27" + searchBar.value.replace(/[\s]/g, '%20') + "%27"; //replace whitespaces with html spaces
    console.log('User Query:', searchBar.value); //log the users search query
    searchBar.value = '';
    url = apiUrl;
    searchResults(apiUrl);
    // displayResults();
});

function searchResults(url) {
    $.ajax({
        url: url,
        success: function(result) {

            console.log('Result:', result); //returns full result object
            console.log('Pages:', result.query.pages); //returns result pages within result object

            for (var i in result.query.pages) { //loop through all pages
                console.log(result.query.pages[i].title);
                var searchResults = document.getElementById('searchResults');
                var resultsLi = document.createElement('li');
                resultsLi.className = 'singleResult';
                resultsLi.innerHTML = '<p>' + result.query.pages[i].title + '</p>';
                searchResults.appendChild(resultsLi);
                // console.log(result.query.pages[i].extract);
            }
            // console.log('Stringify:', JSON.stringify(result));
        }
    });
};
