const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(){

    let pokeMain = document.getElementsByTagName('main')[0]

    loadTrainers()

    // LOAD AND RENDER TRAINERS WITH THEIR POKEMONS
    function loadTrainers() {
        fetch(TRAINERS_URL).then(resp => resp.json())
        .then(result => result.forEach(trainer => renderTrainers(trainer)))
    } 

    function renderTrainers(trainer) {
        let trainerDiv = document.createElement('div')
        trainerDiv.className = 'card'
        trainerDiv.dataset.id = trainer.id

        let trainerNameP = document.createElement('p')
        trainerNameP.innerText = trainer.name 

        let addPokeBtn = document.createElement('button')
        addPokeBtn.dataset.id = trainer.id 
        addPokeBtn.innerText = 'Add Pokemon'

        // ARRAY OF OBJECTS - ALL POKEMONS A TRAINER HAS ADDING THEM TO LIST
        let pokemonUl = document.createElement('ul')
        trainer.pokemons.forEach(pokemon => {renderPokemon(pokemon, pokemonUl)})

        trainerDiv.appendChild(trainerNameP)
        trainerDiv.appendChild(addPokeBtn)
        trainerDiv.appendChild(pokemonUl)

        pokeMain.appendChild(trainerDiv)

        // EVENT LISTENER FOR ADD POKEMON BUTTON
        addPokeBtn.addEventListener('click', function(e){
            if (pokemonUl.childElementCount < 6) {
                let trainerIdInt = parseInt(e.target.dataset.id)
                addPokemon(trainerIdInt)
            } else {alert("Trainers can only have up to 6 pokemons at a time.")}

        })

    }
    // END OF LOADING AND RENDERING TRAINER WITH THEIR POKEMONS


    // FUNCTION TO RENDER POKEMON TO A UL
    function renderPokemon (pokemon, pokemonUl) {
        let pokeLi = document.createElement('li')
        pokeLi.innerText = `${pokemon.nickname} (${pokemon.species})`
        
        let pokeRelBtn = document.createElement('button')
        pokeRelBtn.className = 'release'
        pokeRelBtn.dataset.pokemonId = pokemon.id 
        pokeRelBtn.innerText = 'Release'

        pokeLi.appendChild(pokeRelBtn)
        pokemonUl.appendChild(pokeLi)

        // EVENT LISTENER FOR RELEASE POKEMON
        pokeRelBtn.addEventListener('click', function(e){
            let intPokeId = parseInt(e.target.dataset.pokemonId)
            let idPokeLi = document.querySelector(`[data-pokemon-id='${intPokeId}']`)
            releasePokemon(intPokeId)
            idPokeLi.parentNode.remove()
        })

    }
    // END OF FUNCTION TO RENDER POKEMON TO A UL



    // FUNCTION TO POST AND RENDER NEW POKEMON TO TRAINER
    function addPokemon (id) {
        let idTrainerDiv = document.querySelector(`[data-id="${id}"]`)
        let idPokeUl = idTrainerDiv.getElementsByTagName('ul')[0]

        fetch(`${POKEMONS_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'trainer_id': id})
        }).then(resp => resp.json())
        .then(pokemon => renderPokemon(pokemon, idPokeUl))
    }
    // END OF FUNCTION TO POST AND RENDER NEW POKEMON

    function releasePokemon (id) {
        fetch(`${POKEMONS_URL + '/' + id}`, {
            method: 'DELETE'
        })
    }

















})









