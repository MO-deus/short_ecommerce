import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import User from '../models/UserModel.js';

// GET all users
const getAllUsers = asyncHandler(async (req, res) => {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    // res.status(200).json({ message: "Endpoint working" })
});

// GET one user by id
// endpoint : /users/:id
router.get('/users/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Create a new user
const adduser =  asyncHandler(async (req, res) => {
    // res.json({"message" : "Post"})
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isSeller: req.body.isSeller
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// add new item to
const addNewItem = asyncHandler(async (req, res) => {
  if(req.body.isSeller == true){
    try {
        const updatedUser = await User.findByIdAndUpdate(req.body.id, { 
            $push: { items: req.body.newItem } }, { new: true 
            });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  }
  res.status(400).json({message:"not a registered seller"})
})

// Update a user by id
router.patch('/users/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user by id
router.delete('/users/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//add an item in the list of favorites
const addFavorites = asyncHandler(async (req, res)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.body.id, { 
            $push: { favorite: req.body.newItem } }, { new: true 
            });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Middleware function to get user by id
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

export { getAllUsers, adduser, addFavorites, addNewItem};
