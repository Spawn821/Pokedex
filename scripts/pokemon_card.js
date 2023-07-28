async function infoAPIContent() {
    let pokemon = await returnJSON('https://pokeapi.co/api/v2/pokemon/2/');
    let pokemonSpecies = await returnJSON('https://pokeapi.co/api/v2/pokemon-species/1/');
    let pokemonGender = await returnJSON('https://pokeapi.co/api/v2/move/1/');

    console.log(pokemon);
    console.log(pokemonSpecies);
    console.log(pokemonGender);

}


function renderPokemonCard(i) {
    let pokemonCardContent = document.getElementById('pokemonCardContent');
    pokemonCardContent.innerHTML = '';

    pokemonCardContent.innerHTML = getHTMLPokemonCard(pokemonDataLoading[i]['name'],
        pokemonDataLoading[i]['pokedex_number'], pokemonDataLoading[i]['image'])

    document.getElementById('pokemonCard').style = getStylePokemonSmallCard(
        pokemonDataLoading[i]['color']);

    renderPokemonTypesList(pokemonDataLoading[i]['type'],
        'pokemonCardTypes', 'pokemonCardTypesText');

    openPokemonCard();
}


function openPokemonCard() {
    document.getElementById('panel').classList.add('d-none');
    document.getElementById('pokemonCardContent').classList.remove('d-none');
}


function closePokemonCard() {
    document.getElementById('panel').classList.remove('d-none');
    document.getElementById('pokemonCardContent').classList.add('d-none');
}