const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);

module.exports = app;