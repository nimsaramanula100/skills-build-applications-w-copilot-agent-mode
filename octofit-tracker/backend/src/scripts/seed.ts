import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';
import { connectDatabase } from '../config/database.js';

const userIds = [
  new mongoose.Types.ObjectId('650000000000000000000001'),
  new mongoose.Types.ObjectId('650000000000000000000002'),
  new mongoose.Types.ObjectId('650000000000000000000003'),
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({ _id: { $in: userIds } }),
      Team.deleteMany({ name: { $in: ['Trail Blazers', 'Morning Movers'] } }),
      Activity.deleteMany({ user: { $in: userIds } }),
      Leaderboard.deleteMany({ user: { $in: userIds } }),
      Workout.deleteMany({ title: { $in: ['Steady Starter Run', 'Ride and Recover', 'Bodyweight Circuit'] } }),
    ]);

    const user = await User.insertMany([
      { _id: userIds[0], displayName: 'Alex Morgan', email: 'alex@example.com' },
      { _id: userIds[1], displayName: 'Sam Rivera', email: 'sam@example.com' },
      { _id: userIds[2], displayName: 'Jordan Lee', email: 'jordan@example.com' },
    ]);
    const team = await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'A team for outdoor miles.',
        members: [user[0]._id, user[1]._id],
      },
      {
        name: 'Morning Movers',
        description: 'Building healthy early routines.',
        members: [user[1]._id, user[2]._id],
      },
    ]);
    const activity = await Activity.insertMany([
      { user: user[0]._id, type: 'running', durationMinutes: 32, distanceKm: 5.2, steps: 6400, date: new Date('2025-06-12') },
      { user: user[1]._id, type: 'cycling', durationMinutes: 45, distanceKm: 14, steps: 0, date: new Date('2025-06-11') },
      { user: user[2]._id, type: 'walking', durationMinutes: 28, distanceKm: 2.4, steps: 3500, date: new Date('2025-06-10') },
    ]);
    const leaderboard = await Leaderboard.insertMany([
      { user: user[0]._id, points: 320, rank: 1 },
      { user: user[1]._id, points: 275, rank: 2 },
      { user: user[2]._id, points: 190, rank: 3 },
    ]);
    const workout = await Workout.insertMany([
      {
        title: 'Steady Starter Run',
        description: 'An easy-paced run with a short warm-up and cool-down.',
        level: 'beginner',
        durationMinutes: 25,
        activityType: 'running',
      },
      {
        title: 'Ride and Recover',
        description: 'A comfortable cycling session focused on steady movement.',
        level: 'beginner',
        durationMinutes: 35,
        activityType: 'cycling',
      },
      {
        title: 'Bodyweight Circuit',
        description: 'A full-body strength circuit using bodyweight exercises.',
        level: 'intermediate',
        durationMinutes: 30,
        activityType: 'strength',
      },
    ]);

    console.log(
      `Seeded ${user.length} users, ${team.length} teams, ${activity.length} activities, ${leaderboard.length} leaderboard entries, and ${workout.length} workouts`,
    );
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
