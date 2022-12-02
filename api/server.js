require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require('./src/database/models');

const {errorConverter, errorException} = require("./src/middlewares/errorHandler");

const apiRouter = require('./src/routes');
const bodyParser = require("express");

const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-    With,content-type,Accept,content-type,application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,     PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

console.log(db.url);

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});

app.use('/api/forms', apiRouter);

app.use(errorConverter);
app.use(errorException);

const PORT = process.env.NODE_DOCKER_PORT || 3080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
