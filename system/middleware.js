const passport = require("passport");
const jwtStrategry = require("@lib/jwt");
passport.use(jwtStrategry);
require('dotenv').config();

class Middleware {
    constructor() {
        this.white_list = [];
    }

    compare2arr(arr_1, arr_2) {
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

    isWhitelist(url) {
        let list = this.white_list;
        for (let i = 0; i < list.length; i++) {
            let arr_1 = list[i].split('/');
            let arr_2 = url.split('/');
            if (this.compare2arr(arr_1, arr_2)) {
                return true;
            }
        }
        return false;
    }

    isBlacklist() {
        return false;
    }

    use(req, res, next, self) {
        if (self.isWhitelist(req.originalUrl)) {
            console.log("Whitelist Middleware")
            next();
        } else if (self.isBlacklist(req.originalUrl)) {
            res.status(404).send();
        } else if (process.env.AUTH_MODE == "jwt") {
            passport.authenticate('jwt', { session: false })(req, res, next)
        } else {
            console.log("Empty Middleware")
            next();
        }
    }
}

module.exports = Middleware;
