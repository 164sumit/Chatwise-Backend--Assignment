"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // next();
    const token = req.header('Authorization');
    console.log(token);
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    else {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        // const user = await User.findById(decodedToken.userId);
        if (decodedToken.userId) {
            req.body.userId = decodedToken.userId;
            next();
        }
        else {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
    }
});
exports.Authorization = Authorization;
