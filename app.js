const express = require("express");
const bodyParser = require("body-parser");

//best practice __dirname + filename
const date = require(__dirname + "/date.js");

const app = express();



let items = [];
let workitems = [];

//setup ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res){
  let day = date();
  res.render("list", {
    listTitle:day,
    newListItems: items
  });

});

app.post("/", function(req, res){
  let item = req.body.newitem;
  if (req.body.list === "Work"){
    workitems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {
    listTitle: "Work List",
    newListItems : workitems
  });
});

app.post("/work", function(req,res){
  let item = req.body.newitem;
  workitems.push(item);
  res.redirect("/work");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
