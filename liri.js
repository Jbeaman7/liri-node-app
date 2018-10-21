require("dotenv").config();
const keys = require("./keys");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
let request = require("request");
const fs = require("fs");
const moment = require("moment");
//------------------------------------------------------------------------------//
//User Input Logic
let userCommand = process.argv[2];

if (userCommand === "spotify-this-song"){
    spotifyCheck();
    spotifyFunc(songSearch)
}else if(userCommand === "movie-this"){
    movieCheck();
    movieFunc(movieSearch);
}else if(userCommand === "concert-this"){
    bandsCheck();
    bandsFunc();
}else if(userCommand === "do-what-it-says"){
    doItFunc();
}else return console.log("Error: Please type a command!");
//------------------------------------------------------------------------------//

Spotify
function spotifyCheck(){
    if(!process.argv[3] ){
        songSearch = "Passionfruit"
    }else{
        for (i = 3; i < process.argv.length; i++) {
			songSearch = process.argv[i];
    }
}};

function spotifyFunc(songSearch){
    spotify.search({type: "track", query: songSearch, limit: 1}, function(error, response){
        if(error){
            return console.log(error);
        }
        for (var j = 0; j < response.tracks.items[0].album.artists.length; j++) {
			console.log("Artist: " + response.tracks.items[0].album.artists[j].name);
			console.log("Song: " + response.tracks.items[0].name);
			console.log("Song Preview: " + response.tracks.items[0].external_urls.spotify);
			console.log("Album: " + response.tracks.items[0].album.name);
		}
    });
};

//------------------------------------------------------------------------------//
//OMDB
function movieCheck(){
    if(!process.argv[3]){
        movieSearch = "Black Panther";
    }else{
        for (var k = 3; k < process.argv.length; k++) {
			movieSearch     = process.argv[k] + "+"
		}
    }
};

function movieFunc(movieSearch){
    let omdbMovie = "http://www.omdbapi.com/?apikey=88ef9d01&t=" + movieSearch;

    request(omdbMovie, function(error,response,body){
        if(error){
            console.log(error);
        }
       console.log("Title:" + JSON.parse(body).Title);
       console.log("Release Date:" + JSON.parse(body).Year);
       console.log("IMDB Rating:" + JSON.parse(body).imdbRating);
       console.log("IMDB Rating:" + JSON.parse(body).imdbRating);
       console.log("Produced in:" + JSON.parse(body).Country);
       console.log("Language:" + JSON.parse(body).Language);
       console.log("Plot:" + JSON.parse(body).Plot);
       console.log("Cast:" + JSON.parse(body).Actors);
       console.log(JSON.parse(body).Ratings[1]);
     
    })
}
//------------------------------------------------------------------------------//
//BandsInTown
function bandsCheck(){
    if(!process.argv[3] ){
        bandSearch = "Architects"
    }else{
        for (i = 3; i < process.argv.length; i++) {
			bandSearch = process.argv[i];
    }

    function bandsFunc(bandSearch){
        let bandData = "https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=codingbootcamp";
        request(bandData, function(err,response,body){
            if(err){
                console.log(error);
            }
            let info = JSON.parse(body)[0];
            console.log(info.venue.name);
        })
    }
}};


//------------------------------------------------------------------------------//
//Do What It Says

function doItFunc(){

    fs.readFile("random.txt", "utf8", function(err, data){
        if(err){
            return console.log(error);
        }else{
            split = data.split(",");
            
            if(split[0] == "spotify-this-song"){
                songSearch = split[1];  
                spotifyFunc(songSearch);

            }else if(split[0] == "movie-this"){
                movieSearch = split[1];
                movieFunc(movieSearch);
            }
            
        }

    })
}