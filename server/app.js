require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/miniWP', {useNewUrlParser: true});

const cors = require('cors')

const user_route = require('./routes/user-route')
const article_route = require('./routes/article-route')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/users', user_route)
app.use('/articles',article_route)


app.listen(port, ()=> {
    console.log(`listening on port, ${port}`);
})