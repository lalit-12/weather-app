const express =require("express");
const app =express();
const https =require("https");
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function (req,res){
  const query=req.body.cityname;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&units=metric&appid=442a6509d094feb8aef45d329a7a8a15"
  https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
    const weatherdata = JSON.parse(data)
    const temp =weatherdata.main.temp
    const icon =weatherdata.weather[0].icon
    const imageurl ="http://openweathermap.org/img/wn/" + icon +"@2x.png"
    const weatherdescription =weatherdata.weather[0].description
    console.log(weatherdata);
    console.log(temp);
    res.write("<p>the weather description is currently" + weatherdescription +"</p>");
    res.write("<h1>The temperature in "+ query +" is"  +temp+  "degree celcius</h1>");
    res.write("<img src=" + imageurl + ">");
    res.send();
  });
 });
})
app.listen(3000,function(){
  console.log("sever is started on port 3000 sucessfully");
})
