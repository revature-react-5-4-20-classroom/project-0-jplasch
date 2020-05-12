import express from "express";
import { Application, Request, Response } from "express";
import bodyParser from 'body-parser';
import { Book } from "./models/Book";
import { books, users } from "./fake-database";
import { User } from "./models/User";

const app: Application = express();

// We'll start setting up get and post endpoints for books and for users.
// We'll want a getAll endpoint at the "root" for each route (/books or /users)
// We'll want a POST endpoint at the "root" for each route to add new books or users
// We'll want a getById endpoint at /books/1 for book 1, /books/2 for book 2, ...
//   and similar for users

// We're going to separate our concerns and write functions that getAll, getById, and addNew
// for books and users, then tie those functions to endpoints

// app.get('/hello', (req : Request, res : Response) => {
//   res.json('Hello');
// });

app.use(bodyParser.json());

app.get('/books', (req:Request, res:Response) => {
  res.json(getAllBooks()); // call our function because we're separating concerns
});

app.post('/books', (req:Request, res:Response) => {
  // Lets at least validate by checking for the existence of fields
  // We'll use a tool called Object destructuring:
  // This sets id, title, author, yearPublished, and wordCount
  let {id, title, author, yearPublished, wordCount} = req.body;
  // validate we received required fields:
  if(id && title && author && yearPublished) {
    addNewBook(new Book(id, title, author, yearPublished, wordCount));
    //If an error gets thrown, res.sendStatus(201) won't run.
    res.sendStatus(201);
  } else {
    // set response status to 400 and send appropriate message:
    res.status(400).send('Please include required fields.')
  }
});

//We're going to use a path parameter to get by id.  The syntax
// for parameter in the path is :param
// this will match books/1, books/2, books/50, ... (also books/notanum)
app.get('/books/:id', (req: Request, res: Response) => {
  // We access path paramers with req.params.param
  const id = +req.params.id; //The '+' converts our param to a number
  if(isNaN(id)) {
    res.status(400).send('Must include numeric id in path');
  } else {
    res.json(getBookById(id));
  }
});

app.get('/users', (req: Request, res: Response) => {
  res.json(getAllUsers());
});

app.post('/users', (req: Request, res: Response) => {
  let {id, username, password, email, role} = req.body;
  if(id && username && password && email && role) {
    addNewUser(new User(id, username, password, email, role));
    res.sendStatus(201);
  } else {
    res.status(400).send('Please include required fields.');
  }
});

app.get('/users/:id', (req: Request, res: Response) => {
  const id = +req.params.id;
  if(isNaN(id)) {
    res.status(400).send('Must include numeric id in path');
  } else {
    res.json(getUserById(id));
  }
})


app.listen(1999, () => {
  console.log("app has started");
});

function getBookById(id: number): Book {
  // Filter book array by id, then return the first/only book left
  return books.filter((book) => {
    return book.id === id;
  })[0];
}

function getAllBooks(): Book[] {
  return books;
}

// Responsible for putting completed Book objects in DB, not for constructing books
// Returns the book that was added
function addNewBook(book: Book): Book {
  // We should validate that the id is not already taken
  const booksMatchingId : Book[] = books.filter(
    (bookElement: Book) => {
      return bookElement.id === book.id;
    }
  );
  if (booksMatchingId.length === 0) {
    books.push(book);
    return book;
  } else {
    throw new Error('Book Id already taken');
  }
}

function getAllUsers(): User[] {
  return users;
}

function getUserById(id: number) : User {
  return users.filter((user)=>{return user.id === id;})[0];
}

function addNewUser(user: User) : User {
  const usersMatchingId = users.filter((userElement)=>{return user.id === userElement.id});
  if(usersMatchingId.length === 0) {
    users.push(user);
    return user
  } else {
    throw new Error('User Id already taken');
  }
}
