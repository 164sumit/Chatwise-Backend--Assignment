"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
// import { userController } from './controller/user.controller';
// import { postController } from './controller/post.controller';
// import { feedController } from './controller/feed.controller';
// import { authenticate } from './auth.middleware';
const user_Routes_1 = __importDefault(require("./routes/user.Routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const feed_Routes_1 = __importDefault(require("./routes/feed.Routes"));
const friendRequestRoutes_1 = __importDefault(require("./routes/friendRequestRoutes"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./utils/database");
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
dotenv_1.default.config();
(0, database_1.connectDB)(process.env.MONGODB_URI || '');
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(express_1.default.json());
app.use('/api/v1/user', user_Routes_1.default);
app.use('/api/v1/post', post_routes_1.default);
app.use('/api/v1/feed', feed_Routes_1.default);
app.use('/api/v1/friendrequests', friendRequestRoutes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.listen(3001, () => {
    console.log('Server started on port 3001');
});
