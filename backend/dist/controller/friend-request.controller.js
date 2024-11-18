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
exports.getFriendRequests = exports.cancelFriendRequest = exports.rejectFriendRequest = exports.acceptFriendRequest = exports.sendFriendRequest = exports.searchFriends = void 0;
const friend_request_model_1 = require("../models/friend-request.model");
const user_model_1 = require("../models/user.model");
// Search friends by username or email
const searchFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("first")
        const { query } = req.query;
        // console.log("query",query);
        // res.status(200).json({
        //     message: 'Friends found successfully',
        //     // users
        // })
        if (!query) {
            res.status(400).json({ message: 'Query parameter is required' });
            return;
        }
        const users = yield user_model_1.User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).select('username email');
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({ message: 'Error searching friends', error });
    }
});
exports.searchFriends = searchFriends;
// Send a friend request
const sendFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("2md");
        const { senderId, receiverId, userId } = req.body;
        const newFriendRequest = new friend_request_model_1.FriendRequest({ sender: userId, receiver: receiverId, status: 'pending' });
        yield newFriendRequest.save();
        res.status(201).json({ message: 'Friend request sent successfully', friendRequest: newFriendRequest });
    }
    catch (error) {
        res.status(500).json({ message: 'Error sending friend request', error });
    }
});
exports.sendFriendRequest = sendFriendRequest;
// Accept a friend request
const acceptFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("third");
        const { requestId } = req.params;
        const friendRequest = yield friend_request_model_1.FriendRequest.findOne({ _id: requestId,
            $or: [
                { sender: req.body.userId },
                { receiver: req.body.userId }
            ]
        });
        if (!friendRequest) {
            res.status(404).json({ message: 'Friend request not found' });
            return;
        }
        friendRequest.status = 'accepted';
        yield friendRequest.save();
        yield user_model_1.User.findByIdAndUpdate(friendRequest.sender, { $push: { friends: friendRequest.receiver } });
        yield user_model_1.User.findByIdAndUpdate(friendRequest.receiver, { $push: { friends: friendRequest.sender } });
        res.status(200).json({ message: 'Friend request accepted', friendRequest });
    }
    catch (error) {
        res.status(500).json({ message: 'Error accepting friend request', error });
    }
});
exports.acceptFriendRequest = acceptFriendRequest;
// Reject a friend request
const rejectFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("forth");
        const { requestId } = req.params;
        const friendRequest = yield friend_request_model_1.FriendRequest.findOne({ _id: requestId,
            $or: [
                { sender: req.body.userId },
                { receiver: req.body.userId }
            ]
        });
        if (!friendRequest) {
            res.status(404).json({ message: 'Friend request not found' });
            return;
        }
        friendRequest.status = 'rejected';
        yield friendRequest.save();
        res.status(200).json({ message: 'Friend request rejected', friendRequest });
    }
    catch (error) {
        res.status(500).json({ message: 'Error rejecting friend request', error });
    }
});
exports.rejectFriendRequest = rejectFriendRequest;
// Cancel a friend request
const cancelFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("fifth");
        const { requestId } = req.params;
        const friendRequest = yield friend_request_model_1.FriendRequest.findById(requestId);
        if (!friendRequest) {
            res.status(404).json({ message: 'Friend request not found' });
            return;
        }
        yield friend_request_model_1.FriendRequest.findOneAndDelete({ _id: requestId, sender: req.body.userId });
        res.status(200).json({ message: 'Friend request cancelled', friendRequest });
    }
    catch (error) {
        res.status(500).json({ message: 'Error cancelling friend request', error });
    }
});
exports.cancelFriendRequest = cancelFriendRequest;
// Get all friend requests for a user
const getFriendRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("sixth");
        const { userId } = req.body;
        const friendRequests = yield friend_request_model_1.FriendRequest.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        }).populate('sender receiver', 'username email');
        res.status(200).json({ friendRequests });
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting friend requests', error });
    }
});
exports.getFriendRequests = getFriendRequests;
