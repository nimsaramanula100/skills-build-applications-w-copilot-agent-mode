import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    activityType: { type: String, enum: ['walking', 'running', 'cycling', 'strength'], required: true },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
