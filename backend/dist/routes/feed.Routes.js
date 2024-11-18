"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// postRoutes.ts
const express_1 = require("express");
const feed_controller_1 = require("../controller/feed.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.Authorization, feed_controller_1.getRelevantPosts);
exports.default = router;
