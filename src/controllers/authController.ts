import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import UsersCredentials from '../models/usersCredentialsModel';

class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userCredentials = await UsersCredentials.findOne({ userId: user._id });
      if (!userCredentials) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, userCredentials.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        {
          id: user._id.toString(),
          role: user.role,
          email: user.email,
          name: user.name,
          image: user.image,
        },
        process.env.JWT_SECRET as string
      );

      res.json({ token });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default AuthController;
