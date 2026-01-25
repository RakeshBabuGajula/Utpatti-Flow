const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');

// Connect to Database
connectDB();

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Security Middleware (Logging/Warning for now)
const { apiKeyMiddleware } = require('./middleware/authMiddleware');
app.use(apiKeyMiddleware);

// Error Handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
