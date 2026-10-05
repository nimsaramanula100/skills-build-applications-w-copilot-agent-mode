import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['walking', 'running', 'cycling', 'strength'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0, default: 0 },
    steps: { type: Number, min: 0, default: 0 },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

export default model('Activity', activitySchema);
