require('dotenv').config();
const express = require('express')
var app = express();
var http = require("http").Server(app);
const cors = require('cors');
const db=require('./src/db/index')
const PORT = process.env.PORT || 8080

const corsOption = {
    origin: '*'
}
app.use(cors(corsOption))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./src/routes/index")(app);
http.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
})