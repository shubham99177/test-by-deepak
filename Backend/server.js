const express = require('express');
const app = express();
const connectDB = require('./config/DB');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressSession = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const MongoStore = require("connect-mongo");


const cartRouter = require('./routes/cartRouter');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const contactRouter = require('./routes/contactRouter');
const orderRouter = require('./routes/orderRouter');

const index = require('./routes/index');
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
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // Ensure this variable is set
    }),
    cookie: { secure: false },
  })
);
app.use(flash());


/* deployment logic */
app.use(express.static(path.join(__dirname, "Frontend/dist")));

// Catch-all handler for routes not handled by API endpoints
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend/dist", "index.html"));
});


app.use('/api', ownersRouter);
app.use('/api', usersRouter);
app.use('/api', productsRouter);
app.use('/api', index);
app.use('/api', cartRouter);
app.use('/api', contactRouter);
app.use('/api', orderRouter);

const port = process.env.PORT || 3000; // Default to 3000 if process.env.PORT isn't set
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = app;
