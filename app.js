const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { dirname } = require("path");
const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/singup.html")
})

app.post("/",function(req,res){
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fName,
                    LNAME: lName
                } 
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/6b62095ea6"
    const option = {
        method : "POST",
        auth: "Mouhamad:43c270559ae9b06bf375656cf2afd641-us21"
    }

    const request = https.request(url,option,function(response){
        response.on("data",function(data){
            var statusCode = response.statusCode
            // console.log(statusCode);
            if (statusCode===200) {
                res.sendFile(__dirname+"/success.html");
            } else{
                res.sendFile(__dirname+"/failure.html");
            }
            // console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
}) 

app.post("/failure",function(req,res){
    res.redirect("/");
});



app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000...");
})

// API key   43c270559ae9b06bf375656cf2afd641-us21
    // console.log(fName, lName, email) ;

// unique ID   6b62095ea6
// https://us21.api.mailchimp.com/3.0/lists/6b62095ea6
