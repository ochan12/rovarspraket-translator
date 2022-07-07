import server from "./server";

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log("Server started")
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
