const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const sequelize = require('./db.js');

const authRouter = require('./auth.routes.js');
const eventsRouter = require('./events.routes.js');
const signupsRouter = require('./signups.routes.js');
const adminRouter = require('./admin.routes.js');
const configRouter = require('./config.routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname)); 
app.use('/public', express.static(path.join(__dirname, 'public'))); 

app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);
app.use('/api/signups', signupsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/config', configRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
        app.listen(PORT, () => {
            console.log(`🚀 A.E.S. Server listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

startServer();
