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

    createPokemonCardPageAbout(pokemonDataLoading[i]['pokedex_number']);
    setTimeout(openPokemonCard, 150);
}


function openPokemonCard() {
    let windowWidth = window.matchMedia('(min-width: 700px)');

    if (windowWidth.matches) {
        document.getElementById('pokemonCardContent').classList.remove('d-none');
    } else {
        document.getElementById('panel').classList.add('d-none');
        document.getElementById('pokemonCardContent').classList.remove('d-none');
        document.getElementById('pokemonCardPokedexImgLeft').classList.remove('d-none');
        document.getElementById('pokemonCardPokedexImgRight').classList.remove('d-none');
    }
}


function closePokemonCard() {
    document.getElementById('panel').classList.remove('d-none');
    document.getElementById('panel').style = `margin-right: 0`;
    document.getElementById('pokemonCardContent').classList.add('d-none');
    document.getElementById('pokemonCardPokedexImgLeft').classList.add('d-none');
    document.getElementById('pokemonCardPokedexImgRight').classList.add('d-none');
}


/* if window size changes */
window.addEventListener('resize', () => {
    let mediaQuery = window.matchMedia('(min-width: 700px)');
    console.log('läuft');
    if (mediaQuery.matches || document.getElementById('pokemonCardContent').classList.contains('d-none')) {
        document.getElementById('panel').classList.remove('d-none');
        document.getElementById('pokemonCardPokedexImgLeft').classList.add('d-none');
        document.getElementById('pokemonCardPokedexImgRight').classList.add('d-none');
    } else {
        document.getElementById('panel').classList.add('d-none');
        document.getElementById('pokemonCardPokedexImgLeft').classList.remove('d-none');
        document.getElementById('pokemonCardPokedexImgRight').classList.remove('d-none');
    }
});

window.addEventListener('scroll', () => {
    console.log(window.scrollY);

    if (window.screenY > 200) {
        document.getElementById('pokemonCardText').style = 'height: 100vh';
    }
});



/* ------------------------- */
/* pokemon card page 'about' */
/* ------------------------- */

async function createPokemonCardPageAbout(pokedexNumber) {
    showOrHidePage('loadingScreen', 'remove');

    let pokemonCardInfoContent = document.getElementById('pokemonCardInfo');
    pokemonCardInfoContent.innerHTML = '';
    const [pokemon, pokemonSpecies] = await returnPokemonAndPokemonSpecies(pokedexNumber);
    const genus = returnEnglishName(pokemonSpecies['genera'], 'genus');
    const height = pokemon['height'];
    const weight = pokemon['weight'];
    const abilities = pokemon['abilities'];
    const eggGroups = returnPokemonEggGroupsAsArray(pokemonSpecies['egg_groups']);

    pokemonCardInfoContent.innerHTML = getHTMLPokemonCardPageAbout(genus, height, weight, abilities, eggGroups);

    showOrHidePage('loadingScreen', 'add');
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
    showOrHidePage('loadingScreen', 'remove');
    resetLoadingBar();

    let pokemonCardInfoContent = document.getElementById('pokemonCardInfo');
    pokemonCardInfoContent.innerHTML = '';
    let pokemonCardPageBaseStats = document.createElement('table');
    const [pokemon, pokemonSpecies] = await returnPokemonAndPokemonSpecies(pokedexNumber);
    const pokemonStats = pokemon['stats'];
    let resultProgress = 0;
    let pokemonStatsTotal = 0;
    let progressColor = ['green', 'red'];
    let progressColorIndex = 0;

    addBaseStats(pokemonCardInfoContent, pokemonCardPageBaseStats, pokemonStats, resultProgress, pokemonStatsTotal, progressColor, progressColorIndex);
}


function addBaseStats(pokemonCardInfoContent, pokemonCardPageBaseStats, pokemonStats, resultProgress, pokemonStatsTotal, progressColor, progressColorIndex) {
    for (let i = 0; i < pokemonStats.length; i++) {
        let pokemonBaseStat = pokemonStats[i]['base_stat'];
        let pokemonStatName = pokemonStats[i]['stat']['name'];

        pokemonStatName = returnFirstLetterToUpperCase(controleLengthOfBaseStatName(pokemonStatName));

        resultProgress = pokemonCardBaseStatsProgress(pokemonBaseStat, 200);
        pokemonStatsTotal += +pokemonBaseStat;
        pokemonCardPageBaseStats.innerHTML += getHTMLPokemonCardPageBaseStats(pokemonStatName, pokemonBaseStat, resultProgress, progressColor[progressColorIndex]);
        progressColorIndex++;

        if (progressColorIndex == progressColor.length) {
            progressColorIndex = 0;
        }

        fillLaodingBar(i, pokemonStats.length);
    }

    addTotalfromBaseStats(pokemonCardInfoContent, pokemonCardPageBaseStats, resultProgress, pokemonStatsTotal, progressColor, progressColorIndex);
}


