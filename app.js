const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const db = require("./services/database.js");
const ws = require("./services/websockets.js");

app.use(express.static('public'));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const cors = require("cors");
app.use(cors());

const fileUpload = require("express-fileupload");
app.use(fileUpload({createParentPath: true}));

const ejs = require("ejs");

//configuration of ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/index.js");
app.use("/", indexRouter);
const destinationRouter = require("./routes/destination.js");
app.use("/destinations", destinationRouter);
const userRouter = require("./routes/user.js");
app.use("/users", userRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.use(function(req, res, next) {
    res.status(404).render("error", {error: {code: 404, message: "Can not find that page"}});
});



