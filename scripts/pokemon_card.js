/* ---------------------------------------------- */
/* show the clicked current pokemon with all data */
/* ---------------------------------------------- */

function renderPokemonCard(i) {
    let pokemonCardContent = document.getElementById('pokemonCardContent');
    pokemonCardContent.innerHTML = '';
    let pokedexNumber = createPokedexNumber(pokemonDataLoading[i]['pokedex_number'].toString());

    pokemonCardContent.innerHTML = getHTMLPokemonCard(pokemonDataLoading[i]['name'],
        pokedexNumber, pokemonDataLoading[i]['pokedex_number'], pokemonDataLoading[i]['image'])

    document.getElementById('pokemonCard').style = getStylePokemonSmallCard(
        pokemonDataLoading[i]['color']);

    renderPokemonTypesList(pokemonDataLoading[i]['type'],
        'pokemonCardTypes', 'pokemonCardTypesText');

    includeHTML()
    createPokemonCardPageAbout(pokemonDataLoading[i]['pokedex_number']);
    setTimeout(openPokemonCard, 150);
}


function openPokemonCard() {
    document.getElementById('panel').classList.add('d-none');
    document.getElementById('pokemonCardContent').classList.remove('d-none');
}


function closePokemonCard() {
    document.getElementById('panel').classList.remove('d-none');
    document.getElementById('pokemonCardContent').classList.add('d-none');
}



/* ------------------------- */
/* pokemon card page 'about' */
/* ------------------------- */

async function createPokemonCardPageAbout(pokedexNumber) {
    let pokemonCardInfoContent = document.getElementById('pokemonCardInfo');
    pokemonCardInfoContent.innerHTML = '';
    const [pokemon, pokemonSpecies] = await returnPokemonAndPokemonSpecies(pokedexNumber);
    const genus = returnPokemonGenus(pokemonSpecies['genera']);
    const height = pokemon['height'];
    const weight = pokemon['weight'];
    const abilities = pokemon['abilities'];
    const eggGroups = returnPokemonEggGroupsAsArray(pokemonSpecies['egg_groups']);

    pokemonCardInfoContent.innerHTML = getHTMLPokemonCardPageAbout(genus, height, weight, abilities, eggGroups);
}


function returnPokemonGenus(genera) {
    let generaEn = genera.find(data => data['language']['name'] === 'en');

    return genus = returnFirstLetterToUpperCase(generaEn['genus']);
}


function returnPokemonHeightInCm(height) {
    return height * 10;
}


function returnPokemonWeightInKg(weight) {
    return weight * 0.1;
}


function returnPokemonAbilitiesAsArray(abilities) {
    let extractAbilities = [];

    for (let i = 0; i < abilities.length; i++) {
        const ability = abilities[i]['ability']['name'];

        if (i > 0) {
            extractAbilities.push(' ' + returnFirstLetterToUpperCase(ability));
        } else {
            extractAbilities.push(returnFirstLetterToUpperCase(ability));
        }

        if (i == 1) {
            break;
        }
    }

    return extractAbilities;
}


function returnPokemonEggGroupsAsArray(eggGroups) {
    let extractEggGroups = fillArrayWithData(eggGroups, 'name');
    let newEggGroups = [];

    for (let i = 0; i < extractEggGroups.length; i++) {
        let eggGroup = extractEggGroups[i];

        if (eggGroup.endsWith('1')) {
            eggGroup = eggGroup.slice(0, eggGroup.length - 1);
        }

        newEggGroups.push(eggGroup);
    }

    if (newEggGroups.length == 1) {
        newEggGroups.push('-');
    }

    return newEggGroups;
}



/* ------------------------------ */
/* pokemon card page 'base stats' */
/* ------------------------------ */

async function createPokemonCardPageBaseStats(pokedexNumber) {
    let pokemonCardInfoContent = document.getElementById('pokemonCardInfo');
    pokemonCardInfoContent.innerHTML = '';
    let pokemonCardPageBaseStats = document.createElement('table');
    const [pokemon, pokemonSpecies] = await returnPokemonAndPokemonSpecies(pokedexNumber);
    const pokemonStats = pokemon['stats'];
    let resultProgress = 0;
    let pokemonStatsTotal = 0;

    addBaseStats(pokemonCardInfoContent, pokemonCardPageBaseStats, pokemonStats, resultProgress, pokemonStatsTotal);
}


