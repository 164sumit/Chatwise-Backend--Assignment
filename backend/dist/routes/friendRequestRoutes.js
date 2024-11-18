"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const friend_request_controller_1 = require("../controller/friend-request.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Friend Request Routes');
});
// Route to send a friend request
router.post('/send', auth_middleware_1.Authorization, friend_request_controller_1.sendFriendRequest);
// Route to accept a friend request
router.put('/accept/:requestId', auth_middleware_1.Authorization, friend_request_controller_1.acceptFriendRequest);
// Route to reject a friend request
router.put('/reject/:requestId', auth_middleware_1.Authorization, friend_request_controller_1.rejectFriendRequest);
// Route to cancel a friend request
router.delete('/cancel/:requestId', auth_middleware_1.Authorization, friend_request_controller_1.cancelFriendRequest);
// Route to get all friend requests for a user
router.get('/friend/:userId', auth_middleware_1.Authorization, friend_request_controller_1.getFriendRequests);
// Route to search friends by username or email
router.get('/search', auth_middleware_1.Authorization, friend_request_controller_1.searchFriends);
exports.default = router;
