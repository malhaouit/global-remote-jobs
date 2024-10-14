const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const jobSearchRoutes = require('./routes/jobSearchRoutes');
const connectDB = require('./config/db');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api', authRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/profile', profileRoutes);
app.use('/api/job-search', jobSearchRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the backend of Global Remote Jobs!');
});
  

module.exports = app;