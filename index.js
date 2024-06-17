const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3005;
app.use(cors());
const server = http.createServer(app);

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/hrms", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public/build')));

// API routes
app.get('/api/abhi/test', function(req, res) {
    res.send('test Workflow success');
});

app.get('/api/example', function(req, res) {
    res.json({ message: 'This is an example route' });
});

// Fallback to index.html for client-side routing
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
