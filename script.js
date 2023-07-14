let pokemonList = [];
let backgroundColorList = [];

async function load() {
    let test = await returnJSON('https://pokeapi.co/api/v2/pokemon-species/150/');
    let test2 = await returnJSON('https://pokeapi.co/api/v2/pokemon/150/');
    let test3 = await returnJSON('https://pokeapi.co/api/v2/pokemon-color/3/');

    console.log(test);
    console.log(test2);
    console.log(test3);
}


async function loadPokemon() {
    let pokemon = await returnJSON('https://pokeapi.co/api/v2/pokemon?offset=0&limit=150');

    console.log(pokemon);

    for (let i = 0; pokemon['results'].length; i++) {
        const currentPokemon = pokemon['results'][i]['name'];
        let pokemonImg = await returnJSON(pokemon['results'][i]['url']);

        loadBackgroundColor(currentPokemon);

        document.getElementById('pokemonImg').src = pokemonImg['sprites']['other']['official-artwork']['front_default'];
    }
}


async function loadBackgroundColor(currentPokemon) {
    let backgroundColor = await returnJSON('https://pokeapi.co/api/v2/pokemon-color');


    for (let i = 0; i < backgroundColor['results'].length; i++) {
        const color = await returnJSON(backgroundColor['results'][i]['url']);

        for (let j = 0; j < color['pokemon_species'].length; j++) {
            const pokemonSpecies = color['pokemon_species'][j]['name']

            if (pokemonSpecies == currentPokemon) {
                let pokemonBackgroundColor = await returnJSON(color['pokemon_species'][j]['url']);

                console.log(pokemonBackgroundColor['color']['name']);

                document.getElementById('pokemonCard').style = `background-color: ${pokemonBackgroundColor['color']['name']}`;
            }
        }
    }
}


async function returnJSON(api) {
    let url = api;
    let response = await fetch(url);
    let data = await response.json();

    return data
}