import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.js';
import db from './config/mongoose.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(fileUpload());
app.use(express.static('./public'));
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

const PORT = process.env.PORT
app.listen(PORT, function(err){
    if(err){
        console.log(`Error in runnig server: ${err}`);
    }
    console.log(`Server is runnig on port: ${PORT}`);

})
