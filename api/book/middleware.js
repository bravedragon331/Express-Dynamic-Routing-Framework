const passport = require("passport");
const jwtStrategry = require("@lib/jwt");
passport.use(jwtStrategry);

function compare2arr(arr_1, arr_2) {
  var j = arr_2.length;
  if (arr_1.length !== arr_2.length) {
    return false;
  }
  while (j--) {
    try {
      if (arr_1[j][0] === ':') {
        continue;
      } else if (arr_1[j] !== arr_2[j] && arr_1[j][0] !== ':') {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  return true;
}

function compare(list, url) {
  for (let i = 0; i < list.length; i++) {
    let arr_1 = list[i].split('/');
    let arr_2 = url.split('/');
    if (compare2arr(arr_1, arr_2)) {
      return true;
    }
  }
  return false;
}

module.exports = function (req, res, next) {
  let whitelist = [
    "/api/book/comic/my_comic"
  ]
  if (compare(whitelist, req.originalUrl)) {
    next();
  } else {
    passport.authenticate('jwt', { session: false })(req, res, next)
  }
}