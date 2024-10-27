const express = require('express');
const app = express();
const connectDB = require('./config/DB');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressSession = require('express-session');
const flash = require('connect-flash');
const path = require('path');


const cartRouter = require('./routes/cartRouter');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const contactRouter = require('./routes/contactRouter');
const orderRouter = require('./routes/orderRouter');

const index = require('./routes/index');
require('dotenv').config();

connectDB();
app.use(cors());
app.use(express.json());   // To accept JSON data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());

app.use('/api', ownersRouter);
app.use('/api', usersRouter);
app.use('/api', productsRouter);
app.use('/api', index);
app.use('/api', cartRouter);
app.use('/api', contactRouter);
app.use('/api', orderRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
