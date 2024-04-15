import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';

class UserController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find();

      const usersData = users.map((user) => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      }));

      res.json({ users: usersData });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

export default UserController;