let APIS = [
    'https://pokeapi.co/api/v2/pokemon/',
    'https://pokeapi.co/api/v2/pokemon-species/',
    'https://pokeapi.co/api/v2/type/'
];

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

let pokemonDataLoading = [];

let currentPage = '';

let pageNumber = 1;
let pageNumberMax = 10;

let checkFilterName;
let checkFilterType;

let pokemonIndexNumber;



/* ---------------------------------------------------- */
/* load all functions that are needed at the first start*/
/* ---------------------------------------------------- */

function init() {
    resetPage();
    renderPokemonList();
    renderPokemonFilterType();
}


/* -------------------------------------------- */
/* represents all pokemon of the respective page */
/* -------------------------------------------- */

async function renderPokemonList() {
    showOrHidePage('loadingScreen', 'remove');
    resetLoadingBar();
    clearPokemonDataInArray();

    const pokemons = await returnJSON(currentPage);
    let contentPokemonList = document.getElementById('pokemonList');
    contentPokemonList.innerHTML = '';

    await showOnListPokemon(pokemons, contentPokemonList);
    showOrHidePage('loadingScreen', 'add');
}

async function showOnListPokemon(pokemons, contentPokemonList) {
    for (let i = 0; i < pokemons['results'].length; i++) {
        const currentPokemon = await returnJSON(pokemons['results'][i]['url']);

        await loadPokemonDataInArray(currentPokemon);

        contentPokemonList.innerHTML += getHTMLPokemonList(
            pokemonDataLoading[i]['name'], pokemonDataLoading[i]['image'], i);

        document.getElementById(`backroundColor${i}`).style = getStylePokemonSmallCard(
            pokemonDataLoading[i]['color']);

        renderPokemonTypesList(pokemonDataLoading[i]['type'],
        `pokemonTypeList${i}`, 'pokemonSmallCardSubheadline');

        fillLaodingBar(i, pokemons['results'].length);
    }
}


function renderPokemonTypesList(pokemonTypes, id, styleClass) {
    let contentPokemonTypesList = document.getElementById(id);
    contentPokemonTypesList.innerHTML = '';

    for (let j = 0; j < pokemonTypes.length; j++) {
        let currentPokemonType = pokemonTypes[j];

        contentPokemonTypesList.innerHTML += getHTMLTypesList(currentPokemonType, styleClass);
    }
}


function clearPokemonDataInArray() {
    pokemonDataLoading = [];
}


async function loadPokemonDataInArray(currentPokemon) {
    const [currentPokemonName, currentPokemonImg, currentPokemonTypesIndex, currentPokemonAbilitiesIndex] = await returnDataFromPokemon(currentPokemon);
    const [currentPokemonColor, currentPokedexNumber] = await returnDataFromPokemonSpecies(currentPokemon);

    pokemonDataLoading.push({
        'name': currentPokemonName,
        'type': currentPokemonTypesIndex,
        'pokedex_number': currentPokedexNumber,
        'image': currentPokemonImg,
        'color': currentPokemonColor,
    });
}


async function returnDataFromPokemon(currentPokemon) {
    const currentPokemonName = returnFirstLetterToUpperCase(currentPokemon['name']);
    const currentPokemonImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    const currentPokemonTypes = currentPokemon['types'];
    let currentPokemonTypesIndex = fillArrayWithData(currentPokemonTypes, 'type', 'name');

    return [currentPokemonName, currentPokemonImg, currentPokemonTypesIndex];
}


async function returnDataFromPokemonSpecies(currentPokemon) {
    const currentPokemonSpecies = await returnJSON(currentPokemon['species']['url']);
    const currentPokemonColor = findRGBColor(currentPokemonSpecies['color']['name']);
    let currentPokedexNumber = currentPokemonSpecies['pokedex_numbers'][0]['entry_number'];

    return [currentPokemonColor, currentPokedexNumber];
}



/* ------------------------------- */
/* pokemon filter to name and type */
/* ------------------------------- */

async function renderPokemonFilterType() {
    const pokemonType = await returnJSON(APIS[2]);
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
    showOrHidePage('loadingScreen', 'remove');
    resetLoadingBar();
    signLoadPokemonFilterResult();
    clearPokemonDataInArray();

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
        const pokemons = await returnJSON(currentPage);
        currentPage = pokemons['next'];

        await showFromPokemonName(contentPokemonList, pokemons, searchPokemonName, searchPokemonType)

        fillLaodingBar(k, pageNumberMax);
    }

    signCheckPokemonFilterResult(contentPokemonList);
    showOrHidePage('loadingScreen', 'add');
}


async function showFromPokemonName(contentPokemonList, pokemons, searchPokemonName, searchPokemonType) {
    for (let i = 0; i < pokemons['results'].length; i++) {
        const currentPokemon = await returnJSON(pokemons['results'][i]['url']);

        await loadPokemonDataInArray(currentPokemon);

        if (pokemonDataLoading[pokemonIndexNumber]['name'].toLowerCase().includes(searchPokemonName)) {
            showFromPokemonType(contentPokemonList, searchPokemonType)
        }

        pokemonIndexNumber++;
    }
}


function showFromPokemonType(contentPokemonList, searchPokemonType) {
    for (let j = 0; j < pokemonDataLoading[pokemonIndexNumber]['type'].length; j++) {
        const currentPokemonType = pokemonDataLoading[pokemonIndexNumber]['type'][j];

        if (currentPokemonType.toLowerCase().includes(searchPokemonType)) {
        contentPokemonList.innerHTML += getHTMLPokemonList(
            pokemonDataLoading[pokemonIndexNumber]['name'], pokemonDataLoading[pokemonIndexNumber]['image'],
            pokemonIndexNumber);

        document.getElementById(`backroundColor${pokemonIndexNumber}`).style = getStylePokemonSmallCard(
            pokemonDataLoading[pokemonIndexNumber]['color']);

        renderPokemonTypesList(pokemonDataLoading[pokemonIndexNumber]['type'],
        `pokemonTypeList${pokemonIndexNumber}`, 'pokemonSmallCardSubheadline');

            break;
        }
    }
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

    if (currentPageNumber > 0 && currentPageNumber <= pageNumberMax) {
        resetPage();

        for (let i = 1; i < currentPageNumber; i++) {
            const nextPage = await returnJSON(currentPage);
            currentPage = nextPage['next'];
            pageNumber = i + 1;
        }

        renderPokemonList();
    } else {
        document.getElementById('pageNavigationPageNumber').value = pageNumber;
        document.getElementById('pageNavigationPageNumber').blur();
        setStylePageNumber('red');
    }
}