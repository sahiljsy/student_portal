import mongoose from 'mongoose';
// import env from './envirnment'
mongoose.connect(`mongodb://localhost/student_portal`,{ useNewUrlParser: true, useUnifiedTopology: true  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


export default db;