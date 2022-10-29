const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const app = express();
const port = 5000;



app.use(cors());
app.use(express.json())
app.use(fileUpload())

// const uri = "mongodb+srv://doctoral:doctoral123@cluster0.fbebj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const uri = "mongodb+srv://nj_abaacorp2022:248Ev3rBYUemym4L@cluster0.fbebj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db("njabaacorp");
        const Collection = database.collection("blog");
        console.log('connected db')
        app.get('/add_blog', async (req, res) => {

            const blogs = Collection.find({});
            const blog = await blogs.toArray();
            res.send(blog)

        })


        app.post('/add_blog', async (req, res) => {
            console.log(req.body)
            console.log(req.files)


            const { title, dec, date } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newBlog = { title, dec, date, img: imgBuffer }

            const result = await Collection.insertOne(newBlog);
            res.json({ success: true })


            console.log('hitt post api', result.insertedId)
            // res.send(result)

        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running server')
});

app.listen(port, () => {
    console.log('runnning server on port', port);
})