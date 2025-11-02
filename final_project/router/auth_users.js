const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "You are logged in"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  
    let user_review = req.session.username
    let ISBN = req.params.isbn
    let details = req.query.review
    let add_review = {user:user_review,review:details}
    books[ISBN].reviews = add_review
  return res.status(300).json({message: "Review has been added"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
