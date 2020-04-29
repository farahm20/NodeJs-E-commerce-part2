const express = require('express');
const app = express();
const database = require('./Modules/database-operations');
const endpoints = require('./Modules/endpoints');
const port = process.env.PORT || 8000;

endpoints(app);
app.use(express.static('public'));

app.listen(port, () => {
     console.log('Server started on port:  ', port);
     database.initiateDatabase();
});
