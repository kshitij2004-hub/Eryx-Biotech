import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import Custom Route Manifests
import adminRoutes from './routes/adminRoutes.js';
import productRoutes from './routes/productRoutes.js';
import officeRoutes from './routes/officeRoutes.js';
import safetyRoutes from './routes/safetyRoutes.js';

// Load environment variables (.env files)
dotenv.config();

// Fire up the database connection
connectDB();

const app = express();

// Global Middlewares
app.use(cors()); // Lets your React frontend talk to this API
app.use(express.json()); // Parses incoming JSON payloads

// Bind Active Endpoint Pathways
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/offices', officeRoutes);
app.use('/api/safety', safetyRoutes);

// Base Test Route
app.get('/', (req, res) => {
  res.send('Eryx Biotech Custom API Infrastructure running securely.');
});

// Configure Port & Wake Up Server Loop
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Full-Stack Server running on port ${PORT}`);
});
