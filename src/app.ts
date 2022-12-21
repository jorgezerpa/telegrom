import express, { Application } from 'express';
import { messageRoute } from './network/routes';
import { errorHandler, boomErrorHandler } from './middlewares/error.handler';
import cors from 'cors'

const app: Application = express();

//middlewares
app.use(cors())
app.use(express.json());

//routes
messageRoute(app);

    //error handlers
app.use(boomErrorHandler)
app.use(errorHandler)

export default app