function addTotalfromBaseStats(pokemonCardInfoContent, pokemonCardPageBaseStats, resultProgress, pokemonStatsTotal, progressColor, progressColorIndex) {
    resultProgress = pokemonCardBaseStatsProgress(pokemonStatsTotal, 1200);
    pokemonCardPageBaseStats.innerHTML += getHTMLPokemonCardPageBaseStats('Total', pokemonStatsTotal, resultProgress, progressColor[progressColorIndex]);

    pokemonCardInfoContent.appendChild(pokemonCardPageBaseStats);

    showOrHidePage('loadingScreen', 'add');
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



/* ----------------------------- */
/* pokemon card page 'evolution' */
/* ----------------------------- */

async function createPokemonCardPageEvolution(pokedexNumber) {
    showOrHidePage('loadingScreen', 'remove');
    resetLoadingBar();

    let pokemonCardInfoContent = document.getElementById('pokemonCardInfo');
    pokemonCardInfoContent.innerHTML = '';
    const [pokemon, pokemonSpecies] = await returnPokemonAndPokemonSpecies(pokedexNumber);
    const pokemonEvolutionChange = await returnJSON(pokemonSpecies['evolution_chain']['url']);

    findEvoltuionInChain(pokemonCardInfoContent, pokemonEvolutionChange);

    showOrHidePage('loadingScreen', 'add');
}

async function findEvoltuionInChain(pokemonCardInfoContent, pokemonEvolutionChange) {
    let pokemonEvolutionChangeLevel = pokemonEvolutionChange['chain']['species']['url'];

    await addEvolutionChainToPage(pokemonEvolutionChangeLevel, pokemonCardInfoContent, 'Level 1');

    pokemonEvolutionChangeLevel = pokemonEvolutionChange['chain']['evolves_to'];
    for (let i = 0; i < pokemonEvolutionChangeLevel.length; i++) {
        let pokemonEvolutionChangeLevelIndex = pokemonEvolutionChangeLevel[i]['species']['url'];

        await addEvolutionChainToPage(pokemonEvolutionChangeLevelIndex, pokemonCardInfoContent, 'Level 2');

        let pokemonEvolutionChangeLevelSub = pokemonEvolutionChange['chain']['evolves_to'][i]['evolves_to'];
        for (let j = 0; j < pokemonEvolutionChangeLevelSub.length; j++) {
            pokemonEvolutionChangeLevelIndex = pokemonEvolutionChangeLevelSub[j]['species']['url'];

            await addEvolutionChainToPage(pokemonEvolutionChangeLevelIndex, pokemonCardInfoContent, 'Level 3');
        }

        fillLaodingBar(i, pokemonEvolutionChangeLevel.length);
    }
}


async function addEvolutionChainToPage(pokemonEvolutionChangeLevel, pokemonCardInfoContent, level) {
    const pokemonNummberLevel = returnPokemonNumberFromUrl(pokemonEvolutionChangeLevel);
    const currentPokemon = await returnJSON(APIS[0] + pokemonNummberLevel[pokemonNummberLevel.length - 1]);

    const [currentPokemonName, currentPokemonImg] = returnPokemonNameAndImg(currentPokemon);
    pokemonCardInfoContent.innerHTML += getHTMLPokemonCardPageEvolution(currentPokemonName, `${level}`, currentPokemonImg);
}


function returnPokemonNumberFromUrl(url) {
    const number = extractNumberFromUrl(url);

    return number;
}


function extractNumberFromUrl(url) {
    return url.match(/\d+/g);
}


function returnPokemonNameAndImg(currentPokemon) {
    const name = returnFirstLetterToUpperCase(currentPokemon['name']);
    const img = currentPokemon['sprites']['other']['official-artwork']['front_default'];

    return [name, img];
}



/* ------------------------- */
/* pokemon card page 'moves' */
/* ------------------------- */

async function createPokemonCardPageMoves(pokedexNumber) {
    showOrHidePage('loadingScreen', 'remove');
    resetLoadingBar();

    let pokemonCardInfoContent = document.getElementById('pokemonCardInfo');
    pokemonCardInfoContent.innerHTML = '';
    let pokemonCardPageMoves = document.createElement('table');
    const [pokemon, pokemonSpecies] = await returnPokemonAndPokemonSpecies(pokedexNumber);
    const pokemonMoves = pokemon['moves'];

    pokemonCardPageMoves = await addMovesToPage(pokemonMoves, pokemonCardPageMoves);

    pokemonCardInfoContent.appendChild(pokemonCardPageMoves);

    showOrHidePage('loadingScreen', 'add');
}


async function addMovesToPage(pokemonMoves, pokemonCardPageMoves) {
    let counterMoves = pokemonMoves.length

    if (counterMoves > 12) {
        counterMoves = 12;
    }

    for (let i = 0; i < counterMoves; i++) {
        const pokemonMove = await returnJSON(pokemonMoves[i]['move']['url']);
        let [moveName, movePower, moveType] = returnNameMoveType(pokemonMove);

        if (movePower == null) {
            movePower = 'pass.'
        }

        pokemonCardPageMoves.innerHTML += getHTMLPokemonCardPageMoves(moveName, movePower, moveType);

        fillLaodingBar(i, counterMoves);
    }

    return pokemonCardPageMoves;
}


function returnNameMoveType(moveJSON) {
    const moveName = returnFirstLetterToUpperCase(moveJSON['name']);
    let movePower = moveJSON['power'];
    const moveType = moveJSON['type']['name'];

    return [moveName, movePower, moveType];
}