const config=require('config')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose');
const Joi=require('joi')
const express=require('express');
const app=express();
// mongoose.connect('mongodb://localhost/users')
// .then(()=>console.log("connected those succesfully"))
// .catch(err=>console.error("couldn't connect",err))
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },                          
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean}

   
});
schema.methods.generateUserToken=function(){
    const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},'jwprivate');
    return token;
}

const User=mongoose.model('user',schema);
function validateUser(user){
const schema=Joi.object({
    name:Joi.string().min(5).max(1000).required(),
    email:Joi.string().min(3).max(1000).required().email(),
    password:Joi.string().min(3).max(1000).required()
})

return schema.validate(user)
}

exports.User=User
exports.validate=validateUser
app.post('/api/users',)