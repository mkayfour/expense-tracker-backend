const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3000;

require("./routes/index")(app);


// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./models");
// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

app.post('/book', (req, res) => {
    // We will be coding here

    const book = req.body;

    // Output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));