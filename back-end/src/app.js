const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
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

// Create the uploads directory if it doesn't exist
// const uploadsDir = path.join(__dirname, 'uploads');

// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
//   console.log('Uploads directory created');
// }

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api', authRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/profile', profileRoutes);

module.exports = app;