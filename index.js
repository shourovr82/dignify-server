const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();


// middleware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ikwqeh8.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
  try {
    const loanDetailsCollections = client.db('dignifyDB').collection('loanUserDetails')


    app.post('/applyloan', async (req, res) => {
      const loan = req.body;
      const result = await loanDetailsCollections.insertOne(loan)
      res.send(result);
    })


  }
  finally {

  }
}

run();




app.get('/', async (req, res) => {
  res.send('dignify server is running')
})

app.listen(port, () => {
  console.log('dignify server is running');
})