const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//@desc register user
//@route POST /api/user/register
//@access public

const registerUser = asyncHandler(async(req, res) => {
  const {username, email, password} = req.body;
  if(!username || !email || !password){
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  const isUserAvailable = await User.findOne({email});

  if(isUserAvailable){
    res.status(400)
    throw new Error('User Already Registered')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })

  if(user) {
    res.status(201).json({_id: user._id, email: user.email})
  } else { 
    res.status(400)
    throw new Error('User data is not valid');
  }
  res.json({message: 'Register the user'})
})

//@desc login user
//@route POST /api/user/login
//@access public

const loginUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body;
  if(!email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }

  const user = await User.findOne({email});

  if(user && await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user._id
      }
    }, process.env.ACCESS_SECRET, { expiresIn: '1h' });

    res.status(200).json({accessToken})
  }
  else {
    res.status(400)
    throw new Error('User not Registered or Password is incorrect');
    
  }

  res.json({message: 'login route'})
})


//@desc get current user
//@route GET /api/user/current
//@access private

const currentUser = asyncHandler(async(req, res) => {
  res.json({message: req.user})
})

module.exports = {registerUser, loginUser, currentUser}