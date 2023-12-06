const users = require('./userRouter');

module.exports = function routes(app) {
  app.use("/api/v1/users", users);
};
