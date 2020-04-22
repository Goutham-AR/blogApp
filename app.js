const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/blogDB");
//APP/Config....
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Mongoose/Config....
/* 
mongoose schema model
------------------------- 
title 
image 
body 
created date  
*/
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
let blog = mongoose.model("blog", blogSchema);


// RESTful Routes

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
    blog.find({}, function(err, blogs) {
        if(err) {
            console.log("error", err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});















app.listen(3000, function(){
    console.log("server is running....");
});