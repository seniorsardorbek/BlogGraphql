const { ApolloServer } =require( '@apollo/server');
const { ApolloServerPluginDrainHttpServer } =require( '@apollo/server/plugin/drainHttpServer');
const { WebSocketServer } =require( 'ws');
const { useServer } =require( 'graphql-ws/lib/use/ws');
const { schema } =require( './schema.js');
const { expressMiddleware } =require( '@apollo/server/express4');
const jwt =require( 'jsonwebtoken');

 function buildGraphQLServer(httpServer) {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      // Http serverda xatolik bo'lsa serverni to'xtatish uchun plugin
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        // Ws serverda xatolik bo'lsa serverni to'xtatish uchun sozlama
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  const serverMiddleware = () => expressMiddleware(server, {
    context: ({ req }) => {
      const token = req.headers.authorization;

      if (token) {
        const decoded = jwt.verify(token, config.jwt.secret);

        return { user: decoded.user };
      }

      return { user: {} };
    },
  });

  return { server, serverMiddleware };
}
module.exports =  buildGraphQLServer