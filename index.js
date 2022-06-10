const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;



// Middleware

app.use(express.json());
app.use(cors());

// MongoDB


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2w4vn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        
        await client.connect();

        const projectCollection = client.db('portfolio').collection('projects');


        app.get('/projects' , async(req, res) => {
          const projects = await projectCollection.find().toArray();
          res.send(projects)
        })
    }
    finally{

    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Running the portfolio server')
});

app.listen(port, () => {
    console.log(`listening to Portfolio server on port ${port}`)
})