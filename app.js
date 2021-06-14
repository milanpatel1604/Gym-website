const express=require('express');
const app=express();
const path = require('path');
const mongoose=require('mongoose');
// const { stringify } = require('querystring');
mongoose.connect('mongodb://localhost/dynamogymcontactform', {useNewUrlParser: true});

const port=80;

// Express specific stuff for serving static pages
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// Pug specific stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const contactSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    textarea: String
  });
const Contact = mongoose.model('Contact', contactSchema);


app.get('/', (req, res)=>{
    res.status(200).render('index.pug');
})
app.get('/joinnow', (req, res)=>{
    res.status(200).render('joinnow.pug');
})
app.get('/instruments', (req, res)=>{
    res.status(200).render('instruments.pug');
})
app.get('/gallery', (req, res)=>{
    res.status(200).render('gallery.pug');
})
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("Done");
    }).catch(()=>{
        res.status(400).send("Reload and send again");
    });
})


app.listen(port,() => {
    console.log(`this website is running at port no: ${port}`);
})