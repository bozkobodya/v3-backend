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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const usersCredentialsModel_1 = __importDefault(require("../models/usersCredentialsModel"));
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield userModel_1.default.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                const userCredentials = yield usersCredentialsModel_1.default.findOne({ userId: user.id });
                if (!userCredentials) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                const isMatch = yield bcryptjs_1.default.compare(password, userCredentials.passwordHash);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
                res.json({ token });
            }
            catch (err) {
                console.error(err.message);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
}
exports.default = AuthController;
