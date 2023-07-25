async function infoAPIContent() {
    let pokemon = await returnJSON('https://pokeapi.co/api/v2/pokemon/1/');
    let pokemonSpecies = await returnJSON('https://pokeapi.co/api/v2/pokemon-species/1/');
    let evolutionChain = await returnJSON('https://pokeapi.co/api/v2/evolution-chain/1/');
    let color = await returnJSON('https://pokeapi.co/api/v2/pokemon-color/');
    let form = await returnJSON('https://pokeapi.co/api/v2/pokemon-form/1/');
    let item = await returnJSON('https://pokeapi.co/api/v2/item/4/');
    let type = await returnJSON('https://pokeapi.co/api/v2/type/');
    let secondRange = await returnJSON('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20');

    console.log(pokemon);
    console.log(pokemonSpecies);
    console.log(evolutionChain);
    console.log(color);
    console.log(form);
    console.log(item);
    console.log(type);
    console.log(secondRange);

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