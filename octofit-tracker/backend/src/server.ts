import express from 'express';
import { connectDatabase } from './config/database.js';
import Activity from './models/activity.js';
import Leaderboard from './models/leaderboard.js';
import Team from './models/team.js';
import User from './models/user.js';
import Workout from './models/workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api' });
});

app.get('/api/users', async (_request, response) => {
  response.json(await User.find().select('-passwordHash').sort({ displayName: 1 }).lean());
});

app.get('/api/teams', async (_request, response) => {
  response.json(await Team.find().populate('members', 'displayName email').sort({ name: 1 }).lean());
});

app.get('/api/activities', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'displayName').sort({ date: -1 }).lean());
});

app.get('/api/leaderboard', async (_request, response) => {
  response.json(
    await Leaderboard.find()
      .populate('user', 'displayName')
      .sort({ points: -1, rank: 1 })
      .lean(),
  );
});

app.get('/api/workouts', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }).lean());
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
});

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening at ${baseUrl}`);
    });
  } catch (error) {
    console.error('Unable to start OctoFit API:', error);
    process.exitCode = 1;
  }
}

void startServer();
