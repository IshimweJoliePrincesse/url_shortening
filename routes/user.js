const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const express=require('express');
const Joi=require('joi');
const config = require('config');
const {User,validate}=require('../models/userModel')
const router=express.Router()
const _=require('lodash')
const mongoose=require('mongoose');
const { route } = require('./authi');
const auth = require('../middleware/auth');
router.get('/me',auth,async (req,res)=>{
const user=await User.findById(req.user._id).select('-password');
res.send(user)
})

router.post('/',async (req,res)=>{
    const{error}=validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);

let user=await User.findOne({email:req.body.email});

if(user) return res.status(400).send('user already registered.')

      user=new User(_.pick(req.body,['name','email','password']))
    // name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.password
    const salt=await bcrypt.genSalt(10)
    user.password= await bcrypt.hash(user.password,salt);
    await user.save()
    //when you want to send the properties without the password
   

   // const token=jwt.sign({_id:user._id},'jwprivate');
   const token=user.generateUserToken();
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']))
    
});
module.exports=router