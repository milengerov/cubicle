const jsonwebtoken = require("jsonwebtoken");

const { COOKIE_NAME, SECRET } = require("../config/config")


function authMiddleware() {
    function auth(req, res, next) {
        let token = req.cookies[COOKIE_NAME];

        if (token) {
            //verify token...
            jsonwebtoken.verify(token, SECRET, (err, decodedToken) => {
                if (err) {
                    //if err clear the cookie:
                    res.clearCookie(COOKIE_NAME);
                    
                }
                else {
                    //attach user info to the requestObj:
                    req.user = decodedToken;

                    res.locals.user = decodedToken;
                    res.locals.isAuthenticated = true;
                    

                }
                
            });
                
        }
        

        next();
    }


    return auth;
}

module.exports = authMiddleware;