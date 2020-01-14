const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementById('main')

function fetchTrainers(){
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainers => {
    trainers.forEach(trainer => {
      createCard(trainer)
      pokemonLi(trainer)
    }
  )})
}
fetchTrainers()


function createCard(trainer){
  let main = document.querySelector('main')
  let trainerDiv = document.createElement('div')
  trainerDiv.className = 'card'
  trainerDiv.dataset.id = trainer.id
  trainerDiv.innerHTML = ` <p>${trainer.name}</p> `
  main.appendChild(trainerDiv)

  let addPokemonButton = document.createElement('BUTTON')
  addPokemonButton.innerText = "Add Pokemon"
  addPokemonButton.dataset.trainerId = trainer.id
  trainerDiv.appendChild(addPokemonButton)

  let ul = document.createElement('ul')
  ul.id = trainer.id
  trainerDiv.appendChild(ul)
}

function pokemonLi(trainer){
  trainer.pokemons.forEach(pokemon =>{
    let ul = document.getElementById(trainer.id)
    let li = document.createElement('li')
    li.innerHTML = `  
    <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>
    `
    ul.appendChild(li)
    })
}

document.addEventListener('click', function(e){
  if (e.target.innerText === "Add Pokemon") {

    fetch('http://localhost:3000/pokemons/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "trainer_id":`${e.target.dataset.trainerId}`})
    })
    .then(resp => resp.json())
    .then(pokemon => {
      if (pokemon.nickname !== undefined){
        let li = document.createElement('li')
        li.innerHTML =  `  
        <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>
        `
        let ul = document.getElementById(e.target.dataset.trainerId)
        ul.appendChild(li)
      } else {
        alert("No means No")
      }
    })
  }
  if (e.target.innerText === "Release"){

    fetch(`http://localhost:3000/pokemons/${e.target.dataset.pokemonId}`,{
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(pokemon => 
      e.target.parentNode.remove()
      // pokemon.remove()
    )
  }
})







document.addEventListener('DOMContentLoaded', function(){

})