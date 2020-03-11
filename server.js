const express = require("express");
const helmet = require("helmet");
// const postRouter = require('./posts/postRouter')
// const userRouter = require('./users/userRouter')
const allRoutes = require("./routes");

const server = express();
// plug in the body parsing ability
server.use(express.json());
// plug in the header overrides with the helmet lib
// the helmet variable, as imported, is a FUNCTION THAT RETURNS A FUNCTION MIDDLEWARE
server.use(helmet());
// connect it here, a m. that writes a more generic X-Powered-By
server.use(function(req, res, next) {
  req.friend = { id: 1, name: "Layla" };
  // res.header("X-powered-By","Do not be nosy")
  // res.header("custom-header", "Ali header")
  next();
});

// server.use( postRouter)
//'/posts',
server.use("/users", allRoutes.userRouter)
//'/users',
server.use("/posts", allRoutes.postRouter)

// const users = [];// each user has { name: 'Gabe', age: 43 }
// server.post("/users", logger, (req, res) => {
//     // has to have body
//   // hast to have body.name
//   // name has to be over three chars
//    users.push({ name: req.cleanName});
//   res.status(201).json(users);
// });

// server.get("/friend", (req, res) => {
//   res.send(`<h2>Hello, friend ${req.friend.name}</h2>`);
// });

// server.get("/:id", (req, res) => {
//   res.send(`<h2>That is a nice id: ${req.params.id}</h2>`);
// });

//custom middleware
// function validateAge(req, res, next) {
//   if (!req.body.age) {
//     res.status(422).json({ message: "age is required" });
//   } else if (isNaN(req.body.age)) {
//     res.status(422).json({ message: "that age does not look lika a number" });
//   } else if (Number(req.body.age) < 18) {
//     res.status(422).json({ message: "that age is too young" });
//   } else {
//     req.cleanAge = Number(req.body.age);
//     next();
//   }
// }

// function validateName(req, res, next) {
//   if (!req.body.name) {
//     res.status(422).json({ message: "name is required" })
//   } else if (req.body.name.trim().length < 5) {
//     res.status(400).json({ message: "name should be at least 5 characters" })
//   } else {
//     req.cleanName = req.body.name
//     next()
//   }
// }
function logger(req, res, next) {
console.log(`${req.method} ${req.path}`);
next()
}

module.exports = server;
