
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //TODO: get all users' IDs & display it
       $.ajax({
           url: '/tweets',
           contentType: 'application/json',
           success: function(response){
               var tBodyEl = $(namebody);
               tBodyEl.html('');
               response.tweetinfo.forEach(function(tweetinfo){
                   tBodyEl.append('\
                   <tr>\
                   <td class = "id">' + tweetinfo.id + '</td>\
                   <td class = "screen name">' + tweetinfo.user.screen_name + '</td>\
                   <td class = "name">' + tweetinfo.user.name + '</td>\
                       </tr>\
                       ');
               });
               console.log();
           }
       });

    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
        console.log('gettweetinfo');
        $.ajax({
            url: '/tweetinfo',
            contentType: 'application/json',
            success: function(response){
                var tBodyElt = $(tweetbody);
                tBodyElt.html('');
                response.tweetinfo.forEach(function (tweetinfo){
                    tBodyElt.append('\
                   <tr>\
                   <td class = "id">' + tweetinfo.id + '</td>\
                   <td class = "text">' + tweetinfo.text + '</td>\
                   <td class = "created at">' + tweetinfo.created_at + '</td>\
                       </tr>\
                       ');
                })
            }
        });
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
        $.ajax({
            url: '/searchinfo',
            contentType: 'application/json',
            success: function(response){
                var tBodyElt = $(searchbody);
                tBodyElt.html('');
                response.tweetinfo.forEach(function (tweetinfo){
                    const id1 = tweetinfo[ind].id;
                    const id2 = tweetinfo[ind].id_str;
                    if(tweetinfo.id == id1 ||tweetinfo.id_str == id2) {
                        tBodyElt.append('\
                   <tr>\
                   <td class = "id">' + tweetinfo.id + '</td>\
                   <td class = "text">' + tweetinfo.text + '</td>\
                   <td class = "created at">' + tweetinfo.created_at + '</td>\
                       </tr>\
                       ');
                    }
                })
            }
        });
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        //TODO: creat a tweet
      event.preventDefault();
      var updateInput = $('#create-input');
      var inputString = updateInput.val();

      const parsedStrings = inputString.split(';');

      var id = parsedStrings[0];
      var text = parsedStrings[1];

      $.ajax({
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({tweet: inputString}),
          success: function(response){
              console.log(response);
              $('get-tweets-button').click();

          }
      })

  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
    
    //TODO: search a tweet and display it.
      var updateInput = $('#search-input');
      var inputString = updateInput.val();
      $.ajax({
          url: '/searchinfo',
          contentType: 'application/json',
          data: JSON.stringify({id: inputString}),
          success: function(response){
              var tBodyElt = $(searchbody);
              tBodyElt.html('');
              response.tweetinfo.forEach(function (tweetinfo){
                  if(tweetinfo.id == inputString ||tweetinfo.id_str == inputString) {
                      tBodyElt.append('\
                   <tr>\
                   <td class = "id">' + tweetinfo.id + '</td>\
                   <td class = "text">' + tweetinfo.text + '</td>\
                   <td class = "created at">' + tweetinfo.created_at + '</td>\
                       </tr>\
                       ');
                  }
              })
          }
      });

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet

      $.ajax({
          url: '/tweets',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({tweet: inputString}),
          success: function(response){
              console.log(response);
              $('update-input').click();
          }
      })
  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input')
    event.preventDefault();

    //TODO: delete a tweet
      $.ajax({
          url: '/tweetinfo',
          method: 'DELETE',
          contentType: 'application/json',
          data: JSON.stringify(id),
          success: function(response){
              console.log(response);
              $('delete-button').click();
          }
      })

  });


});


                    
   