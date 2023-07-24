/* ------------------------------------------ */
/* create the pokemoncards on the pokemonlist */
/* ------------------------------------------ */

function getHTMLPokemonList(currentPokemon, currentPokemonSpecies, currentPokemonColor, i) {
    let pokedexNumber = currentPokemonSpecies['pokedex_numbers'][0]['entry_number'];
    let pokemonName = returnFirstLetterToUpperCase(currentPokemon['name']);
    let pokemonImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    let pokeball = './img/pokeball.png';

    return /*html*/`
        <div class="pokemonSmallCardMainContainer" id="backroundColor${i}" onclick="renderPokemonCard(${pokedexNumber}, '${currentPokemonColor}')">
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



/* ------------------------------------------- */
/* fill the dropdownlist with all pokemontypes */
/* ------------------------------------------- */

function getHTMLPokemonFilerType(currentPokemonType) {
    return /*html*/`
        <option value="${currentPokemonType}">${currentPokemonType}</option> 
    `;
}



/* --------------------------------------- */
/* show the result from the pokemon filter */
/* --------------------------------------- */

function setFilterResults(id, sign, color) {
    document.getElementById(id).innerHTML = sign;
    document.getElementById(id).style = /*html*/`color: ${color}`;
}


function setStylePageNumber(color) {
    document.getElementById('pageNavigationPageNumber').style = /*html*/`color: ${color}`;
}



/* ------------------------------------------- */
/* create the pokemoncard from current pokemon */
/* ------------------------------------------- */

function getHTMLPokemonCard() {
    return /*html*/`
        <div class="min-h" id="pokemonCard">
            <span class="pokemonCardCloseSign" onclick="closePokemonCard()">&#8592</span>
            <div class="pokemonCardMainInformation">
                <div class="pokemonCardMainInformationLeftArea">
                    <span class="pokemonCardHeadline">Bulbasaur</span>
                    <div class="pokemonCardTypes">
                        <span class="pokemonCardTypesText">Grass</span>
                        <span class="pokemonCardTypesText">Poison</span>
                    </div>
                </div>
                <span>#001</span>
            </div>
        </div>
    `;
}