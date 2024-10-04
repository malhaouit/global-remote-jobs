const express = require('express');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);

module.exports = app;