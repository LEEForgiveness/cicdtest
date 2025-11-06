const url = require('url');
const express = require('express');
const middleware = require("./middleware/middleware");

const app = express();
app.get('/', (req, res) => {
  res.end('Hello World');
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})

// app.use('/', middleware);
//test
app.get("/admin", (req, res) => {
  res.end("Admin Page");
});

app.get("/users", (req, res) => {
  res.end("Users Page");
})

app.get("/guests", (req, res) => {
  res.end("Guests Page");
})

app.get("/test", (req, res) => {
    res.end("Test Page");
})


