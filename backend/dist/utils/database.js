"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = (uri) => {
    mongoose_1.default.connect(uri, {
        dbName: "social-media"
    }).then((connection) => {
        console.log(`MongoDB Connected: ${connection.connection.name}`);
    }).catch((error) => {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    });
};
exports.connectDB = connectDB;
