const express = require('express');
const bodyParser = require('body-parser');

require('./db/conn')
// const Student = require('./models/students')
const studentRouter = require('./routers/student')

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
// app.use(expressValidator());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(studentRouter)

app.get('/',(req,res)=>{
    res.send('hello world!')
})

app.listen(port, ()=>{
    console.log('server is running')
})