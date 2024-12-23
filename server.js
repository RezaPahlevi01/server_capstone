// const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());  // Untuk parsing JSON body request

// Import endpoint dari folder /api
const dataRoutes = require('./api/data');
const registerRoutes = require('./api/register');
const loginRoutes = require('./api/login');
const loginPengepulRoutes = require('./api/loginPengepul');

// Routing
app.use('/api/data', dataRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/loginPengepul', loginPengepulRoutes);

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
