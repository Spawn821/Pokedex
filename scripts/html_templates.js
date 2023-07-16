function getHTMLPokemonList(currentPokemon, currentPokemonSpecies, i) {
    let pokemonName = returnFirstLetterToUpperCase(currentPokemon['name']);
    let pokemonImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    let pokeball = './img/pokeball.png';

    return /*html*/`
        <div class="pokemonSmallCardMainContainer" id="backroundColor${i}">
            <span class="pokemonSmallCardHeadline">${pokemonName}</span>
            <div class="pokemonSmallCardSubContainer">
                <div class="pokemonSmallCardSubContainerLeftArea" id="eggGroupList${i}">
                </div>
                <img class="pokemonSmallCardPokemonImg"
                    src="${pokemonImg}">
            </div>
            <img class="pokemonSmallCardPokeballImg" src="${pokeball}">
        </div>
    `;
}


function getHTMLTypesList(currentPokemonType) {
    return /*html*/`
        <span class="pokemonSmallCardSubheadline">${currentPokemonType}</span>
    `;
}