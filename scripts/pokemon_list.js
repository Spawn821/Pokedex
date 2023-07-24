let APIS = [
    'https://pokeapi.co/api/v2/pokemon/',
    'https://pokeapi.co/api/v2/type/'
];

let currentPage = '';

let pageNumber = 1;
let pageNumberMax = 10;

let checkFilterName;
let checkFilterType;

let pokemonIndexNumber;

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


/* ---------------------------------------------------- */
/* load all functions that are needed at the first start*/
/* ---------------------------------------------------- */
function init() {
    infoAPIContent();
    resetPage();
    renderPokemonList();
    renderPokemonFilterType();
}


/* -------------------------------------------- */
/* represents all pokemon of the respective page */
/* -------------------------------------------- */
async function renderPokemonList() {
    openLoadingScreen();

    const pokemon = await returnJSON(currentPage);
    let contentPokemonList = document.getElementById('pokemonList');
    contentPokemonList.innerHTML = '';

    await showOnListPokemon(pokemon, contentPokemonList);
    closeLoadingScreen();
}

async function showOnListPokemon(pokemon, contentPokemonList) {
    for (let i = 0; i < pokemon['results'].length; i++) {
        const currentPokemon = await returnJSON(pokemon['results'][i]['url']);
        const currentPokemonSpecies = await returnJSON(currentPokemon['species']['url']);
        const currentPokemonColor = findRGBColor(currentPokemonSpecies['color']['name']);

        contentPokemonList.innerHTML += getHTMLPokemonList(currentPokemon, currentPokemonSpecies, currentPokemonColor, i);

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



/* ------------------------------- */
/* pokemon filter to name and type */
/* ------------------------------- */

async function renderPokemonFilterType() {
    const pokemonType = await returnJSON(APIS[1]);
    let contentPokemonFilterType = document.getElementById('searchPokemonType');
    contentPokemonFilterType.innerHTML = `<option value="">...</option>`;

    for (let i = 0; i < pokemonType['results'].length; i++) {
        const currentPokemonType = pokemonType['results'][i]['name'];

        contentPokemonFilterType.innerHTML += getHTMLPokemonFilerType(currentPokemonType);
    }
}


function renderPokemonListWithFilter() {
    hidePageNavigation();
    resetPage();
    openLoadingScreen();
    signLoadPokemonFilterResult();

    let contentPokemonList = document.getElementById('pokemonList');
    contentPokemonList.innerHTML = '';

    loadPokemonFilterResult(contentPokemonList);
}


async function loadPokemonFilterResult(contentPokemonList) {
    let searchPokemonName = document.getElementById('searchPokemonName').value;
    searchPokemonName = searchPokemonName.toLowerCase();
    let searchPokemonType = document.getElementById('searchPokemonType').value;
    searchPokemonType = searchPokemonType.toLowerCase();

    pokemonIndexNumber = 0;

    for (let k = 1; k < pageNumberMax; k++) {
        const pokemon = await returnJSON(currentPage);
        currentPage = pokemon['next'];

        await showFromPokemonName(contentPokemonList, pokemon, searchPokemonName, searchPokemonType)
    }

    signCheckPokemonFilterResult(contentPokemonList);
    closeLoadingScreen(contentPokemonList);
}


async function showFromPokemonName(contentPokemonList, pokemon, searchPokemonName, searchPokemonType) {
    for (let i = 0; i < pokemon['results'].length; i++) {
        const currentPokemon = await returnJSON(pokemon['results'][i]['url']);
        const currentPokemonSpecies = await returnJSON(currentPokemon['species']['url']);

        if (currentPokemon['name'].toLowerCase().includes(searchPokemonName)) {
            showFromPokemonType(contentPokemonList, currentPokemon, currentPokemonSpecies, searchPokemonType)
        }

        pokemonIndexNumber++;
    }
}


function showFromPokemonType(contentPokemonList, currentPokemon, currentPokemonSpecies, searchPokemonType) {
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        const currentPokemonType = currentPokemon['types'][j]['type']['name'];
        const currentPokemonColor = findRGBColor(currentPokemonSpecies['color']['name']);

        if (currentPokemonType.toLowerCase().includes(searchPokemonType)) {
            contentPokemonList.innerHTML += getHTMLPokemonList(currentPokemon, currentPokemonSpecies, currentPokemonColor, pokemonIndexNumber);

            document.getElementById(`backroundColor${pokemonIndexNumber}`).style = getStylePokemonSmallCard(currentPokemonColor);

            renderPokemonTypesList(currentPokemon, pokemonIndexNumber);

            break;
        }
    }
}


function openLoadingScreen() {
    document.getElementById('loadingScreen').classList.remove('d-none');
}


function closeLoadingScreen(contentPokemonList) {
    document.getElementById('loadingScreen').classList.add('d-none');
}


function signLoadPokemonFilterResult() {
    if (searchPokemonName.value != '') {
        setFilterResults('searchPokemonNameCheck', '...', 'blue')
    }
    if (searchPokemonType.value != '') {
        setFilterResults('searchPokemonTypeCheck', '...', 'blue')
    }
}


function signCheckPokemonFilterResult(contentPokemonList) {
    if (contentPokemonList.innerHTML == '') {
        if (searchPokemonName.value != '') {
            setFilterResults('searchPokemonNameCheck', '&#215', 'red')
        }
        if (searchPokemonType.value != '') {
            setFilterResults('searchPokemonTypeCheck', '&#215', 'red')
        }
    } else {
        if (searchPokemonName.value != '') {
            setFilterResults('searchPokemonNameCheck', '&#10003', 'green')
        }
        if (searchPokemonType.value != '') {
            setFilterResults('searchPokemonTypeCheck', '&#10003', 'green')
        }
    }
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



/* ---------------------------- */
/* navigation from page to page */
/* ---------------------------- */

async function nextPage() {
    setStylePageNumber('black');

    if (pageNumber < pageNumberMax) {
        if (currentPage == null) {
            resetPage();
        }

        let showJSON = await returnJSON(currentPage);
        currentPage = showJSON['next'];

        renderPokemonList();

        pageNumber++;
        document.getElementById('pageNavigationPageNumber').value = pageNumber;
    }
}

async function lastPage() {
    setStylePageNumber('black');

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


async function showPageInput() {
    setStylePageNumber('black');
    let currentPageNumber = document.getElementById('pageNavigationPageNumber').value;

    if (currentPageNumber <= pageNumberMax) {
        resetPage();

        for (let i = 1; i < currentPageNumber; i++) {
            const nextPage = await returnJSON(currentPage);
            currentPage = nextPage['next'];
            pageNumber = i + 1;
        }

        renderPokemonList();
    } else {
        document.getElementById('pageNavigationPageNumber').value = pageNumber;
        setStylePageNumber('red');
    }
}