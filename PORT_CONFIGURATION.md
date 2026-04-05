# Port Configuration Guide

## Overview
The application now includes automatic port fallback handling to prevent crashes when ports are already in use.

## Backend Server (Port 3000)

### Automatic Port Fallback
If port 3000 is already in use, the server will automatically try ports 3001-3005.

**Features:**
- ✅ Graceful handling of port conflicts
- ✅ Automatic retry on alternative ports
- ✅ Clear console warnings when using non-default port
- ✅ Helpful instructions for frontend configuration

### Console Output Examples

**Normal startup:**
```
🚀 Server running on http://localhost:3000
```

**Port conflict - automatic fallback:**
```
⚠️  Port 3000 is in use, trying port 3001...
🚀 Server running on http://localhost:3001
⚠️  Running on port 3001 instead of 3000
💡 Update your frontend .env file with: VITE_API_URL=http://127.0.0.1:3001
```

**All ports exhausted:**
```
❌ Unable to find an available port after trying ports 3000-3005
💡 Please free up a port or stop the conflicting process.
```

## Frontend (Port 5173)

### API Configuration
The frontend uses a centralized API configuration that supports environment variables.

**Default:** `http://127.0.0.1:3000`

### Connecting to Non-Default Backend Port

1. **Create a `.env` file in the `client/` directory:**
   ```bash
   cd client
   cp .env.example .env
   ```

2. **Set the API URL:**
   ```env
   VITE_API_URL=http://127.0.0.1:3001
   ```

3. **Restart the frontend dev server** for changes to take  effect

### Testing Different Ports

```bash
# Terminal 1: Start backend on default port
cd server && npm start

# Terminal 2: Set custom API URL and start frontend
cd client
echo "VITE_API_URL=http://127.0.0.1:3001" > .env
npm run dev
```

## Troubleshooting

### Kill Process on Port
```bash
# Find and kill process on port 3000
lsof -ti :3000 | xargs kill -9

# Find and kill process on port 5173
lsof -ti :5173 | xargs kill -9
```

### Check What's Using a Port
```bash
lsof -i :3000
```

### Run Both Services Together
```bash
# From project root
npm run dev
```

## DST Fix Included

The server also includes a fix for daylight saving time transitions:
- Cron jobs use UTC timezone to avoid DST issues
- Prevents infinite loops during DST transitions

## Related Files

- **Backend:** [`server/src/index.ts`](../server/src/index.ts)
- **Frontend Config:** [`client/src/config/api.ts`](../client/src/config/api.ts)
- **Environment Example:** [`client/.env.example`](../client/.env.example)
