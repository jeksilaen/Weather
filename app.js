const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = "00fd3e7adf2d2a9ad3cefd55be410b2f";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png";

            res.write("<h1> The temperature in " + query +" is " + temperature + " degrees Celcius </h1>");
            res.write("<h2> The weather is currently " + description + ".</h2>");
            res.write("<img src=" + icon + ">");

            res.send();
        })
    })
})





app.listen(port, () => {
    console.log("Server is running on port 3000.");
});