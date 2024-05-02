import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import User from '../models/UserModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs'
import { createToken } from '../utilities/usertoken.js';
import jwt from 'jsonwebtoken';
import Product from '../models/ProductModel.js';
// user login
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).json({ status: "error", error: "All fields are mandatory" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ status: "error", error: "No user exists with the provided email" });
        }

        const pass_match = await bcrypt.compare(password, user?.password);
        const uid = user.id;
        if (!pass_match) {
            return res.status(500).json({ status: "error", error: "Wrong password" });
        }

        const token = await createToken(user.id);
        return res.status(200).json({ status: "success", data: { token, uid } });

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// GET all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one user by id
// endpoint : /users/:id
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// Create a new user
const adduser = asyncHandler(async (req, res) => {
    // res.json({"message" : "Post"})
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isSeller: req.body.isSeller
    });

    try {
        const newUser = await user.save();
        const uid =  newUser.id;
        const token = await createToken(newUser.id);
        return res.status(200).json({ status: "success", data: { token, uid} });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// add new item to
const addNewItem = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    // if (req.body.isSeller == true) {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $push: { items: req.body.itemid }
            }, {
                new: true
            });
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    // }
    res.status(400).json({ message: "not a registered seller" })
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
const addFavorites = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $push: { favorite: req.body.newItem }
        }, {
            new: true
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

export { loginUser, getAllUsers, adduser, addFavorites, addNewItem, getUserById };
