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


async function renderPokemonList() {
    let pokemon = await returnJSON('https://pokeapi.co/api/v2/pokemon/1/');
    let pokemonSpecies = await returnJSON('https://pokeapi.co/api/v2/pokemon-species/1/');
    let color = await returnJSON('https://pokeapi.co/api/v2/pokemon-color/');
    let form = await returnJSON('https://pokeapi.co/api/v2/pokemon-form/1/');
    let item = await returnJSON('https://pokeapi.co/api/v2/item/4/');

    console.log(pokemon);
    console.log(pokemonSpecies);
    console.log(color);
    console.log(form);
    console.log(item);

}


function getHTMLPokemonList() {
    return /*html*/`
        <div class="pokemonSmallCard">
            <div class="pokemonSmallCardText">
                <span id="pokemonSmallCardHeadline">Bisasam</span>
                <span id="pokemonSmallCardSubheadline">Pflanze</span>
            </div>
            <img id="pokemonSmallCardImg"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png">
            <img id="pokeballSmallCardImg" src="./img/pokeball.png">
        </div>
        <div class="pokemonSmallCard">
            <div class="pokemonSmallCardText">
                <span id="pokemonSmallCardHeadline">Bisasam</span>
                <span id="pokemonSmallCardSubheadline">Pflanze</span>
            </div>
            <img id="pokemonSmallCardImg"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png">
            <img id="pokeballSmallCardImg" src="./img/pokeball.png">
        </div>
    `;
}


async function returnJSON(api) {
    let url = api;
    let response = await fetch(url);
    let data = await response.json();

    return data
}