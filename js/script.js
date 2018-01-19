$(document).ready(function(){

  var PRIV_KEY = "40828e009f670abd1e617a3fb95e0418a898b757";
  var PUBLIC_KEY = "bf41cf76b8b7ccb4bc29c795ec5caa8c";

  function getMarvelResponse() {

    // you need a new ts every request
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

    // the api deals a lot in ids rather than just the strings you want to use
    var characterId = '1009718'; // wolverine


    var url = 'http://gateway.marvel.com:80/v1/public/comics';

    console.log(url);
    $.getJSON(url, {
      ts: ts,
      apikey: PUBLIC_KEY,
      hash: hash,
      characters: characterId
      })
      .done(function(response) {
        // sort of a long dump you will need to sort through

        var results = response.data.results;
        var resultsLen = results.length;
        var output = '<ul id="comics">'

       for( var i=0; i<resultsLen; i++){
          if(results[i].images.length > 0) {
            var imgPath = results[i].images[0].path + '/standard_xlarge.' +
            results[i].images[0].extension;
            output += '<li><img src="' + imgPath + '"><br><label>'+results[i].title+'</label></li>';

          }
        }

        output += '</ul>'
        $('#results').append(output);


        console.log(imgPath);




})

      .fail(function(err){
        // the error codes are listed on the dev site
        console.log(err);
      });
  };

  getMarvelResponse();
});

function searchComicTitles() {
  var input = document.getElementById('searchbar')
  var filter = input.value.toUpperCase();
  var ul = document.getElementById('comics');
  var text = ul.getElementsByTagName('li');

  for (var i=0; i< text.length; i++){
        var newComic = text[i].getElementsByTagName('label')[0];
        if (newComic.innerHTML.toUpperCase().indexOf(filter) > -1) {
          text[i].style.display = "";
        }else{
          text[i].style.display = "none";
        }
    }

};
