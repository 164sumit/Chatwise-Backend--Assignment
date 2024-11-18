"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequest = void 0;
// friend-request.schema.ts
const mongoose_1 = require("mongoose");
const FriendRequestSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    status: String,
});
exports.FriendRequest = (0, mongoose_1.model)('FriendRequest', FriendRequestSchema);
