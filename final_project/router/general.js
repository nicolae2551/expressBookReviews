const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        
        if (!doesExist(username)) {
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "Unable to register user."});
    //return res.status(300).json({message: "Yet to be implemented"});
});

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Check if the user with the given username and password exists
const authenticatedUser = (username, password) => {
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let get_books = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(books)
        },6000)
    })

    get_books.then((books) => {
        res.send(JSON.stringify({books}, null, 4));
    })
   
  return res.status(300).json({message: "Users requested"});
});





// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn
    
  let get_books_by_isbn = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(books[isbn])
    },6000)
})

    get_books_by_isbn.then((books) => {
        books[isbn]
    })

    return res.status(300).json({message: "Books ISBN requested"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author
  res.send(books[author])
  return res.status(300).json({message: "Author requested"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
   
  let get_books_by_title = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(books[title])
    },6000)
})

    get_books_by_title.then((books) => {
        books[title]
    })

    return res.status(300).json({message: "Books title requested"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const review = req.params.isbn
  res.send(books[review])
  return res.status(300).json({message: "Review by ISBN requested"});
});

module.exports.general = public_users;
