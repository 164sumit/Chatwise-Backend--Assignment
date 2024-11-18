"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const router = (0, express_1.Router)();
router.post('/me', user_controller_1.UserInfo);
// Register a new user
router.post('/register', user_controller_1.registerUser);
// User login
router.post('/login', user_controller_1.Login);
// Send friend request
router.post('/friend-request', user_controller_1.sendFriendRequest);
// Accept friend request
router.put('/friend-request/:id/accept', user_controller_1.acceptFriendRequest);
exports.default = router;
