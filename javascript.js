
var pokemonList = ["Raichu", "Marowak", "Togepi", "Mudkip", "Meowth", "Koffing", "Ekans", "Torchic", "Gengar"];

function displayPokemon() {

    let pokemon = $(this).attr("pokemon-name");
    //let queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+pokemon; //random photo
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + pokemon;  //search query 


    $.ajax({
        url: queryURL,
        method: "GET"
    }) // After the data from the AJAX request comes back
        .done(function (response) {
            console.log(response);

            for (i = 0; i < 10; i++) {

                $("#pokemon").prepend(
                    "<p>Rated " + response.data[i].rating + "</p>"
                );

                let stillImageUrl = response.data[i].images.fixed_height_still.url;
                let movingImageUrl = response.data[i].images.fixed_height.url;
                let pokeImage = $("<img>");
                //let arrange = $('<div class="row"><div class="col-sm-6 col-md-4"><div class="thumbnail">');
                pokeImage.attr("src", stillImageUrl);
                pokeImage.attr("alt", "nonMoving");
                pokeImage.attr("id", "stillImage");
                pokeImage.attr("class", "col-sm-4");
               //$("#pokemon").prepend('<div class="row"><div class="col-sm-6 col-md-4"><div class="thumbnail">');
                $("#pokemon").prepend(pokeImage);
                //$("#pokemon").prepend('</div></div></div>');


             
                

                $("#stillImage").on("click", function () {


                    let stillGif = (stillImageUrl);
                    let movingGif = (movingImageUrl);


                    if (pokeImage.attr("alt") === "nonMoving") {
                        console.log("image moving");
                        pokeImage.attr("src", movingGif);
                        pokeImage.attr("alt", "moving");
                        console.log(pokeImage.attr("alt"));


                    } else {

                        console.log("image not moving");
                        pokeImage.attr("src", stillGif);
                        pokeImage.attr("alt", "nonMoving");

                    }

                });


            }
        });

}

// Function for displaying pokemon data
function renderPokemon() {
    $("#pokemonButtons").empty();

    for (var i = 0; i < pokemonList.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-primary pokemon");
        a.attr("pokemon-name", pokemonList[i]);

        a.text(pokemonList[i]);
        $("#pokemonButtons").append(a);
    }
}


// This function handles events when the add movie button is clicked
$("#addPokemon").on("click", function (event) {
    event.preventDefault();
    var pokemon = $("#pokemon-input").val().trim(); // This line of code will grab the input from the textbox
    pokemonList.push(pokemon);// The movie from the textbox is then added to our array
    renderPokemon(); // Calling renderButtons which handles the processing of our movie array into a button
});

$(document).on("click", ".pokemon", displayPokemon);
renderPokemon(); 
