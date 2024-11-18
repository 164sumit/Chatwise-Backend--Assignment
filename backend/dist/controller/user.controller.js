"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptFriendRequest = exports.sendFriendRequest = exports.registerUser = exports.Login = exports.UserInfo = void 0;
const friend_request_model_1 = require("../models/friend-request.model");
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token;
        console.log(token);
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const user = yield user_model_1.User.findById(decodedToken.userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user info' });
        next(error);
    }
});
exports.UserInfo = UserInfo;
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findOne({ email: req.body.email }, { password: 1, email: 1, username: 1 });
        console.log(user);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isValidPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure flag should be true in production
            sameSite: 'strict',
        });
        user.password = "sd";
        res.status(200).json({ message: 'Logged in successfully', token: token, user });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in  ' });
        next(error);
    }
});
exports.Login = Login;
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedpassword = yield bcrypt_1.default.hash(req.body.password, 10);
        const user = new user_model_1.User(Object.assign(Object.assign({}, req.body), { password: hashedpassword }));
        yield user.save();
        res.status(201).json(user);
        return;
    }
    catch (error) {
        console.log(error.errmsg);
        res.status(500).json({ message: error.errmsg });
        return;
    }
});
exports.registerUser = registerUser;
const sendFriendRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendRequest = new friend_request_model_1.FriendRequest(req.body);
        yield friendRequest.save();
        res.status(201).json(friendRequest);
    }
    catch (error) {
        next(error);
    }
});
exports.sendFriendRequest = sendFriendRequest;
const acceptFriendRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendRequest = yield friend_request_model_1.FriendRequest.findById(req.params.id);
        if (!friendRequest) {
            res.status(404).json({ message: 'Friend request not found' });
            return;
        }
        friendRequest.status = 'accepted';
        yield friendRequest.save();
        res.status(200).json({ message: 'Friend request accepted', friendRequest });
    }
    catch (error) {
        next(error);
    }
});
exports.acceptFriendRequest = acceptFriendRequest;