function addBaseStats(pokemonCardInfoContent, pokemonCardPageBaseStats, pokemonStats, resultProgress, pokemonStatsTotal) {
    for (let i = 0; i < pokemonStats.length; i++) {
        let pokemonBaseStat = pokemonStats[i]['base_stat'];
        let pokemonStatName = pokemonStats[i]['stat']['name'];

        pokemonStatName = returnFirstLetterToUpperCase(controleLengthOfBaseStatName(pokemonStatName));

        resultProgress = pokemonCardBaseStatsProgress(pokemonBaseStat, 100);
        pokemonStatsTotal += +pokemonBaseStat;
        pokemonCardPageBaseStats.innerHTML += getHTMLPokemonCardPageBaseStats(pokemonStatName, pokemonBaseStat, resultProgress);
    }

    addTotalfromBaseStats(pokemonCardInfoContent, pokemonCardPageBaseStats, resultProgress, pokemonStatsTotal);
}


function addTotalfromBaseStats(pokemonCardInfoContent, pokemonCardPageBaseStats, resultProgress, pokemonStatsTotal) {
    resultProgress = pokemonCardBaseStatsProgress(pokemonStatsTotal, 600);
    pokemonCardPageBaseStats.innerHTML += getHTMLPokemonCardPageBaseStats('Total', pokemonStatsTotal, resultProgress);

    pokemonCardInfoContent.appendChild(pokemonCardPageBaseStats);
}


function controleLengthOfBaseStatName(pokemonStatName) {
    let changedName = '';

    if (pokemonStatName == 'special-attack') {
        changedName = 'sp. atk';
    } else if (pokemonStatName == 'special-defense') {
        changedName = 'sp. def';
    } else {
        changedName = pokemonStatName;
    }

    return changedName;
}



function pokemonCardBaseStatsProgress(baseStat, procent) {
    const procentValue = 144;
    let result = 0;

    result = baseStat * procentValue / procent;

    return result;
}



/* ------------------------------ */
/* pokemon card page 'base stats' */
/* ------------------------------ */

async function createPokemonCardPageEvolution(pokedexNumber) {
    let pokemonCardInfoContent = document.getElementById('pokemonCardInfo');
    pokemonCardInfoContent.innerHTML = '';
    const [pokemon, pokemonSpecies] = await returnPokemonAndPokemonSpecies(pokedexNumber);
    const pokemonEvolutionChange = await returnJSON(pokemonSpecies['evolution_chain']['url']);

    findEvoltuionInChanges(pokemonCardInfoContent, pokemonEvolutionChange);
}

async function findEvoltuionInChain(pokemonCardInfoContent, pokemonEvolutionChange) {
    let evolutionStep1 = pokemonEvolutionChange['chain']['species']['url'];
    let extractPokemonNumber = 0;
    extractPokemonNumber = extractNumberFromUrl(evolutionStep1);
    let currentPokemon = await returnJSON(APIS[0] + extractPokemonNumber[extractPokemonNumber.length - 1]);
    let currentPokemonName = currentPokemon['name'];
    let currentPokemonImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    console.log(currentPokemonName);
    console.log(currentPokemonImg);

    for (let i = 0; i < pokemonEvolutionChange['chain']['evolves_to'].length; i++) {
        const evolutionStep2 = pokemonEvolutionChange['chain']['evolves_to'][i]['species']['name'];
        console.log(evolutionStep2);

        for (let j = 0; j < pokemonEvolutionChange['chain']['evolves_to'][i]['evolves_to'].length; j++) {
            const evolutionStep3 = pokemonEvolutionChange['chain']['evolves_to'][i]['evolves_to'][j]['species']['name'];
            console.log(evolutionStep3);
        }
    }
}


function extractNumberFromUrl(url) {
    return url.match(/\d+/g);
}


function getHTMLPokemonCardPageEvolution() {
    return /*html*/`
        <div class="pokemonCardInfoTextPageThree">
            <div>
                <h3 class="pokemonCardInfoTextPageThreeHeadline">Bulbasaur</h3>
                <div class="pokemonCardInfoTextPageThreeSeparator"></div>
                <span class="pokemonCardInfoTextPageThreeHeadlineSubText">Level 1</S></span>
            </div>
            <img id="pokemonCardInfoTextPokemonImg"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png">
        </div>
    `;
}