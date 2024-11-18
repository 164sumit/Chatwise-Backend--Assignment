"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// user.schema.ts
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: String,
    email: String,
    password: String,
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
