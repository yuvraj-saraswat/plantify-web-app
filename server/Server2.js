require("dotenv").config();

const express = require('express');
const cors = require('cors');
const { router } = require('./router/route');

const app = express();
const PORT =  3000;

app.use(cors());
app.use(express.json());

app.use('/api', router);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
