
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  const NODE_ENV = process.env.NODE_ENV;

  if (!token) {
    return res.status(403).json("You are not Authenticated");
  }

  jwt.verify(token, NODE_ENV, (err, user) => {
    if (err) return res.status(403).json({ message: "Verifikasi Error" + err });
    req.user = user;
    next();
  });
};


module.exports = authenticateToken
