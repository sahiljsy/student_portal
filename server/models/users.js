import  Mongoose  from "mongoose";

const userSchema = new Mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    contact_no:{
        type:Number,
        required:true
    },

},{
    timestamps: true
});


const User = Mongoose.model('User', userSchema);
export default User;
    


