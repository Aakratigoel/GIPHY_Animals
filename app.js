//Select HTML document and when it is ready or when it is rendered fully execute all the statements 
//inside the callback function.
$(document).ready(function() {
    //declaring array named animals and storing values into the array.
      var animals = [
        "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
        "bird", "ferret", "turtle", "sugar glider", "chinchilla",
        "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
        "capybara", "teacup pig", "serval", "salamander", "frog"
      ];
    //defining the function populateButtons that takes three arguments 
    //the function creates buttons for all the animals that are in the argument "arrayToUse"
    //and adds class to each button and the class is in the "classToAdd" argument and then the
    // created button is added to the HTML element that is in the "areaToAddTo" argument.
      function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        //deleting any information that the "areaToAddTo" HTML element already has, in order 
        //to just add  newly created buttons to the element
        $(areaToAddTo).empty();
    
        //for loop reads through the array "arrayToUse"
        for (var i = 0; i < arrayToUse.length; i++) {
          //new HTML element "button" is created and its reference is stored in variable named "a"
          var a = $("<button>");
          //using the "a" variable that has reference of the newly created button ,class "classToAdd"
          // is added to the button 
          a.addClass(classToAdd);
          //Similarly as above, using the "a" variable, "data-type" attribute of the button is set to
          // the name of the animal that is in the array at index i
          a.attr("data-type", arrayToUse[i]);
          //Text of the button is set as the name of the animal that is in the array at index i
          a.text(arrayToUse[i]);
          //Append the above created button the HTML element whose reference is stored in the argument
          //"areaToAddTo"
          $(areaToAddTo).append(a);
        }
    
      }
    
      //Select the document element using jquery and in the whole document whenever the element with
      // the class "animal-button" is clicked , callback function is executed
      $(document).on("click", ".animal-button", function() {
        //div element with id animals is emptied or we can say previous content in 
        //div is deleted.
        $("#animals").empty();
        //select all the animal button that have class "animal-button"  and remove class 
        //active of those buttons
        $(".animal-button").removeClass("active");
        //Add class "active" to the button that is clicked 
        $(this).addClass("active");
    
        //fetch the value of "data-type" attribute of the clicked button and store it in 
        //variable named type.
        var type = $(this).attr("data-type");
        // store the link/URL to/of the API to which request is sent into a variable named queryURL, and in the link mention
        // the parameter ( the type of animal whose gif we want to render on our page).
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    
        //ajax => Asynchronous javascript and XML
        // performs an asynchronous HTTP(ajax) request
        $.ajax({
          //These are the settings. A set of key/value pairs that configure the Ajax request.
          // url key,  value is set, value is the variable that stores the link to the URL to which
          //request is to be sent.
          url: queryURL,
          //method to be used for the request.method key, value is set, value is "GET" that means we can see the value retrieved 
          //in the browser's link.
          method: "GET"
        })
        //.then returns a  promise that  can filter the status and 
        //values that are deferred through a function.It takes
        // doneCallback (A function that is called once a response is received and all the 
        //data is stored in the response object.) as an argument .
        //response is passed as an argument to the doneCallback function
          .then(function(response) {
            //data is an array  of objects that is inside the response object and the data is fetched from
            //the response object and stored in the variable named as results.
            var results = response.data;
            //loop through the array of objects stored in the results variable.
            for (var i = 0; i < results.length; i++) {
              //create a new div and assign it a class named "animal-item" and store its reference
              //in variable named animalDiv.
              var animalDiv = $("<div class=\"animal-item\">");
              //access the rating of the ith element/ ith object stored in results array
              //and store it in a variable named rating.
              var rating = results[i].rating;
              //create a new p element and set its text to the rating and store the newly
              //created p element into a variable named p.
              var p = $("<p>").text("Rating: " + rating);
    
              //access the animated image link from the ith element/ith object stored in results array
              //and store it in a variable named animated.
              var animated = results[i].images.fixed_height.url;
              //access the still image link from the ith element/ith object stored in results array
              //and store it in a variable named still.
              var still = results[i].images.fixed_height_still.url;
    
              //create a new image element and store its reference in a variable named animalImage
              var animalImage = $("<img>");
              //set the attributes of the image element using the variable in which its referenced
              //is stored.
              //setting the source attribute, that contains the url of the image, and the url set here
              //is the url for the still image stored in the still variable.
              animalImage.attr("src", still);
              //setting the data-still attribute, and the url set here
              //is the url for the still image stored in the still variable.
              animalImage.attr("data-still", still);
              //setting the data-animate attribute, and the url set here
              //is the url for the animate image stored in the animate variable.
              animalImage.attr("data-animate", animated);
              //setting the data-state attribute to still initially when the image is loaded 
              animalImage.attr("data-state", "still");
              //adding the class "animal-image" to the image element newly created. 
              animalImage.addClass("animal-image");
    
              //appending the p and animalImage variable that store the reference of the newly 
              //create p element that has the rating and image element that has the image to the 
              //newly created div element that is stored in animalDiv variable.
              animalDiv.append(p);
              animalDiv.append(animalImage);
    
              //appending the animalDiv variable to the div element with id animals
              $("#animals").append(animalDiv);
            }
          });
      });
    
      //Selecting the document using jquery and adding the on click event listener to the 
      //elements(i.e the images) that come under class animal-image ,i.e. when the images that
      //come under animal-image class are clicked then the callback function should
      //be executed.
      $(document).on("click", ".animal-image", function() {
        //storing the current state of the clicked image by accessing the
        // "data-state" attribue through "this" keyword(this here refers to the current 
        //image clicked) into variable named state.
        var state = $(this).attr("data-state");
    //checking the state of the image against  value "still" using if-else condition
    //if condition is true then the statements under the if block are executed
    //otherwise the statements under the else block are executed
    //the condition suggests that if the image is still then set it to animation on click.
        if (state === "still") {
          //setting the source attribute of the clicked image to the URL of the animated image
          //that is stored in the "data-animate" attribute.
          $(this).attr("src", $(this).attr("data-animate"));
          //changing the state from still to animate
          $(this).attr("data-state", "animate");
        }
        //image is in animated state then it should come to still state on click
        else {
          //setting the source attribute of the clicked image to the URL of the still image
          //that is stored in the "data-still" attribute.
          $(this).attr("src", $(this).attr("data-still"));
          //changing the state from animate to still
          $(this).attr("data-state", "still");
        }
      });
    //adding the event listener on click on the submit button of the form i.e when the new animal
    //is added into the textbox of the form and when the submit button is clicked ,
    // the the callback function should be executed.
      $("#add-animal").on("click", function(event) {
       // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        //the eq() selector selects the element at index( passed as an argument)
        // within the matched set i.e. input element.
        //so, in the below statement ,value of  input element that is stored at index 0 is stored in
        // variable named newAnimal.
        var newAnimal = $("input").eq(0).val();
    //if length of the name of the new animal is greater than 2
    //animal is pushed into the animals array.
        if (newAnimal.length > 2) {
          animals.push(newAnimal);
        }
    //function populateButtons is called after the new animal entered by the user is pushed into
    //animals array, and the animals array , class:"animal-button" and the div to which the button
    //will be added are passed as argument.
        populateButtons(animals, "animal-button", "#animal-buttons");
    
      });
    //function populateButtons is called as soon as the document is ready after HTML is rendered 
    //and the animals array , class:"animal-button" and the div to which the button
    //will be added are passed as argument.
      populateButtons(animals, "animal-button", "#animal-buttons");
    });
    