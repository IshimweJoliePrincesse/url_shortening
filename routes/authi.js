const bcrypt=require('bcryptjs')
const config=require('config')
const jwt=require('jsonwebtoken');
const express=require('express');
const Joi=require('joi');
const {User}=require('../models/userModel')
const router=express.Router();
const _=require('lodash');
const mongoose=require('mongoose');
const authi=require

router.post('/',async (req,res)=>{
    const{error}=validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);

let user=await User.findOne({email:req.body.email});
if(!user) return res.status(400).send('Invalid email or password')

const validatePassword=await bcrypt.compare(req.body.password,user.password);
if(!validatePassword) return res.status(400).send('Invalid email or password');
const token=user.generateUserToken();
res.send(token)
});
function validate(req){
    const schema=Joi.object({
        email:Joi.string().min(3).max(1000).required().email(),
        password:Joi.string().min(3).max(1000).required()
    });
    
    return schema.validate(req)
    }
module.exports=router