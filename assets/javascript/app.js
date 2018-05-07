var topics = [
    "waking life",
    "bodega",
    "fantastic planet",
    "goku",
    "bob ross",
    "fry",
    "lit",
    "tommy wiseau",
    "fuego",
    "ewoks",
    "interdimesional cable",
    "mandelbrot",
    "lava",
    "milly rock"
    
  ];
  

  renderButton();
  
  //deploy gif awesomeness
  
  function displayImage() {
    $("#gif-view").empty();
    var search = $(this).attr("data-name");

    
    
    
    $.ajax({
      
      //limit gif searches to 10 images
      url: "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10",
      method: "GET"
    }).then(function(response){
      console.log(response);
      var gifs = response.data
      for (var i = 0; i < gifs.length; i++) {
      var gifDiv = $("<div>");
      gifDiv.addClass("col-md-3");
      var p = $("<p>");
      p.text("Rating: " + gifs[i].rating.toUpperCase());
      var newGif = $('<img>');
      newGif.attr("data-animate", gifs[i].images.fixed_height.url)
      newGif.attr("data-still", gifs[i].images.fixed_height_still.url)
      newGif.attr("data-state", "animating");
      newGif.attr('src', gifs[i].images.fixed_height.url);
      newGif.attr('class', 'clickMe')
      gifDiv.append(p);
      gifDiv.append(newGif);  
      $("#gif-view").append(gifDiv);
      }
      
            
    });
      
      
     
        
  };
  
//       $(document).on("click", ".clickMe", function(){
//         if($(this).data-state = "animating"){
    
//         }
//       });
  
  // make clickable buttons  
  
  function renderButton(){
    
    $("#buttons-view").empty();
    
    for (var i = 0; i < topics.length; i ++) {
      var buttons= $("<button>");
      buttons.addClass("buttons");
      buttons.attr("data-name", topics[i]);
      buttons.text(topics[i]);
      $("#buttons-view").append(buttons);   
     
    }
    
  };
  
  // add content and convert to new button
  $("#add-content").on("click", function(event) {
    event.preventDefault();
    var content = $("#content-input").val().trim();
    
    
    
    topics.push(content);
    console.log(topics);
    $("#content-input").val('');
    
    renderButton();
    
  });
  
  
  

  
  // Intial render + Click operations 
  renderButton();
  $(document).on("click", ".buttons", displayImage);
  
  $(document).on("click", ".clickMe", function(){
    var state = $(this).attr("data-state")
    console.log(state);
      if (state === "animating") {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', "still");
      } else {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', "animating");
      }

    });