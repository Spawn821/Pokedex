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


async function renderPokemonCard(currentPokedexNumber, currentPokemonColor) {
    let currentPokemon = await returnJSON(APIS[0] + currentPokedexNumber);
    let pokemonImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];

    document.getElementById('pokemonCard').style = getStylePokemonSmallCard(currentPokemonColor);
    document.getElementById('pokemonImg').src = pokemonImg;

    openPokemonCard();
}


async function openPokemonCard() {
    document.getElementById('panel').classList.add('d-none');
    document.getElementById('pokemonCard').classList.remove('d-none');
    document.getElementById('pokemonCardText').classList.remove('d-none');
}


async function closePokemonCard() {
    document.getElementById('panel').classList.remove('d-none');
    document.getElementById('pokemonCard').classList.add('d-none');
    document.getElementById('pokemonCardText').classList.add('d-none');
}