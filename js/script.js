
let pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl ="https://pokeapi.co/api/v2/pokemon/?limit=20";

    function loadList(){
        return fetch(apiUrl).then(function(response){ 
            return response.json(); 
        })
        .then(function(json){ 
            json.results.forEach(function(item){  
                let pokemon = { 
                    name: item.name, 
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        })
        .catch(function(e){
            console.error(e);
        });
    }
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    function getAll(){
        return pokemonList;
    }
    // DOM methodology; javascript code
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list"); 
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        // Classes content for button
        button.innerText = pokemon.name;
        button.classList.add(
            "btn",
            "btn-outline-secondary",
            "d-grid",
            "gap-2",
            "col-6",
            "mx-auto",
        );
        // Add attributes to button
        button.setAttribute("data-target", "#exampleModal");
        button.setAttribute("data-toggle", "modal");
        // Define affiliation of the elements
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        eventListener(button, pokemon);
    }
    // User activates button, button functionality is to show pokemon details
    function eventListener (button, pokemon){
        button.addEventListener("click", function(){
            showDetails(pokemon);
        });
    }
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal(item);
        });
     }
    // API pokemon details; use a promise
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
        return response.json();
        })
        .then(function (details) {
        // Now we add the details to the item
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
        })
        .catch(function (e) {
        console.error(e);
        });
    }
    // Modal written in jquery
    function showModal (pokemon) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let typeElement = "<p> type : ";
        let abilitiesElement ="<p> abilities : ";

        modalTitle.empty();
        modalBody.empty();
        //pokemon.name
        let nameElement = $("<h1>" + pokemon.name  + "</h1>");
        let pokeImageFront = $("<img class='modal-img' style='width:50%'>");
        pokeImageFront.attr("src", pokemon.imageUrlFront);
        let pokeImageBack = $("<img class='modal-img' style='width:50%'>");
        pokeImageBack.attr("src", pokemon.imageUrlBack);
        let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
        let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
        for (let i = 0; i < pokemon.types.length; i++) {
            if (i<pokemon.types.length-1) {
                typeElement +=  pokemon.types[i].type.name + ", ";
            }else{
                typeElement +=  pokemon.types[i].type.name + "</p>";
            }  

            
          }; 
          for (let i = 0; i < pokemon.abilities.length; i++) {
            if (i<pokemon.abilities.length-1) {
                abilitiesElement += pokemon.abilities[i].ability.name + ", ";
            }else{
                abilitiesElement += pokemon.abilities[i].ability.name + "</p>";
            }  
            };
         
        
        modalTitle.append(nameElement);
        modalBody.append(pokeImageFront);
        modalBody.append(pokeImageBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typeElement);
        modalBody.append(abilitiesElement);
    }
    return {
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails,
        showDetails
    }
})();  
    pokemonRepository.loadList().then(function(){
        pokemonRepository.getAll().forEach(function(pokemon){
            pokemonRepository.addListItem(pokemon);
    });
});   
