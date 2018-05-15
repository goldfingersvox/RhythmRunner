let songPath

$(document).ready(function(err){
    $.ajax("/upload", {
        type: "GET",
      }).then(
        function(results){
          console.log(results);
          songPath=results
        })
    

    });
