const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const mongoDB = require('./db');
const FarmerDetails = require('./models/Farmer_details');

app.use(cors());
app.use(express.json());

// Use farmer routes
app.use('/api/farmers', require('./Routes/FarmerRoutes'));

const startApp=async()=>
{
    await mongoDB()
app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
}
app.get('/', (req, res) => {
    res.send('Hello World!');
});

startApp();
