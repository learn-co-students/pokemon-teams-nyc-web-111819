const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener ('DOMContentLoaded', function() {
  main = document.querySelector('main')

  getTrainers()

  main.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
      switch (event.target.className) {
        case "release":
          const pokemonId = event.target.dataset.pokemonId
          event.target.closest('li').remove()
          releasePokemon(pokemonId)
          break;
        case "add":
          const div = event.target.closest('div.card')
          const ul = div.querySelector('ul')
          if (ul.children.length < 6) {
            const trainerId = div.dataset.id
            addPokemon(trainerId)
          } else {
            trainerName = div.querySelector('p').innerText
            alert(`${trainerName} already has 6 pokemon, which is the max`)
          }
          break
      }
    }
  })
  
  function getTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
      trainers.forEach(trainer => {
        renderTrainer(trainer)
      })
    })
  }

  function renderTrainer(trainer) {
    const div = document.createElement('div')
    div.className = 'card'
    div.dataset.id = trainer.id
    div.innerHTML = `
      <p>${trainer.name}</p>
      <button class="add" data-trainer-id="1">Add Pokemon</button>
    `
    const ul = document.createElement('ul')
    div.appendChild(ul)

    trainer.pokemons.forEach(pokemon => {
      ul.appendChild(createPokemonLi(pokemon))
    })

    main.appendChild(div)
    
  }

  function createPokemonLi(pokemon) {
    li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`

    button = document.createElement('button')
    button.className = "release"
    button.dataset.pokemonId = pokemon.id
    button.innerText = "Release"

    li.appendChild(button)

    return li
  }

  function releasePokemon(pokemonId) {
    fetch(POKEMONS_URL + '/' + pokemonId, {method: "DELETE"})
  }
  
  function addPokemon(trainerId) {
    console.log("add", trainerId)

    bodyObj = {
      "trainer_id": parseInt(trainerId)
    }

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(bodyObj)
    }

    fetch(POKEMONS_URL, configObj)
    .then(resp => resp.json())
    .then(pokemon => {
      const div = main.querySelector(`div.card[data-id = "${pokemon.trainer_id}"]`)
      const ul = div.querySelector('ul')
      ul.appendChild(createPokemonLi(pokemon))
    })
  }

})