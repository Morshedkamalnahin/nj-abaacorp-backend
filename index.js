const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const blogsCollection = database.collection("blog");
        const instagramCollection = database.collection('instagram');
        const projectCollection = database.collection('project')
        const sliderCollection = database.collection('slider')
        console.log('connected db')

        //get api
        app.get('/add_blog', async (req, res) => {

            const blogs = blogsCollection.find({});
            const blog = await blogs.toArray();
            res.send(blog)

        })
        app.get('/instagram', async (req, res) => {

            const instagrams = instagramCollection.find({});
            const instagram = await instagrams.toArray();
            res.send(instagram)

        })
        app.get('/project', async (req, res) => {

            const projects = projectCollection.find({});
            const project = await projects.toArray();
            res.send(project)

        })
        app.get('/slider', async (req, res) => {

            const sliders = sliderCollection.find({});
            const slider = await sliders.toArray();
            res.send(slider)

        })
        //// find single data
        app.get('/add_blog/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const blog = await blogsCollection.findOne(query);
            res.json(blog);
        })

        //post api
        app.post('/add_blog', async (req, res) => {



            const { title, dec, date } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newBlog = { title, dec, date, img: imgBuffer }

            const result = await blogsCollection.insertOne(newBlog);
            res.json({ success: true })


            console.log('hitt post api', result.insertedId)
            // res.send(result)

        })
        app.post('/instagram', async (req, res) => {



            const { title, link } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newInstagramCard = { title, link, img: imgBuffer }

            const result = await instagramCollection.insertOne(newInstagramCard);
            res.json({ success: true })


            console.log('hitt post api', result.insertedId)
            // res.send(result)

        })
        app.post('/project', async (req, res) => {


            const { title, link } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newProject = { title, link, img: imgBuffer }

            const result = await projectCollection.insertOne(newProject);
            res.json({ success: true })


            console.log('hitt post api', result.insertedId)
            // res.send(result)

        })
        app.post('/slider', async (req, res) => {


            const { title, dec } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newSlider = { title, dec, img: imgBuffer }

            const result = await sliderCollection.insertOne(newSlider);
            res.json({ success: true })


            console.log('hitt post api', result.insertedId)
            // res.send(result)

        })


        //delete api
        app.delete('/blog_delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await blogsCollection.deleteOne(query);
            console.log(result)
        })
        app.delete('/instagram_delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await instagramCollection.deleteOne(query);
            console.log(result)
        })
        app.delete('/project_delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await projectCollection.deleteOne(query);
            console.log(result)
        })
        app.delete('/slider_delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await sliderCollection.deleteOne(query);
            console.log(result)
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