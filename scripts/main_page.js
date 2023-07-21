let APIS = [
    'https://pokeapi.co/api/v2/pokemon/',
    'https://pokeapi.co/api/v2/type/'
];

let currentPage = '';

let pageNumber = 1;
let pageNumberMax = 10;

let checkFilterName;
let checkFilterType;

let pokemonSpeciesColors = [
    {
        'name': 'black',
        'rgb': 'rgb(112,87,70)'
    },
    {
        'name': 'blue',
        'rgb': 'rgb(99,144,240)'
    },
    {
        'name': 'brown',
        'rgb': 'rgb(168,167,122)'
    },
    {
        'name': 'gray',
        'rgb': 'rgb(183,183,206)'
    },
    {
        'name': 'green',
        'rgb': 'rgb(122,199,76)'
    },
    {
        'name': 'pink',
        'rgb': 'rgb(214,133,173)'
    },
    {
        'name': 'purple',
        'rgb': 'rgb(115,86,151)'
    },
    {
        'name': 'red',
        'rgb': 'rgb(238,129,49)'
    },
    {
        'name': 'white',
        'rgb': 'rgb(150,217,214)'
    },
    {
        'name': 'yellow',
        'rgb': 'rgb(247,208,43)'
    }
];


async function infoAPIContent() {
    let pokemon = await returnJSON('https://pokeapi.co/api/v2/pokemon/1/');
    let pokemonSpecies = await returnJSON('https://pokeapi.co/api/v2/pokemon-species/10/');
    let color = await returnJSON('https://pokeapi.co/api/v2/pokemon-color/');
    let form = await returnJSON('https://pokeapi.co/api/v2/pokemon-form/1/');
    let item = await returnJSON('https://pokeapi.co/api/v2/item/4/');
    let type = await returnJSON('https://pokeapi.co/api/v2/type/');
    let secondRange = await returnJSON('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20');

    console.log(pokemon);
    console.log(pokemonSpecies);
    console.log(color);
    console.log(form);
    console.log(item);
    console.log(type);
    console.log(secondRange);

}


function init() {
    infoAPIContent();
    resetPage();
    renderPokemonList();
    renderPokemonFilterType();
}


async function renderPokemonList() {

    const pokemon = await returnJSON(currentPage);
    let contentPokemonList = document.getElementById('pokemonList');
    contentPokemonList.innerHTML = '';

    for (let i = 0; i < pokemon['results'].length; i++) {
        const currentPokemon = await returnJSON(pokemon['results'][i]['url']);
        const currentPokemonSpecies = await returnJSON(currentPokemon['species']['url']);

        contentPokemonList.innerHTML += getHTMLPokemonList(currentPokemon, i);

        const currentPokemonColor = findRGBColor(currentPokemonSpecies['color']['name']);
        document.getElementById(`backroundColor${i}`).style = getStylePokemonSmallCard(currentPokemonColor);

        renderPokemonTypesList(currentPokemon, i);
    }
}


function renderPokemonTypesList(currentPokemon, i) {
    let contentPokemonTypesList = document.getElementById(`pokemonTypeList${i}`);
    contentPokemonTypesList.innerHTML = '';
    const currentPokemonTypes = currentPokemon['types'];

    for (let j = 0; j < currentPokemonTypes.length; j++) {
        let currentPokemonType = returnFirstLetterToUpperCase(currentPokemonTypes[j]['type']['name']);

        contentPokemonTypesList.innerHTML += getHTMLTypesList(currentPokemonType);
    }
}


async function renderPokemonFilterType() {
    const pokemonType = await returnJSON(APIS[1]);
    let contentPokemonFilterType = document.getElementById('searchPokemonType');
    contentPokemonFilterType.innerHTML = `<option value="">...</option>`;

    for (let i = 0; i < pokemonType['results'].length; i++) {
        const currentPokemonType = pokemonType['results'][i]['name'];

        contentPokemonFilterType.innerHTML += getHTMLPokemonFilerType(currentPokemonType);
    }
}


