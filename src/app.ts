import express from 'express';
import 'dotenv/config';
import authMiddleware from './middlewares/authMiddleware';
import errorMiddleware from './middlewares/errorMiddleware';
import landingRoutes from './routes/landingRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import connectDB from "./config/db";

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(authMiddleware);

app.use('/', landingRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  try {
    await connectDB(process.env.MONGODB_URI!);
    console.log(`Server is running on port ${PORT}`);
  } catch (err: any) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
});