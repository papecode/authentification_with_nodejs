const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const creatError = require('../utils/appError');
// REGISTER USER
exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return next(new creatError('User already exists', 400));
        }
        const HashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            ...req.body,
            password: HashedPassword,
        });

        // Assisgn JWT (Json Web Token)
        const token = jwt.sign({ id: newUser._id }, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
        });
    } catch (error) {
        next(error);
    }
}
// LOGIN USER
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return next(new creatError('User not found', 404));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(new creatError('Invalid email or password', 401));
        }


        const token = jwt.sign({ id: user._id }, 'secretkey123', {
            expiresIn: '90d',
        });


        res.status(200).json({
            status: 'success',
            token,
            message: 'User logged in',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        }); 
    } catch (error) {
        next(error);
    }
}