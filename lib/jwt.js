const { Strategy, ExtractJwt } = require("passport-jwt");
require('dotenv').config();
const jwtConfig = {
  //define a secret key for signing the jwt tokens
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
const User = require("@models").User;

module.exports = new Strategy(jwtConfig, async (jwt_payload, done) => {
  let email = jwt_payload.email;
  let user = await User.findOne({ where: { emailAddress: email } });
  if (user) {
    return done(null, user);
  } else {
    return done(err, false);
  }
});
