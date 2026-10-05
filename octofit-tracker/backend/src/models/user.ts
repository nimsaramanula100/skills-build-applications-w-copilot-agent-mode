import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    displayName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, select: false },
  },
  { timestamps: true },
);

export default model('User', userSchema);
