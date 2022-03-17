const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/`));
// sendFile will go here
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.listen(PORT);
console.log(`Server started at http://localhost:${PORT}`);
