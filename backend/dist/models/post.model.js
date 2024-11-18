"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
// post.schema.ts
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    text: String,
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    comments: [
        {
            text: String,
            author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
        },
    ],
});
exports.Post = (0, mongoose_1.model)('Post', PostSchema);
