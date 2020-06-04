const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

//can use this as well for body parser
app.use(express.urlencoded());


app.get("/", function(req, res) {

  res.sendFile(__dirname+"/index.html");



})
app.post("/",function(req,res){
   console.log(req.body);

  var query = req.body.cityName;

  const apiKey = "18b8a23715160667d6ad914f4faaf478";
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apiKey + "&units=" + units;

  //accessing the url getting a response and doing something with the response
  https.get(url, function(response) {
    // console.log(response);

    //method in the https to get data from external server
    response.on("data", function(data) {
      //parsing string into JSON format "Stringify" for reverse from JSON to array/string format
      const weatherdata = JSON.parse(data);
      var temp = weatherdata.main.temp;
      var description = weatherdata.weather[0].description;
      var icon = weatherdata.weather[0].icon;
      var imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      // console.log(temp);
      // console.log(description);
      //can write html in the write section
      res.write("<h1>Temperature in "+query+" is " + temp + " and it looks like " + description + "</h1>")
      res.write(description + "<br>");
      res.write("<img src = " + imageURL + " alt = 'Weather Image'>");

      //can only have 1 send more than 1 will return an error can use multiple res.write() to display lines b4 sending at the very end.
      res.send();
    });
  });

})
//




app.listen(3000, function() {
  console.log("server is running on port 3000");
})
