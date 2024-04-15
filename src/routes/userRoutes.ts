import express from 'express';
import UserController from '../controllers/userController';
import isAdminMiddleware from "../middlewares/isAdminMiddleware";

const router = express.Router();

router.get('/', isAdminMiddleware, UserController.getAllUsers);

export default router;
