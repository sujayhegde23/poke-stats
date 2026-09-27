const image = document.querySelector('.pokemon-image');
const input = document.querySelector('.pokemon-input');
const searchButton = document.querySelector('.get-image');
const type = document.querySelector(".type");
const speed = document.querySelector(".speed");
const defense = document.querySelector(".defense");
const attack = document.querySelector(".attack");
const hp = document.querySelector(".hp");
const abilities = document.querySelector(".abilities");


const errorDisplay = document.createElement('p');


function getPokemonFeatures(data){
        const pokemonType = data.types[0].type.name;
        const pokemonHp = data.stats.find(s=>s.stat.name === 'hp').base_stat;
        const pokemonSpeed = data.stats.find(s=>s.stat.name === 'speed').base_stat;
        const pokemonAttack =data.stats.find(s=>s.stat.name === 'attack').base_stat;
        const pokemnDefence = data.stats.find(s=>s.stat.name === 'defense').base_stat;

        let pokemonAbilities = data.abilities;

        abilities.textContent = pokemonAbilities
          .map(item => item.ability.name)
          .join(", ");

        hp.textContent = pokemonHp;
        type.textContent = pokemonType;
        speed.textContent = pokemonSpeed;
        attack.textContent = pokemonAttack;
        defense.textContent = pokemnDefence;
        image.src = data.sprites.front_default;
}

function handleError(error){
        errorDisplay.textContent = error.message;
        document.body.append(errorDisplay);
}

searchButton.addEventListener('click',()=>{
    errorDisplay.textContent ="";
    image.src="";
    let pokemon = input.value.trim();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

        .then((response)=>{

            if(!response.ok){
                throw new Error("Something went wrong....");
            }
            return response.json()
        })

        .then((data)=>{
           getPokemonFeatures(data);
        })

        .catch((error)=>{  
            handleError(error);
        })
})