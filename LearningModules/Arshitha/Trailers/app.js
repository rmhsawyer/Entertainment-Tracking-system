//required imports
var express = require("express");
var app = express();
var request = require("request");


var vidLink = new Array()
var link = " ";


app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
    
});

app.get("/results", function(req, res){
    var query = req.query.keyword;
    console.log(query)
    
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;
    
    request(url,function(error, response, body){
        if(!error && response.statusCode == 200){
            var parsedData = JSON.parse(body);
            
            
            parsedData["Search"].forEach(function(movie){ 
                var movieID = movie.imdbID;
                //console.log(movieID);
                console.log(movie.Title)
                var urlOne = "http://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=fc2ec17d17b2ffeee2d9053a7ac02965&append_to_response=videos";
                //console.log(urlOne)
                request(urlOne,function(error, response, body){
                    if(!error && response.statusCode == 200){
                        var parsedDataOne = JSON.parse(body);
                        //var key = parsedDataOne["results"][0]["key"]
                        //var link = "https://www.youtube.com/watch?v=" + key;
                        
                    
                        //parsedDataOne["Search"][0]
                        /*parsedDataOne["results"].forEach(function(searchResult){
                            var key = searchResult.key;
                            link = "https://www.youtube.com/watch?v=" + key;
                            //vidLink.push(link)
                            
                            
                            //res.send(link)
                        });*/
                        console.log(vidLink)
                    }
                });
                vidLink.push(link)
                    
            });
            
            res.render("results", {data: parsedData});
            
        }
    })
});
    

/*app.get("/trailers", function(req, res){
    var query = req.query.searchTerm;
    
    console.log(query);
    var movieID = "tt1201607";
    var url = "http://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=fc2ec17d17b2ffeee2d9053a7ac02965&append_to_response=videos";
    
    request(url,function(error, response, body){
        if(!error && response.statusCode == 200){
            var parsedData = JSON.parse(body);
            console.log(parsedData)
            res.render("trialers", {data: parsedData});
        }
    });
    
})*/
    
    


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie app has started")
});