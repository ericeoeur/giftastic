var pokemonList = ["Raichu", "Marowak", "Togepi", "Mudkip", "Meowth", "Koffing", "Ekans", "Torchic", "Gengar"];

function displayPokemon() {

    let pokemon = $(this).attr("pokemon-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + pokemon;  //search query


    $.ajax({
        url: queryURL,
        method: "GET"
    }) // After the data from the AJAX request comes back
        
    .done(function (response) {
            console.log(response);
            $("#pokemon").html("");

        
        //Make a for loop to display all images
            for (i = 0; i < 10; i++) {
                //set variables with still and moving image from giphy
                let stillImageUrl = response.data[i].images.fixed_height_still.url;
                let movingImageUrl = response.data[i].images.fixed_height.url;
                let pokeImage = $("<img>");
                    pokeImage.attr("src", stillImageUrl);
                    pokeImage.attr("alt", "nonMoving");

                //add rating information per image; include in for loop's [i]
                let rating = $("<p>Rated " + response.data[i].rating + "</p>");
                let col = $("<div>");
                    col.attr("class", "pokeImage");
                    col.append(rating);

                //set thumbnail bootstrap with divs 
                let thumbnail = $("<div>");
                    thumbnail.attr("class", "thumbnail");
                    thumbnail.append(pokeImage);

                col.append(thumbnail);

                //append all information from div to pokemon id 
                $("#pokemon").append(col);


                //set on click event for moving/still images
                pokeImage.on("click", function () {
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

// This function handles events when the add pokemon button is clicked
$("#addPokemon").on("click", function (event) {
    event.preventDefault();
    var pokemon = $("#pokemon-input").val().trim(); // This line of code will grab the input from the pokemon-input text box
    pokemonList.push(pokemon);// The pokemon from the is added to array
    renderPokemon(); // Calling renderPokemon which handles the processing of our pokemon array into a button
});

$(document).on("click", ".pokemon", displayPokemon);
renderPokemon();