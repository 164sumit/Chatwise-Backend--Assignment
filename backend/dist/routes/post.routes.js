"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// postRoutes.ts
const express_1 = require("express");
const post_controller_1 = require("../controller/post.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Route to create a new post
router.post('/', auth_middleware_1.Authorization, post_controller_1.createPost);
router.get('/:postId', auth_middleware_1.Authorization, post_controller_1.getSinglePost);
// Route to create a comment on a post
router.post('/:postId/comments', auth_middleware_1.Authorization, post_controller_1.createComment);
exports.default = router;
