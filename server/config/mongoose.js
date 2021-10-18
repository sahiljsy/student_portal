import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const CONNECTION_STRING = process.env.CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING,{ useNewUrlParser: true, useUnifiedTopology: true  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


export default db;