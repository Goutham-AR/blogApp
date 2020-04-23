const methodOverride = require("method-override");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/blogDB");
//APP/Config....
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

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

// INDEX ROUTES
app.get("/blogs", function(req, res) {
    blog.find({}, function(err, blogs) {
        if(err) {
            console.log("error", err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});
// NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
    blog.create(req.body.blog, function(err, newBlog) {
        if(err) {
            console.log("error", err);
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
    blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            console.log("error", err);
        } else {
            res.render("show", { blogPost: foundBlog });
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
    blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
    blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
    blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log("error", err);
        } else {
            res.redirect("/blogs");
        }
    });
});















app.listen(3000, function(){
    console.log("server is running....");
});