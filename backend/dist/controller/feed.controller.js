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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeed = exports.getRelevantPosts = void 0;
const user_model_1 = require("../models/user.model");
const post_model_1 = require("../models/post.model");
const friend_request_model_1 = require("../models/friend-request.model");
const getRelevantPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        // Get user's friends
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const friends = yield friend_request_model_1.FriendRequest.find({ status: "accepted",
            $or: [
                { sender: userId },
                { receiver: userId },
            ]
        });
        const list2 = [];
        const friendsList = friends.filter((friend) => {
            if (friend.sender.toString() == userId) {
                list2.push(friend.receiver);
                return friend.receiver;
            }
            else {
                list2.push(friend.sender);
                return friend.sender;
            }
        });
        console.log("friends", list2);
        // Find posts that either:
        // 1. Were created by user's friends
        // 2. Have comments by user's friends
        const relevantPosts = yield post_model_1.Post.find({
            $or: [
                { author: { $in: list2 } }, // Posts by friends
                { 'comments.author': { $in: list2 } } // Posts with comments by friends
            ]
        })
            .populate('author', 'username')
            .populate('comments.author', 'username')
            .sort({ createdAt: -1 });
        res.json(relevantPosts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
});
exports.getRelevantPosts = getRelevantPosts;
const getFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("getfeed called");
        const userId = req.body.userId;
        console.log(userId);
        const user = yield user_model_1.User.findById(userId).populate('friends');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const friendPosts = yield post_model_1.Post.find();
        // const commentedPosts = await Post.find({
        //   'comments.author': { $in: user.friends },
        // });
        const feed = [...friendPosts,];
        res.status(200).json(feed);
    }
    catch (error) {
        next(error);
    }
});
exports.getFeed = getFeed;
