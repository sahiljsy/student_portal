import express from 'express';
import mongoose  from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.js';
import db from './config/mongoose.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
const app = express();


app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(session({
    secret:"sahil",
    resave:true,
    saveUninitialized:true
}));
app.use(cookieParser('sahil'))


app.use('/', routes);

// const CONNECTION_URL = 'mongodb://localhost:27017/student_portal

const PORT = process.env.PORT || 5000;
// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true , useUnifiedTopology:true})
// .then(()=> app.listen(PORT, ()=> console.log(`server runnig on port:${PORT}`)))
// .catch((error) => console.log(error));
app.listen(PORT, function(err){
    if(err){
        console.log(`Error in runnig server: ${err}`);
    }
    console.log(`Server is runnig on port: ${PORT}`);

})
