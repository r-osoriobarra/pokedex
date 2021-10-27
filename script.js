$(document).ready(function(){
    
    //main link to pokeApi
    let next_page = 'https://pokeapi.co/api/v2/pokemon/';
    
    //calling Ajax request function
    allPokeData();

    //show next 20 pokemon event
    $("#morePokemons").click(function(e){
        e.preventDefault();
        $('#pokemons').html(" ")
        allPokeData();
    });

    //setting Ajax request 
    function allPokeData() {
        $.ajax({
            url: next_page,
            dataType: "json",
            method: "GET",
            success: function(response) {

                //updating link for next 20 pokemons
                next_page = response.next;
                
                response.results.forEach(function(pokemon){
                    
                    //setting pokemon's cards
                    let pokeCard= `
                    <div class="card col-md-3">
                        <div class="card-body">
                            <h5 class="card-title text-center font-weight-bold">${pokemon.name.toUpperCase()}</h5>
                            <a href="#" class="btn btn-warning" data-url="${pokemon.url}" data-toggle="modal" data-target="#pokeModal">¡Quiero saber más de este pokemón!</a>
                        </div>
                    </div>
                    `
                    $('#pokemons').append(pokeCard);

                });
            }
        });
    };

    //setting pokemon's modals

    $('#pokemons').click(function(e){
        e.preventDefault();
        //setting url for each pokemon
        let pokeUrl = e.target.dataset.url;

        //calling Ajax request function for individual attributes per pokemon
        pokeData(); 
        
        //setting Ajax request 
        function pokeData(){
            $.ajax({
                url: pokeUrl,
                dataType: "json",
                method: "GET",
                success: function(response){

                    //pokemon name
                    function pokeName(){
                        return response.name;
                    };
                    
                    //pokemon type
                    function pokeType(){
                        let pokeTypes = [];
                        response.types.forEach(function(pokeType){
                            pokeTypes.push(pokeType.type.name);
                        });
                        return pokeTypes;
                    };
                    
                    //pokemon abilities
                    function pokeAbilities(){
                        let pokeSkills = [];
                        response.abilities.forEach(function(pokeSkill){
                            pokeSkills.push(pokeSkill.ability.name);
                        });
                        return pokeSkills;
                    };

                    //pokemon moves
                    function pokeMoves(){
                        let moves = [];
                        response.moves.slice(0,5).forEach(function(pokeMove){
                            moves.push(pokeMove.move.name);
                        });
                        return moves;
                    };
                    
                    // add (and remove) items into modals for each click event triggered
                    removePokeFeatures();
                    addPokeFeatures();
                    
                    function removePokeFeatures(){
                        $('#pokeTitle').empty();
                        $('ul').empty();
                    };
                    function addPokeFeatures(){
                        $('#pokeTitle').append(pokeName().toUpperCase());
                        $('ul').append(`<li> <span class="font-weight-bold">Type: </span>${pokeType()}</li>`);
                        $('ul').append(`<li> <span class="font-weight-bold">Abilities: </span>${pokeAbilities()}</li>`);
                        $('ul').append(`<li> <span class="font-weight-bold">First 5 moves: </span>${pokeMoves()}</li>`);
                    };
                

                }
            });
        };
    });    

});