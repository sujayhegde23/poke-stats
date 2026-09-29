const image = document.querySelector('.pokemon-image');
const input = document.querySelector('.pokemon-input');
const searchButton = document.querySelector('.get-image');
const type = document.querySelector(".type");
const speed = document.querySelector(".speed");
const defense = document.querySelector(".defense");
const attack = document.querySelector(".attack");
const hp = document.querySelector(".hp");
const abilities = document.querySelector(".abilities");
const card = document.querySelector('.pokemon-card');
const specialAttack = document.querySelector('.special-attack');
const specialDefence = document.querySelector('.special-defense');



const errorDisplay = document.createElement('p');


function getPokemonFeatures(data){
        const pokemonType = data.types[0].type.name;
        const pokemonHp = data.stats.find(s=>s.stat.name === 'hp').base_stat;
        const pokemonSpeed = data.stats.find(s=>s.stat.name === 'speed').base_stat;
        const pokemonAttack =data.stats.find(s=>s.stat.name === 'attack').base_stat;
        const pokemnDefence = data.stats.find(s=>s.stat.name === 'defense').base_stat;
        const pokemonSpecialAttack = data.stats.find(s=>s.stat.name === 'special-attack').base_stat;
        const pokemonSpecialDefence = data.stats.find(s=>s.stat.name === 'special-defense').base_stat;
        console.log(pokemonSpecialDefence);
        
        let pokemonAbilities = data.abilities;

        abilities.textContent = pokemonAbilities
          .map(item => item.ability.name)
          .join(" , ");

        hp.textContent = pokemonHp;
        type.textContent = pokemonType;
        speed.textContent = pokemonSpeed;
        attack.textContent = pokemonAttack;
        defense.textContent = pokemnDefence;
        image.src = data.sprites.front_default;
        specialAttack.textContent = pokemonSpecialAttack;
        specialDefence.textContent = pokemonSpecialDefence;
        
}

function handleError(error){
        card.style.display ='none';
        errorDisplay.textContent = error.message;
        document.body.append(errorDisplay);
}

searchButton.addEventListener('click',()=>{
    errorDisplay.textContent ="";
    image.src="";
    let pokemon = input.value.trim();
   
    if (pokemon === "") {
        handleError(new Error("Please Enter a  Pokemon Name"))
        return;
    }
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

        .then((response)=>{

            if(!response.ok){
                throw new Error("Pokemon Not Found....");
            }
            return response.json()
        })

        .then((data)=>{
           getPokemonFeatures(data);
           card.style.display='flex';

        })

        .catch((error)=>{  
            handleError(error);
        })
})