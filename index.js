const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const app = express();

// 1) MIDDLEWARES
app.use(cors());
app.use(express.json());

// 2) ROUTES
app.use('/', authRouter);
app.use('/api/auth', authRouter);


// 3) MongoDB Connection
mongoose
    .connect('mongodb://mongo:xdvUWhhRLNxFGHvcSZLaOqLvIkbPXVlS@monorail.proxy.rlwy.net:47997')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Failed to connect to MongoDB', error));

// 4) Global Error Handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
// 5) SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));