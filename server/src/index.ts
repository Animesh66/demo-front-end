import express from 'express';
import cors from 'cors';
import { connectDB, seedProducts } from './db';
import routes from './routes';

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
    })
    .catch((err) => {
        console.error('Startup failed:', err);
        process.exit(1);
    });
