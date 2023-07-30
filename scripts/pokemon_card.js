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
    openPokemonCard();
}


async function fillPokemonCardPageAboutWithData(pokedexNumber) {
    let pokemonSpecies = await returnJSON(APIS[1] + pokedexNumber);
    let genera = pokemonSpecies['genera'];

    for (let i = 0; i < genera.length; i++) {
        const generaLanguage = genera[i]['language']['name'];

        let generaEn = generaLanguage.find(element => 'en' );

        if (generaEn) {
            break;
        }
    }

    console.log(generaEn);
}


function getHTMLPokemonCardPageAbout() {
    return /*html*/`
        <table>
            <tr>
                <td class="pokemonCardInfoTextLeft">Genera</td>
                <td class="pokemonCardInfoTextRight">Seed Pokemon</td>
            </tr>
            <tr>
                <td class="pokemonCardInfoTextLeft">Height</td>
                <td class="pokemonCardInfoTextRight">7dm</td>
            </tr>
            <tr>
                <td class="pokemonCardInfoTextLeft">Weight</td>
                <td class="pokemonCardInfoTextRight">15.2 lbs</td>
            </tr>
            <tr>
                <td class="pokemonCardInfoTextLeft">Abilities</td>
                <td class="pokemonCardInfoTextRight">Overgrow</td>
            </tr>
            <tr>
                <th class="pokemonCardInfoTextTableHeadline">Breeding</th>
            </tr>
            <tr>
                <td class="pokemonCardInfoTextLeft">Egg Groups</td>
                <td class="pokemonCardInfoTextRight">Monster</td>
            </tr>
            <tr>
                <td class="pokemonCardInfoTextLeft">Egg Cycle</td>
                <td class="pokemonCardInfoTextRight">Grass</td>
            </tr>
        </table>
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