async function renderPokemonListWithFilter() {
    hidePageNavigation();
    resetPage();
    clearPokemonFilterResult();

    let contentPokemonList = document.getElementById('pokemonList');
    contentPokemonList.innerHTML = '';

    let searchPokemonName = document.getElementById('searchPokemonName').value;
    searchPokemonName = searchPokemonName.toLowerCase();
    let searchPokemonType = document.getElementById('searchPokemonType').value;
    searchPokemonType = searchPokemonType.toLowerCase();

    let pokemonNumber = 0;

    for (let k = 1; k < pageNumberMax; k++) {
        const pokemon = await returnJSON(currentPage);
        currentPage = pokemon['next'];

        for (let i = 0; i < pokemon['results'].length; i++) {
            const currentPokemon = await returnJSON(pokemon['results'][i]['url']);
            const currentPokemonSpecies = await returnJSON(currentPokemon['species']['url']);

            if (currentPokemon['name'].toLowerCase().includes(searchPokemonName)) {

                for (let j = 0; j < currentPokemon['types'].length; j++) {
                    const currentPokemonType = currentPokemon['types'][j]['type']['name'];

                    if (currentPokemonType.toLowerCase().includes(searchPokemonType)) {
                        contentPokemonList.innerHTML += getHTMLPokemonList(currentPokemon, pokemonNumber);

                        const currentPokemonColor = findRGBColor(currentPokemonSpecies['color']['name']);
                        document.getElementById(`backroundColor${pokemonNumber}`).style = getStylePokemonSmallCard(currentPokemonColor);

                        renderPokemonTypesList(currentPokemon, pokemonNumber);

                        break;
                    }
                }
            }

            pokemonNumber++;
        }
    }

    checkPokemonFilterResult(contentPokemonList);
}


function clearPokemonFilterResult() {
    checkFilterName = document.getElementById('searchPokemonNameCheck');
    checkFilterName.innerHTML = '';
    checkFilterType = document.getElementById('searchPokemonTypeCheck');
    checkFilterType.innerHTML = '';
}


function checkPokemonFilterResult(contentPokemonList) {
    if (contentPokemonList.innerHTML == '') {
        if (searchPokemonName.value != '') {
            setFilterResults(checkFilterName, '&#215', 'red')
        }
        if (searchPokemonType.value != '') {
            setFilterResults(checkFilterType, '&#215', 'red')
        }
    } else {
        if (searchPokemonName.value != '') {
            setFilterResults(checkFilterName, '&#10003', 'green')
        }
        if (searchPokemonType.value != '') {
            setFilterResults(checkFilterType, '&#10003', 'green')
        }
    }
}


function setFilterResults(varibale, sign, color) {
    varibale.innerHTML = sign;
    varibale.style = /*html*/`color: ${color}`;
}


function showMenuFilterPokemon() {
    document.getElementById('menuFilterPokemon').classList.remove('d-none');
    document.getElementById('mainPictureMenu').classList.remove('trans-180deg');
    document.getElementById('mainPictureMenu').classList.add('trans-90deg');
}


function closeMenuFilterPokemon() {
    document.getElementById('menuFilterPokemon').classList.add('d-none');
    document.getElementById('mainPictureMenu').classList.add('trans-180deg');
    document.getElementById('mainPictureMenu').classList.remove('trans-90deg');
}


async function nextPage() {
    document.getElementById('pageNavigationPageNumber').style = 'color: black';

    if (pageNumber < pageNumberMax) {
        if (currentPage == null) {
            currentPage = APIS[0];
        }

        let showJSON = await returnJSON(currentPage);
        currentPage = showJSON['next'];
        pageNumber++;

        renderPokemonList();
        document.getElementById('pageNavigationPageNumber').value = pageNumber;
    }
}

async function lastPage() {
    document.getElementById('pageNavigationPageNumber').style = 'color: black';

    if (currentPage != null) {
        let showJSON = await returnJSON(currentPage);
        currentPage = showJSON['previous'];
    }

    if (currentPage != null) {
        renderPokemonList();
        pageNumber--;
        document.getElementById('pageNavigationPageNumber').value = pageNumber;
    }
}


async function showPage() {
    document.getElementById('pageNavigationPageNumber').style = 'color: black';
    let currentPageNumber = document.getElementById('pageNavigationPageNumber').value;

    if (currentPageNumber <= pageNumberMax) {

        currentPage = APIS[0];

        try {
            for (let i = 1; i < currentPageNumber; i++) {
                const nextPage = await returnJSON(currentPage);
                currentPage = nextPage['next'];
                pageNumber = i + 1;
            }

            renderPokemonList();
        } catch {
            alert('Page not found!')
        }
    } else {
        document.getElementById('pageNavigationPageNumber').value = pageNumber;
        document.getElementById('pageNavigationPageNumber').style = 'color: red';
    }
}


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