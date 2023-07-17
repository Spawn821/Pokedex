let APIS = [
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151',
    'https://pokeapi.co/api/v2/pokemon-species/'
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


async function infoAPIContent() {
    let pokemon = await returnJSON('https://pokeapi.co/api/v2/pokemon/7');
    let pokemonSpecies = await returnJSON('https://pokeapi.co/api/v2/pokemon-species/10/');
    let color = await returnJSON('https://pokeapi.co/api/v2/pokemon-color/');
    let form = await returnJSON('https://pokeapi.co/api/v2/pokemon-form/1/');
    let item = await returnJSON('https://pokeapi.co/api/v2/item/4/');
    let type = await returnJSON('https://pokeapi.co/api/v2/type/2/');

    console.log(pokemon);
    console.log(pokemonSpecies);
    console.log(color);
    console.log(form);
    console.log(item);
    console.log(type);

}


async function renderPokemonList() {
    const pokemon = await returnJSON(APIS[0]);
    let contentPokemonList = document.getElementById('pokemonList');
    contentPokemonList.innerHTML = '';

    let searchPokemonName = document.getElementById('searchPokemonName').value;
    searchPokemonName = searchPokemonName.toLowerCase();

    for (let i = 0; i < pokemon['results'].length; i++) {
        const currentPokemon = await returnJSON(pokemon['results'][i]['url']);
        const currentPokemonSpecies = await returnJSON(currentPokemon['species']['url']);

        if (currentPokemon['name'].toLowerCase().includes(searchPokemonName)) {
            contentPokemonList.innerHTML += getHTMLPokemonList(currentPokemon, currentPokemonSpecies, i);

            const currentPokemonColor = findRGBColor(currentPokemonSpecies['color']['name']);
            document.getElementById(`backroundColor${i}`).style = getStylePokemonSmallCard(currentPokemonColor);

            renderPokemonTypesList(currentPokemon, i);
        }
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


/* function cleanNumberEndOfString(str) {
    if (Number(str.match(/[0-9]+$/))) {
        return str.slice(0, -1);
    } else {
        return str;
    }
} */