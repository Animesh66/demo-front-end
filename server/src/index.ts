import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { connectDB, seedProducts } from './db';
import routes from './routes';
import { updateOrderStatuses } from './controllers/orderController';

const app  = express();
let PORT = 3000;
const MAX_PORT_RETRIES = 5;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Helper function to start server with port fallback
const startServer = (port: number, retries: number = 0): void => {
    const server = app.listen(port)
        .on('listening', () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
            
            // Warn if running on non-default port
            if (port !== PORT) {
                console.log(`⚠️  Running on port ${port} instead of ${PORT}`);
                console.log(`💡 Update your frontend .env file with: VITE_API_URL=http://127.0.0.1:${port}`);
            }
            
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
        .on('error', (err: NodeJS.ErrnoException) => {
            if (err.code === 'EADDRINUSE') {
                if (retries < MAX_PORT_RETRIES) {
                    const nextPort = port + 1;
                    console.log(`⚠️  Port ${port} is in use, trying port ${nextPort}...`);
                    startServer(nextPort, retries + 1);
                } else {
                    console.error(`❌ Unable to find an available port after trying ports ${PORT}-${port}`);
                    console.error('💡 Please free up a port or stop the conflicting process.');
                    process.exit(1);
                }
            } else {
                console.error('❌ Server error:', err);
                process.exit(1);
            }
        });
};

// Connect to MongoDB first, then seed products, then start the HTTP server
connectDB()
    .then(() => seedProducts())
    .then(() => {
        startServer(PORT);
    })
    .catch((err) => {
        console.error('Startup failed:', err);
        process.exit(1);
    });
