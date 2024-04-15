import mongoose, { Schema, Document } from 'mongoose';

export interface IUsersCredentials extends Document {
  userId: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const UsersCredentialsSchema: Schema = new Schema({
  userId: { type: String, required: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const UsersCredentials = mongoose.model<IUsersCredentials>('UsersCredentials', UsersCredentialsSchema, 'usersCredentials');

export default UsersCredentials;
