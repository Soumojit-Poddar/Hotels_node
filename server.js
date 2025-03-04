const express = require('express');
const app = express();
const db = require('./db'); // Ensure database connection is properly configured

const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('dotenv').config();

const personRoutes = require('./routes/personRoutes.js');
app.use('/person', personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes.js');
app.use('/menu', menuItemRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to my hotel.');
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
