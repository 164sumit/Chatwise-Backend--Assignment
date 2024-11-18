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
exports.createComment = exports.getSinglePost = exports.createPost = void 0;
const post_model_1 = require("../models/post.model");
const user_model_1 = require("../models/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const friend_request_model_1 = require("../models/friend-request.model");
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = new post_model_1.Post(Object.assign(Object.assign({}, req.body), { author: req.body.userId }));
        yield post.save();
        res.status(201).json({ post, success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
        return;
        next(error);
    }
});
exports.createPost = createPost;
const getSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
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
        const objectId = new mongoose_1.default.Types.ObjectId(userId);
        list2.push(objectId);
        console.log("friends", list2);
        const post = yield post_model_1.Post.findOne({ _id: postId,
            $or: [
                { author: { $in: list2 } }, // Posts by friends
                { 'comments.author': { $in: list2 } } // Posts with comments by friends
            ]
        }).populate('author', 'username')
            .populate({
            path: 'comments.author',
            select: 'username'
        });
        // Find the post and populate author fields
        // const post = await Post.findById(postId)
        //     .populate<{ author: PopulatedAuthor }>('author', 'username')
        //     .populate<{ comments: PopulatedComment[] }>({
        //         path: 'comments.author',
        //         select: 'username'
        //     });
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        // Convert mongoose document to plain object
        const postObject = post.toObject();
        // Check if user has access to this post
        const hasAccess = user.friends.some(friendId => friendId.toString() === postObject.author._id.toString());
        // if (!hasAccess) {
        //      res.status(403).json({ 
        //         message: 'You can only view posts from your friends' 
        //     });
        //     return
        // }
        // Add additional information
        const enrichedPost = Object.assign(Object.assign({}, postObject), { friendComments: postObject.comments.filter(comment => user.friends.some(friendId => { var _a; return friendId.toString() === (((_a = comment.author._id) === null || _a === void 0 ? void 0 : _a.toString()) || ''); })) });
        res.json(enrichedPost);
    }
    catch (error) {
        console.error('Error in getSinglePost:', error);
        res.status(500).json({
            message: 'Error fetching post',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getSinglePost = getSinglePost;
// export const getSinglePost = async (req: Request, res: Response) => {
//   try {
//       const { postId } = req.params;
//       const userId = req.body.userId;
//       // Get user's friends
//       const user = await User.findById(userId);
//       if (!user) {
//            res.status(404).json({ message: 'User not found' });
//            return
//       }
//       // Find the post and populate author fields
//       const post = await Post.findById(postId)
//           .populate<{ author: PopulatedAuthor }>('author', 'username')
//           .populate<{ comments: PopulatedComment[] }>({
//               path: 'comments.author',
//               select: 'username'
//           });
//       if (!post) {
//            res.status(404).json({ message: 'Post not found' });
//            return
//       }
//       // Convert mongoose document to plain object
//       const postObject = post.toObject() as PopulatedPost;
//       // Check if user has access to this post
//       const hasAccess = user.friends.some(friendId => 
//           friendId.toString() === postObject.author._id.toString()
//       );
//       if (!hasAccess) {
//            res.status(403).json({ 
//               message: 'You can only view posts from your friends' 
//           });
//           return
//       }
//       // Add additional information
//       const enrichedPost = {
//           ...postObject,
//           isAuthorFriend: user.friends.some(
//               friendId => friendId.toString() === postObject.author._id.toString()
//           ),
//           friendComments: postObject.comments.filter(comment =>
//               user.friends.some(
//                   friendId => friendId.toString() === (comment.author._id?.toString() || '')
//               )
//           ),
//       };
//       res.json(enrichedPost);
//   } catch (error) {
//       console.error('Error in getSinglePost:', error);
//       res.status(500).json({ 
//           message: 'Error fetching post', 
//           error: error instanceof Error ? error.message : 'Unknown error' 
//       });
//   }
// };
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.Post.findById(req.params.postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        const user = yield user_model_1.User.findById(req.params.userId);
        const comment = { text: req.body.text, author: req.body.userId };
        post.comments.push(comment);
        yield post.save();
        // comment[User]=user;
        res.status(201).json(comment);
    }
    catch (error) {
        next(error);
    }
});
exports.createComment = createComment;
