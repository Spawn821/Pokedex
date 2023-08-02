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

function getHTMLPokemonCard(pokemonName, pokedexNumber, pokedexNumberClean, pokemonImg) {
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
            <img id="pokemonCardPokemonImg" src=${pokemonImg}>
            <nav class="pokemonCardNav">
                <a class="pokemonCardNavLink" onclick="createPokemonCardPageAbout(${pokedexNumberClean})">About</a>
                <a class="pokemonCardNavLink" onclick="createPokemonCardPageBaseStats(${pokedexNumberClean})">Base Stats</a>
                <a class="pokemonCardNavLink" onclick="createPokemonCardPageEvolution(${pokedexNumberClean})">Evolution</a>
                <a class="pokemonCardNavLink" onclick="createPokemonCardPageMoves(${pokedexNumberClean})">Moves</a>
            </nav>

            <div id="pokemonCardInfo">
                <div class="pokemonCardInfo" w3-include-html="./pokemon_card_pages/pokemon_card_about.html" id="about"></div>
                <div class="pokemonCardInfo d-none" w3-include-html="./pokemon_card_pages/pokemon_card_base_stats.html" id="baseStats"></div>
                <div class="pokemonCardInfo d-none" w3-include-html="./pokemon_card_pages/pokemon_card_evolution.html" id="evolution"></div>
                <div class="pokemonCardInfo d-none" w3-include-html="./pokemon_card_pages/pokemon_card_moves.html" id="moves"></div>
            </div>
        </div>
    `;
}


function getHTMLPokemonCardInfoWindow(path) {
    return /*html*/`
        <div class="pokemonCardInfo" w3-include-html="${path}"></div>
    `;
}


function getHTMLPokemonCardPageAbout(genus, height, weight, abilities, eggGroups) {
    return /*html*/`
        <table>
            <tr>
                <td class="pokemonCardInfoTextLeft">Genera</td>
                <td class="pokemonCardInfoTextRight">${genus}</td>
            </tr>
            <tr>
                <td class="pokemonCardInfoTextLeft">Height</td>
                <td class="pokemonCardInfoTextRight">${returnPokemonHeightInCm(height)} cm</td>
            </tr>
            <tr>
                <td class="pokemonCardInfoTextLeft">Weight</td>
                <td class="pokemonCardInfoTextRight">${returnPokemonWeightInKg(weight).toFixed(1)} kg</td>
            </tr>
            <tr>
                <td class="pokemonCardInfoTextLeft">Abilities</td>
                <td class="pokemonCardInfoTextRight">${returnPokemonAbilitiesAsArray(abilities)}</td>
            </tr>
            <tr>
                <th class="pokemonCardInfoTextTableHeadline">Breeding</th>
            </tr>
            <tr>
                <td class="pokemonCardInfoTextLeft">Egg Groups</td>
                <td class="pokemonCardInfoTextRight">${eggGroups[0]}</td>
            </tr>
            <tr>
                <td class="pokemonCardInfoTextLeft">Egg Cycle</td>
                <td class="pokemonCardInfoTextRight">${eggGroups[1]}</td>
            </tr>
        </table>
    `;
}


function getHTMLPokemonCardPageBaseStats(name, baseStat, progress, color) {
    return /*html*/`
        <tr>
            <td class="pokemonCardInfoTextLeft">${name}</td>
            <td class="pokemonCardInfoTextRight" id="pokemonCardInfoHP">${baseStat}</td>
            <td class="pokemonCardInfoTextRight">
                <div class="pokemonCardInfoTextRightBar" id>
                    <div style="width: ${progress}px; border: 2px solid ${color}"></div>
                </div>
            </td>
        </tr>
    `;
}


function getHTMLPokemonCardPageEvolution(pokemonName, level, pokemonImg) {
    return /*html*/`
        <div class="pokemonCardInfoTextPageThree">
            <div>
                <h3 class="pokemonCardInfoTextPageThreeHeadline">${pokemonName}</h3>
                <div class="pokemonCardInfoTextPageThreeSeparator"></div>
                <span class="pokemonCardInfoTextPageThreeHeadlineSubText">${level}</S></span>
            </div>
            <img id="pokemonCardInfoTextPokemonImg" src=${pokemonImg}>
        </div>
    `;
}