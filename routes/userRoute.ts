import * as express from 'express';
let userRoute = express.Router();

/* GET users listing. */
userRoute.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default userRoute;
