const express = require("express");
//To download from telegram
var http = require("http");
var https = require("https");
//To write to file
var fs = require("fs");
//To parse url parts
const url = require("url");
//Creating express server
var app = express();
//To fill req.body.
var bodyParser = require("body-parser");
//if you comment this, req.body will be undefined
app.use(bodyParser.json());
//This will set CORS (security things that will allow our bot server to request to this server.)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, HEAD, POST, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-Api-Token, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//robot request this when it wants to upload sth.
app.post("/upload", function(req, res) {
  //check clientid
  if (req.headers["clientid"] != "123")
    res.status(401).json({
      error: "clientid is wrong."
    });
  //it's like >> var link=req.body.link;
  var { link } = req.body;

  //https://api.telegram.org/file/bot449968526:AAGY4Tz48MiN8uxUD_0nWHFZSQscD9OQ_Vk/videos/file_19.mp4

  //export path to store from telegram link
  var filePath = url.parse(link).pathname;
  //this step filePath is >> /file/bot449968526:AAGY4Tz48MiN8uxUD_0nWHFZSQscD9OQ_Vk/<our_path> and we want <our_path>

  //admin it-word cloud
  // var bot = botgram("456299862:AAGB1q_AMolsLpeE5EARolW4FHEi5-1kqjE");
  // filePath = filePath.replace("/file/bot456299862:AAGB1q_AMolsLpeE5EARolW4FHEi5-1kqjE/", "");

  //shmt_bot
  // //var botToken = "449968526:AAGY4Tz48MiN8uxUD_0nWHFZSQscD9OQ_Vk";
  // filePath = filePath.replace("/file/bot449968526:AAGY4Tz48MiN8uxUD_0nWHFZSQscD9OQ_Vk/", "");

  //iribnews
  //// var botToken = "545443179:AAGEKFAT_mg5H2aTZbCKEPXr2Pkee11b8l4";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // filePath = filePath.replace(
  //   "/file/bot545443179:AAGEKFAT_mg5H2aTZbCKEPXr2Pkee11b8l4/",
  //   ""
  // );
////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // //Solving index problem for ogg files
  // if (!filePath.includes('.')) {
  //     filePath += ".ogg";
  // }

  var subfolder = filePath.substring(0, filePath.lastIndexOf("/"));
  // var dir = "./files/" + subfolder;
  var dir =  "."+subfolder;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  //create a stream to write file on our storage
  var file = fs.createWriteStream( "."+filePath);
  //get file
  var request = https.get(link, function(response) {
    //store it with created write stream
    response.pipe(file);
    return res.status(200).json({filePath:filePath.replace("/file/","")})
  });

  //DONE :)
});
//robot request this when it wants to upload sth.
app.post("/upload/http", function(req, res) {
  //check clientid
  if (req.headers["clientid"] != "123")
    res.status(401).json({
      error: "clientid is wrong."
    });
  //it's like >> var link=req.body.link;
  var { link } = req.body;

  //https://api.telegram.org/file/bot449968526:AAGY4Tz48MiN8uxUD_0nWHFZSQscD9OQ_Vk/videos/file_19.mp4

  //export path to store from telegram link
  var filePath = url.parse(link).pathname;
  //this step filePath is >> /file/bot449968526:AAGY4Tz48MiN8uxUD_0nWHFZSQscD9OQ_Vk/<our_path> and we want <our_path>

  //admin it-word cloud
  // var bot = botgram("456299862:AAGB1q_AMolsLpeE5EARolW4FHEi5-1kqjE");
  // filePath = filePath.replace("/file/bot456299862:AAGB1q_AMolsLpeE5EARolW4FHEi5-1kqjE/", "");

  //shmt_bot
  // //var botToken = "449968526:AAGY4Tz48MiN8uxUD_0nWHFZSQscD9OQ_Vk";
  // filePath = filePath.replace("/file/bot449968526:AAGY4Tz48MiN8uxUD_0nWHFZSQscD9OQ_Vk/", "");

  //iribnews
  //// var botToken = "545443179:AAGEKFAT_mg5H2aTZbCKEPXr2Pkee11b8l4";
  filePath = filePath.replace(
    "/file/bot545443179:AAGEKFAT_mg5H2aTZbCKEPXr2Pkee11b8l4/",
    ""
  );

  // //Solving index problem for ogg files
  // if (!filePath.includes('.')) {
  //     filePath += ".ogg";
  // }

  var subfolder = filePath.substring(0, filePath.lastIndexOf("/"));
  var dir = "./files/" + subfolder;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  //create a stream to write file on our storage
  var file = fs.createWriteStream("./files/" + filePath);
  console.log(link)
  //get file
  var request = http.get(link, function(response) {
    //store it with created write stream
    response.pipe(file);

    return res.status(200).json({filePath: filePath})
  });

  //DONE :)
});
//server will listen on 9001 port for requests.
app.listen(9001, () => console.log("Upload server listening on port 9001!"));
