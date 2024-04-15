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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const landingRoutes_1 = __importDefault(require("./routes/landingRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express_1.default.json());
app.use(authMiddleware_1.default);
app.use('/', landingRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use(errorMiddleware_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, db_1.default)(process.env.MONGODB_URI);
            console.log(`Server is running on port ${PORT}`);
        }
        catch (err) {
            console.error('Error connecting to MongoDB:', err.message);
            process.exit(1);
        }
    }));
});
