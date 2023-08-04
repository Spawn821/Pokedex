/* -------------- */
/* help functions */
/* -------------- */

async function infoAPIContent() {
    let pokemon = await returnJSON('https://pokeapi.co/api/v2/pokemon/18/');
    let pokemonSpecies = await returnJSON('https://pokeapi.co/api/v2/pokemon-species/1/');
    let pokemonEvolution = await returnJSON('https://pokeapi.co/api/v2/evolution-chain/1/');
    let pokemonMove = await returnJSON('https://pokeapi.co/api/v2/move/28/');

    console.log(pokemon);
    console.log(pokemonSpecies);
    console.log(pokemonEvolution);
    console.log(pokemonMove);
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
    let arr = [];

    if (str.includes('-')) {
        arr = str.split('-');
    } else if (str.includes('. ')) {
        arr = str.split('. ');
    } else {
        arr = str.split(' ');
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    if (str.includes('-')) {
        return newStr = arr.join('-');
    } else if (str.includes('. ')) {
        return newStr = arr.join('. ');
    } else {
        return newStr = arr.join(' ');
    }
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


function fillArrayWithData(dataSource, filterOne, filterTwo = null) {
    let array = [];
    let data;

    for (let i = 0; i < dataSource.length; i++) {
        if (filterTwo != null) {
            data = returnFirstLetterToUpperCase(dataSource[i][filterOne][filterTwo]);
        } else {
            data = returnFirstLetterToUpperCase(dataSource[i][filterOne]);
        }
        array.push(data);
    }

    return array;
}


function showOrHidePage(id, command) {
    if (command == 'remove') {
        document.getElementById(id).classList.remove('d-none');
    } else {
        document.getElementById(id).classList.add('d-none');
    }
}


async function returnPokemonAndPokemonSpecies(pokedexNumber) {
    const pokemon = await returnJSON(APIS[0] + pokedexNumber);
    const pekemonSpecies = await returnJSON(APIS[1] + pokedexNumber);

    return [pokemon, pekemonSpecies];
}


function returnEnglishName(arr, categorie) {
    let findEn = arr.find(data => data['language']['name'] === 'en');

    return english = returnFirstLetterToUpperCase(findEn[`${categorie}`]);
}