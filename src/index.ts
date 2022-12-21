import * as dotenv from 'dotenv';
import app from './app';
import http from 'http';
import { connect } from './socket';
import { ConnectDB } from './db';

dotenv.config();
const PORT: string | number = process.env.PORT || 3000;

//database conection
if (!process.env.DB_URI)  process.exit(1);
ConnectDB(process.env.DB_URI);

// Sockets
const server = http.createServer(app);
connect(server);

server.listen(PORT, () => {
    console.log(`Listening in port: http://localhost:${PORT}`);
});
