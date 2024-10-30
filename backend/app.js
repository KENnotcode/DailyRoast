const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const User = require('./models/User');
require('dotenv').config();

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow your frontend app
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  credentials: true, // Include credentials if needed (cookies, authorization headers, etc.)
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api', require('./routes/auth')); // Ensure this points to your auth routes
app.use('/api/users', require('./routes/getProfile'));

module.exports = app;