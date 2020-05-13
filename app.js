const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

// Load Express
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));    // Set location of views folder
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('index', { 
        title:'Home Page'
    });
})

app.get('/projects', (req,res)=>{
    res.render('projects', { 
        title:'Projects'
    });
})


app.get('/test', (req,res)=>{
    res.render('test', { 
        title:'Test Page'
    });
})

app.get('*', (req,res)=>{
    res.status(404).send('Not Found');
})

app.listen(port, ()=>console.log(`Nodejs is running on ${port}`))