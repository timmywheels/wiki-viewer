// Docs & References
// https://en.wikipedia.org/wiki/Special:Random
// https://www.mediawiki.org/wiki/API:Main_page

/* global $ */

var searchBar = document.getElementById('searchBar');
var submitBtn = document.getElementById('submitBtn');
var query = searchBar.value;

//https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=18630637&inprop=url


// var api = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&inprop=url&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="

var api = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=35&inprop=url&gsrsearch="

var cb = '&callback=JSON_CALLBACK';
var url = ''; //set url from outside addEventListener function

submitBtn.addEventListener('click', function(e) {
    $("ul").empty();
    e.preventDefault();

    if (searchBar.value === '') {
        searchBar.classList.add('animated', 'shake', 'alert');

        setTimeout(function() {
            searchBar.classList.remove('animated', 'shake', 'alert');
        }, 750);
    }
    else {
        var apiUrl = api + "%27" + searchBar.value.replace(/[\s]/g, '%20') + "%27"; //replace whitespaces with html spaces
        console.log('User Query:', searchBar.value); //log the users search query
        searchBar.value = '';
        url = apiUrl;
        searchResults(apiUrl);

    }
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

                resultsLi.style.display = 'none'; //wrap url around li

                resultsLi.innerHTML = '<p>' + result.query.pages[i].title.toLowerCase() + '</p>';
                searchResults.appendChild(resultsLi);
                $(resultsLi).wrap(function() {
                    return '<a target="_blank" href="https://en.wikipedia.org/wiki/' + result.query.pages[i].title + '"></a>';
                });
                $(resultsLi).fadeIn(1000);

                // hoverBtns();

                // console.log(result.query.pages[i].extract);
            }

        }
    });
};

// function hoverBtns() {
//     $('li.singleResult').hover(
//         function() { $(this).toggleClass('animated pulse') },
//     );
// }
