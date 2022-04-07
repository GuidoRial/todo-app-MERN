const express = require("express");
const app = express();
require("dotenv").config();
const engine = require("ejs-mate");
const morgan = require("morgan");

app.use(express.json());

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/index"));

app.engine("ejs", engine);
app.set("view engine", "ejs");
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
