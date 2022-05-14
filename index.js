const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config();

const app = express();
const port = 8080;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/categories");

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./models");
// db.sequelize.sync();
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
  res.json({ message: "Health check ok!" });
});

app.use(express.json());

app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || port, () =>
  console.log(`Hello world app listening on port ${process.env.PORT || port}!`)
);
