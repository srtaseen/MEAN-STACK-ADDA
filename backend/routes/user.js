const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

const User = require('../model/User');

router.post('/register', async (req, res) =>{

    const savedEmail = await User.findOne({
        email: req.body.email
     });
        if(savedEmail) return res.status(400).json("Email already exist");
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password,salt);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashpassword 
        });      
    try{
        const registeredUser = await user.save();
        res.send(registeredUser);
    }
    catch(error){
        res.status(400).send({message: error});
    }
});

router.post('/login', async (req, res) =>{
    //checking email valid
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email is wrong");

    //comparing password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Password is not matching");

    //create and asign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({token: token});
})

module.exports = router;