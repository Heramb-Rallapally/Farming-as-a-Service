const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });

    
app.get('/', (req, res) => {
  res.send('Hello World! Server is running.');
});