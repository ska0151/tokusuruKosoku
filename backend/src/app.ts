import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { searchRoutes } from './routes/routes';
import { estimateToll } from './routes/tolls';
import { nearby } from './routes/ics';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API Routes
app.post('/api/routes/search', searchRoutes);
app.get('/api/tolls/estimate', estimateToll);
app.get('/api/ics/nearby', nearby);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

// Error Handler
app.use((err: any, req: Request, res: Response) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: process.env.NODE_ENV === 'development' ? err.message : 'Unknown error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
