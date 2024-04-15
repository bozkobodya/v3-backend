import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

interface User {
  id: string;
  role: string;
  email: string;
  name: string;
  image: string;
}

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
    },
    async (payload, done) => {
      try {
        const user = {
          id: payload.id,
          role: payload.role,
          email: payload.email,
          name: payload.name,
          image: payload.image,
        };
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default function isAdminMiddleware(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false }, (err: Error, user: User | false) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  })(req, res, next);
};