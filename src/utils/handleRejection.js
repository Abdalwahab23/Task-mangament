const handleRejection = (server) => {
  process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.name},${err.message}`);
    server.close(() => {
      console.log("shut downning ......");
      process.exit(1);
    });
  });
};
export default handleRejection;
