
const express = require('express');
const middleware = require('express-graphql')
const cors = require('cors');
const server = express();;
const Schema = require('./schema');
const ignoreFavicon = require('./ignoreFavicon');

server.use(cors(), ignoreFavicon);
server.use('', middleware({
    schema: Schema,
    pretty: true,
    graphiql: true

}))
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server ready at ${PORT}`);
});