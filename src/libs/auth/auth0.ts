const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: 'https://telegrom.com',
  issuerBaseURL: `https://dev-x7zwzkjp2jhejnw5.us.auth0.com/`,
});

//SCOPES
// const checkScopes = requiredScopes('read:messages');

export {
    checkJwt,
}