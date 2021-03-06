require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');

const env = process.env.NODE_ENV || 'production';
let config = {
  db: process.env.DATABASE,
  port: process.env.PORT
}
if (env != 'production') {
  config = require('./config/config.js')[env];
}

const port = process.env.PORT || config.port;

const models_path = path.join(__dirname, '/models');
fs.readdirSync(models_path).forEach(file => {
  require(models_path + '/' + file);
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(passport.initialize());
require('./config/auth')(passport);

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    mongoose.connection.collections['players'].deleteMany();
    mongoose.connection.collections['rooms'].deleteMany();
    mongoose.connection.collections['tictactoestates'].deleteMany();
    mongoose.connection.collections['battleshipsstates'].deleteMany();
  });

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/public/index.html'));
});

const authRoutes = require('./routes/auth');
authRoutes(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

const http = require('http').Server(app);
const io = require('socket.io')(http);
require('./socket/socket')(io);

http.listen(port, () => {
    console.log("Listening on port..." + port);
    
    if (process.env.NODE_ENV === 'test') {
        console.log("Running Tests...");
    }
});

module.export = app;