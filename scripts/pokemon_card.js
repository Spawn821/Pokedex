let pokemonCardInfoPageNames = [
    'about',
    'baseStats',
    'evolution',
    'moves'
]

let pokemonCardInfoBaseStatsIDs = [
    { 'id': 'pokemonCardInfoHP', 'idProgress': 'pokemonCardInfoHPProgress' },
    { 'id': 'pokemonCardInfoAttack', 'idProgress': 'pokemonCardInfoAttackProgress' },
    { 'id': 'pokemonCardInfoDefense', 'idProgress': 'pokemonCardInfoDefenseProgress' },
    { 'id': 'pokemonCardInfoSpAtk', 'idProgress': 'pokemonCardInfoSpAtkProgress' },
    { 'id': 'pokemonCardInfoSpDef', 'idProgress': 'pokemonCardInfoSpDefProgress' },
    { 'id': 'pokemonCardInfoSpeed', 'idProgress': 'pokemonCardInfoSpeedProgress' },
    { 'id': 'pokemonCardInfoTotal', 'idProgress': 'pokemonCardInfoTotalProgress' }
];



/* ---------------------------------------------- */
/* show the clicked current pokemon with all data */
/* ---------------------------------------------- */

function renderPokemonCard(i) {
    let pokemonCardContent = document.getElementById('pokemonCardContent');
    pokemonCardContent.innerHTML = '';
    let pokedexNumber = createPokedexNumber(pokemonDataLoading[i]['pokedex_number'].toString());

    pokemonCardContent.innerHTML = getHTMLPokemonCard(pokemonDataLoading[i]['name'],
        pokedexNumber, pokemonDataLoading[i]['image'])

    document.getElementById('pokemonCard').style = getStylePokemonSmallCard(
        pokemonDataLoading[i]['color']);

    renderPokemonTypesList(pokemonDataLoading[i]['type'],
        'pokemonCardTypes', 'pokemonCardTypesText');

    includeHTML()
    createPokemonCardPageAbout(pokemonDataLoading[i]['pokedex_number']);
    setTimeout(openPokemonCard, 150);
}


async function createPokemonCardPageAbout(pokedexNumber) {
    let pokemonCardPageAbout = document.getElementById('pokemonCardInfo');
    pokemonCardPageAbout.innerHTML = '';
    const [pokemon, pokemonSpecies] = await returnPokemonAndPokemonSpecies(pokedexNumber);
    const genus = returnPokemonGenus(pokemonSpecies['genera']);
    const height = pokemon['height'];
    const weight = pokemon['weight'];
    const abilities = pokemon['abilities'];
    const eggGroups = returnPokemonEggGroupsAsArray(pokemonSpecies['egg_groups']);

    pokemonCardPageAbout.innerHTML = getHTMLPokemonCardPageAbout(genus, height, weight, abilities, eggGroups);
}


async function returnPokemonAndPokemonSpecies(pokedexNumber) {
    const pokemon = await returnJSON(APIS[0] + pokedexNumber);
    const pekemonSpecies = await returnJSON(APIS[1] + pokedexNumber);

    return [pokemon, pekemonSpecies];
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


async function createPokemonCardPageBaseStats(pokedexNumber) {
    let pokemonCardPageBaseStatsContent = document.getElementById('pokemonCardInfo'); 
    pokemonCardPageBaseStatsContent.innerHTML = '';
    let pokemonCardPageBaseStats = document.createElement('table');
    const [pokemon, pokemonSpecies] = await returnPokemonAndPokemonSpecies(pokedexNumber);
    const pokemonStats = pokemon['stats'];
    let pokemonStatsTotal = 0;


    for (let i = 0; i < pokemonStats.length; i++) {
        const pokemonBaseStat = pokemonStats[i]['base_stat'];
        const pokemonStatName = pokemonStats[i]['stat']['name'];
        const [name, id] = configurationForBaseStat(pokemonStatName);

        pokemonCardPageBaseStats.innerHTML += getHTMLPokemonCardPageBaseStats(name, pokemonBaseStat, id);
    }

    document.getElementById('pokemonCardInfo').appendChild(pokemonCardPageBaseStats);
}


function configurationForBaseStat(pokemonStatName) {
    let name = '', id = '';

    if (pokemonStatName == 'hp') {
        name = 'HP', id = 'pokemonCardInfoHPProgress'
    } else if (pokemonStatName == 'attack') {
        name = 'Attack', id = 'pokemonCardInfoAttackProgress'
    } else if (pokemonStatName == 'defense') {
        name = 'Defense', id = 'pokemonCardInfoDefenseProgress'
    } else if (pokemonStatName == 'special-attack') {
        name = 'Sp. Atk', id = 'pokemonCardInfoSpAtkProgress'
    } else if (pokemonStatName == 'special-defense') {
        name = 'Sp. Def', id = 'pokemonCardInfoSpDefProgress'
    } else if (pokemonStatName == 'speed') {
        name = 'Speed', id = 'pokemonCardInfoSpeedProgress'
    }

    return [name, id];
}


function getHTMLPokemonCardPageBaseStats(name, baseStat, id) {
    return /*html*/`
        <tr>
            <td class="pokemonCardInfoTextLeft">${name}</td>
            <td class="pokemonCardInfoTextRight" id="pokemonCardInfoHP">${baseStat}</td>
            <td class="pokemonCardInfoTextRight">
                <div class="pokemonCardInfoTextRightBar" id>
                    <div class="pokemonCardInfoTextRightBarProgress" id=${id}></div>
                </div>
            </td>
        </tr>
    `;
}


function openPokemonCard() {
    document.getElementById('panel').classList.add('d-none');
    document.getElementById('pokemonCardContent').classList.remove('d-none');
}


function closePokemonCard() {
    document.getElementById('panel').classList.remove('d-none');
    document.getElementById('pokemonCardContent').classList.add('d-none');
}


function pokemonCardBaseStatsProgress(id, idProgress) {
    const value = +document.getElementById(id).innerHTML;
    const procentValue = 144;
    let result = 0;

    if (id.includes('Total')) {
        result = value * procentValue / 600;
    } else {
        result = value * procentValue / 100;
    }

    document.getElementById(idProgress).style = `width: ${result}px`;
}


function openPokemonCardPageAbout() {
    let commands = [
        'remove',
        'add',
        'add',
        'add'
    ]

    openPokemonCardPage(commands);
}


function openPokemonCardPageBaseStats() {
    let commands = [
        'add',
        'remove',
        'add',
        'add'
    ]

    openPokemonCardPage(commands);

    for (let i = 0; i < pokemonCardInfoBaseStatsIDs.length; i++) {
        const id = pokemonCardInfoBaseStatsIDs[i]['id'];
        const idProgress = pokemonCardInfoBaseStatsIDs[i]['idProgress'];

        pokemonCardBaseStatsProgress(id, idProgress);
    }
}


function openPokemonCardPageEvolution() {
    let commands = [
        'add',
        'add',
        'remove',
        'add'
    ]

    openPokemonCardPage(commands);
}


function openPokemonCardPageMoves() {
    let commands = [
        'add',
        'add',
        'add',
        'remove'
    ]

    openPokemonCardPage(commands);
}


function openPokemonCardPage(commands) {
    for (let i = 0; i < pokemonCardInfoPageNames.length; i++) {
        const pageName = pokemonCardInfoPageNames[i];
        const command = commands[i];

        showOrHidePage(pageName, command)
    }
}