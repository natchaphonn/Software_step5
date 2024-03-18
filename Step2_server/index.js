const hapi = require("@hapi/hapi");
const env = require("./env.js");
const Movies = require("./respository/movie");
const express = require("express");
const app = express();
//------------------
const web_port = 3010;
const api_port = 3001;
//------------- express ----------
app.listen(web_port, () => {
  console.log("Start web server at port " + web_port);
});
//------------ hapi --------------
console.log("Running Environment: " + env);
const init = async () => {
  const server = hapi.Server({
    port: api_port,
    host: "0.0.0.0",
    routes: {
      cors: true,
    },
  });
  //---------

  server.route({
    method: "POST",
    path: "/api/user/insert",
    config: {
      payload: {
        multipart: true,
      },
      cors: {
        origin: ["*"],
        additionalHeaders: ["cache-control", "x-requested-width"],
      },
    },
    handler: async function (request, reply) {
      const { name_first, email, password } = request.payload;
      //const title = request.payload.title;
      //const genre = request.payload.genre;
      try {
        const responsedata = await Movies.MovieRepo.postMovie(
          name_first,
          email,
          password
        );
        if (responsedata.error) {
          return responsedata.errMessage;
        } else {
          return responsedata;
        }
      } catch (err) {
        server.log(["error", "home"], err);
        return err;
      }
    },
  });
  await server.start();
  console.log("API Server running on %s", server.info.uri);
  //---------
};
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
init();
