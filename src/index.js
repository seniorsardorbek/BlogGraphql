const http = require("http");
const express = require("express");
const cors = require("cors");
const  buildGraphQLServer  = require("./graphql/index.js");
const config = require("./shared/config/index.js");

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors());

const { server, serverMiddleware } = buildGraphQLServer(httpServer);
server.start();
app.use("/graphql", serverMiddleware());

const PORT =  8080;
httpServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
