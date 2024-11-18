"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// user.model.ts
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        unique: true,
        Select: false,
    },
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
