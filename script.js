let image = document.querySelector('.pokemon-image');
let input = document.querySelector('.pokemon-input');
let searchButton = document.querySelector('.get-image');


let errorDisplay = document.createElement('p');


searchButton.addEventListener('click',()=>{
    errorDisplay.textContent ="";
    let pokemon = input.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((response)=>{
            if(!response.ok){
                throw new Error("Something went wrong....");
                
            }
            return response.json()
        })
        .then((data)=>{
            console.log(data);
            image.src = data.sprites.front_default;
        })
        .catch((error)=>{  
            errorDisplay.innerText = error.message;
            document.body.append(errorDisplay);
        })
})