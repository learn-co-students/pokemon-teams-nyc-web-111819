const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener("DOMContentLoaded", function() {
    const main = document.querySelector('main');

    // make a local variable, so that all the data is available locally 
    let trainers = []

    function fetchTrainers(){
        fetch(TRAINERS_URL)
        .then((response) => response.json())
        .then((trainerData) => {
            trainerData.forEach(trainer => {
                trainers = trainerData
                renderTrainer(trainer)
            });
        });
    };


    function renderTrainer(trainer){
        const trainerCard = document.createElement('div');
        trainerCard.classList.add('card');
        trainerCard.innerHTML = `
        <p>${trainer.name}</p>
        <button class="add-btn" data-trainer-id="${trainer.id}">Add Pokemon</button>  
        `;

        const ul = document.createElement('ul');
        ul.className += `trainer_${trainer.id}`


        trainer.pokemons.forEach(function(pokemon){
            const HTML = `
            <li class=pokemon-${pokemon.id}>
                ${pokemon.nickname} (${pokemon.species}) 
                <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
            </li>
            `;

            ul.insertAdjacentHTML('beforeend', HTML);
        });
        trainerCard.appendChild(ul);
        main.appendChild(trainerCard);
    }

    fetchTrainers();


    main.addEventListener("click", function(e) {

        if (e.target.className === "add-btn") {
            
            let trainerID = e.target.dataset.trainerId
            let trainerList = document.querySelector(`.trainer_${trainerID}`)

            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "trainer_id": trainerID
                }) 
            })
            .then(results => results.json())
            .then(pokemon => {
                if(!pokemon.error){
                    let pokemonHTML = `
                    <li class=pokemon-${pokemon.id}>
                        ${pokemon.nickname} (${pokemon.species}) 
                        <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
                    </li>
                    `
                    trainerList.innerHTML += pokemonHTML
                }
            })
        }
        if (e.target.className === "release") {
            let pokeId = e.target.dataset.pokemonId
            let pokeLi = document.querySelector(`.pokemon-${pokeId}`)
            fetch(`${POKEMONS_URL}/${pokeId}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(poke => {
                pokeLi.remove()
            }) // second .then

        }// end of the second if statement

    })// end of the event listener

}) // end of the main function


