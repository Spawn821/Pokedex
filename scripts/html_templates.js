/* ------------------------------------------ */
/* create the pokemoncards on the pokemonlist */
/* ------------------------------------------ */

function getHTMLPokemonList(pokemonName, pokemonImg, i) {
    return /*html*/`
        <div class="pokemonSmallCardMainContainer" id="backroundColor${i}" onclick="renderPokemonCard(${i})">
            <span class="pokemonSmallCardHeadline">${pokemonName}</span>
            <div class="pokemonSmallCardSubContainer">
                <div class="pokemonSmallCardSubContainerLeftArea" id="pokemonTypeList${i}">
                </div>
                <img class="pokemonSmallCardPokemonImg"
                    src="${pokemonImg}">
            </div>
            <img class="pokemonSmallCardPokeballImg" src="./img/pokeball.png">
        </div>
    `;
}


function getStylePokemonSmallCard(color) {
    return /*html*/`
        background-color: ${color}
    `;
}


function getHTMLTypesList(currentPokemonType, styleClass) {
    return /*html*/`
        <span class=${styleClass}>${currentPokemonType}</span>
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

function getHTMLPokemonCard(pokemonName, pokedexNumber, pokemonImg) {
    return /*html*/`
        <div class="min-h" id="pokemonCard">
            <span class="pokemonCardCloseSign" onclick="closePokemonCard()">&#8592</span>
            <div class="pokemonCardMainInformation">
                <div class="pokemonCardMainInformationLeftArea">
                    <span class="pokemonCardHeadline">${pokemonName}</span>
                    <div class="pokemonCardTypes" id="pokemonCardTypes">
                    </div>
                </div>
                <span>${pokedexNumber}</span>
            </div>
            <img class="pokemonCardPokeballImg" src="./img/pokeball.png" alt="">
        </div>
        <div class="min-h" id="pokemonCardText">
            <img id="pokemonImg" src="${pokemonImg}">
        </div>
    `;
}