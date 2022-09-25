// config/http.js
jwt = require("jsonwebtoken");
module.exports.http = {
  order: [
    'startRequestTimer',
    'cookieParser',
    'session',
    'myRequestLogger',
    'bodyParser',
    'handleBodyParserError',
    'compress',
    'methodOverride',
    'poweredBy',
    '$custom',
    'router',
    'www',
    'favicon',
    '404',
    '500'
  ],
    // An example of a custom HTTP middleware function:
    auth: (function (){
      console.log('Initializing `auth` (HTTP middleware)...');
      return function (req,res,next) {
        try {
          const token = req.header("sis-auth-token");
          //Check for token
          if (!req.session.isLoggedIn)
            return res.status(401).json({
              success: false,
              message: "No token, authorization denied!!",
            });
          //Verify token
          const decoded= jwt.verify(
            token,
            "billyApp"
          );
          //Add user from payload
          req.session.authinfo = decoded;
          next();
        } catch (e) {
          res.status(400).json({
            success: false,
            message: "Invalid token, authorization denied!",
          });
        }
      };
    })(),

}