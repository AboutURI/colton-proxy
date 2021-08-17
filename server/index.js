const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 2712;
const host = process.env.HOST || 'localhost';

app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});