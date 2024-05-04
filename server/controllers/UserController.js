import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import User from '../models/UserModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs'
import { createToken } from '../utilities/usertoken.js';

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

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

const adduser = asyncHandler(async (req, res) => {

    if (!validator.isEmail(req.body.email)) {
        return res
            .status(500)
            .json({ status: "error", error: "Enter a valid email" });
    }

    // if (!validator.isStrongPassword(password)) {
    //     return res
    //     .status(500)
    //     .json({ status: "error", error: "Password is not strong enough" });
    // }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isSeller: req.body.isSeller
    });

    try {
        const newUser = await user.save();
        const uid = newUser.id;
        const token = await createToken(newUser.id);
        return res.status(200).json({ status: "success", data: { token, uid } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const addNewItem = asyncHandler(async (req, res) => {
    const userId = req.params.id;
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
    res.status(400).json({ message: "not a registered seller" })
})

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

router.delete('/users/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const addFavorites = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $push: { favorite: req.body.item }
        }, {
            new: true
        });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

const removeFavorite = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.favorites.includes(productId)) {
            return res.status(404).json({ error: 'Product not found in favorites' });
        }
        user.favorites.pull(productId);
        await user.save();

        res.json({ message: 'Product removed from favorites', user });
    } catch (error) {
        console.error('Error removing product from favorites:', error);
        res.status(500).json({ error: 'Internal server error' });
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

export { loginUser, getAllUsers, adduser, addFavorites, addNewItem, getUserById, removeFavorite };
