import { Application } from "express";
import { checkJwt } from '../libs/auth/auth0'

import messages from '../components/message/network'
import users from '../components/users/network';
import chat from '../components/chat/network'

export const messageRoute = (server: Application) => {
    server.use(checkJwt)
    server.use('/messages', messages);
    server.use('/users', users);
    server.use('/chat', chat);
}

