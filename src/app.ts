import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import http from 'http';
import { connect } from './socket';
import { ConnectDB } from './db';
import { messageRoute } from './network/routes';
import { errorHandler, boomErrorHandler } from './middlewares/error.handler';

dotenv.config();
const PORT: string | number = process.env.PORT || 3000;
const app: Application = express();


//database conection
if (!process.env.DB_URI)  process.exit(1);
ConnectDB(process.env.DB_URI);

//middlewares
app.use(express.json());


// Sockets
const server = http.createServer(app);
connect(server);

//routes
messageRoute(app);

    //error handlers
app.use(boomErrorHandler)
app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`Listening in port: http://localhost:${PORT}`);
});
