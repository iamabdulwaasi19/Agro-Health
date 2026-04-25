require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// --- Import Routes ---
const scanRoutes = require('./routes/scanRoutes');
const authRoutes = require('./routes/authRoutes');

// --- Initialize the app ---
const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// --- Middlewares ---
app.use(cors({
  origin: ['http://localhost:5173', 'https://agro-health-chi.vercel.app', 'http://localhost:19000', 'http://localhost:8081'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
app.use('/api/scan', scanRoutes);
app.use('/api/auth', authRoutes);

// --- Static Files ---
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --- Routes ---
app.use('/api/scan', scanRoutes);
app.use('/api/auth', authRoutes);

// --- Scan Results ---
// app.use(cors({
//   origin: ['http://localhost:5173', 'https://agro-health-chi.vercel.app'], 
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// --- Basic Health Check Route ---
app.get('/', (req, res,) => {
  res.json({ message: 'AgroHealth Backend is running 🚀' });
});

// --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    
    // --- Start Server only after DB connection ---
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });