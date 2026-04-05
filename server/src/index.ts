import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { connectDB, seedProducts } from './db';
import routes from './routes';
import { updateOrderStatuses } from './controllers/orderController';

const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Connect to MongoDB first, then seed products, then start the HTTP server
connectDB()
    .then(() => seedProducts())
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
        
        // Schedule order status updates to run every hour
        // Using UTC timezone to avoid DST transition issues
        cron.schedule('0 * * * *', () => {
            console.log('⏰ Running scheduled order status update...');
            updateOrderStatuses();
        }, {
            timezone: "UTC"
        });
        
        // Run status update immediately on startup
        updateOrderStatuses();
    })
    .catch((err) => {
        console.error('Startup failed:', err);
        process.exit(1);
    });
