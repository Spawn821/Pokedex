/* -------------- */
/* help functions */
/* -------------- */

function notToClose(event) {
    event.stopPropagation();
}


async function returnJSON(api) {
    let url = api;
    let response = await fetch(url);
    let data = await response.json();

    return data
}


function findRGBColor(color) {
    for (let i = 0; i < pokemonSpeciesColors.length; i++) {
        const currentColor = pokemonSpeciesColors[i];

        if (currentColor['name'] == color) {
            return currentColor['rgb'];
        }
    }
}


function returnFirstLetterToUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function resetPage() {
    currentPage = APIS[0];
}

function hidePageNavigation() {
    document.getElementById('pageNavigation').classList.add('d-none');
}


function createPokedexNumber(pokedexNumber) {
    let newPokedexNumber = '';
    let interval = 3 - pokedexNumber.length 

    newPokedexNumber += '#';

    for (let i = 0; i < interval; i++) {
        newPokedexNumber += 0;
    }

    newPokedexNumber += pokedexNumber;

    return newPokedexNumber;
}


function fillArrayWithData(dataSource, filterOne, filterTwo) {
    let array = []; 
    for (let i = 0; i < dataSource.length; i++) {
        const data = returnFirstLetterToUpperCase(dataSource[i][filterOne][filterTwo]);
        array.push(data);
    }

    return array;
}


function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}