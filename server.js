const express = require('express');
const app = express();
const helmet = require('helmet');
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const path = require("path");
require("dotenv").config();
const morgan = require("morgan");
const cors = require('cors');



// middlewares
app.use(helmet())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());


// routes middleware
readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)))


// server
const port = process.env.PORT || 8000;

// Connect to DB and start server
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Running on port ${port}`);
        });
    })
    .catch((err) => console.log(err));