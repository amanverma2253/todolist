const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");




const app = express();

const listItems = [];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemSchema = {
  name : String
};

const Item = mongoose.model("Item", itemSchema);

const Item1 = new Item({
  name: "Welcome"
});
const Item2 = new Item({
  name: "Hi"
});
const Item3 = new Item({
  name: "Create your todo list"
});

const defaultItems = [Item1, Item2, Item3]; 

Item.insertMany(defaultItems, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully saved default items to DB");
  }
});



app.get("/", function(req, res) {



  res.render("list", {
    listTitle: "Today",
    newlistItems: items
  });
});

app.get("/work", function(req, res){
  res.render("list", {
    listTitle: "Work List",
    listItems: workItems});
});

app.post("/", function(req, res){

  if(req.body.listSubmit === "Work"){
    workItems.push(req.body.newTodo);
    res.redirect("/work");
  }else{
    listItems.push(req.body.newTodo);
    res.redirect("/");
  }
});

app.listen(4000, function() {
  console.log("Server running on port 3000.");
});
