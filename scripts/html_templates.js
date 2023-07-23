function getHTMLPokemonList(currentPokemon, i) {
    let pokemonName = returnFirstLetterToUpperCase(currentPokemon['name']);
    let pokemonImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    let pokeball = './img/pokeball.png';

    return /*html*/`
        <div class="pokemonSmallCardMainContainer" id="backroundColor${i}" onclick="openPokemonCard(${i + 1})">
            <span class="pokemonSmallCardHeadline">${pokemonName}</span>
            <div class="pokemonSmallCardSubContainer">
                <div class="pokemonSmallCardSubContainerLeftArea" id="pokemonTypeList${i}">
                </div>
                <img class="pokemonSmallCardPokemonImg"
                    src="${pokemonImg}">
            </div>
            <img class="pokemonSmallCardPokeballImg" src="${pokeball}">
        </div>
    `;
}


function getStylePokemonSmallCard(color) {
    return /*html*/`
        background-color: ${color}
    `;
}


function getHTMLTypesList(currentPokemonType) {
    return /*html*/`
        <span class="pokemonSmallCardSubheadline">${currentPokemonType}</span>
    `;
}


function getHTMLPokemonFilerType(currentPokemonType) {
    return /*html*/`
        <option value="${currentPokemonType}">${currentPokemonType}</option> 
    `;
}


function setFilterResults(id, sign, color) {
    document.getElementById(id).innerHTML = sign;
    document.getElementById(id).style = /*html*/`color: ${color}`;
}


function setStylePageNumber(color) {
    document.getElementById('pageNavigationPageNumber').style = /*html*/`color: ${color}`;
}