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