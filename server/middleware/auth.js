const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      message: "Unauthorized user , no token found",
    });
  }
  token = token.split(" ")[1];
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  req.userId = payload.userId;
  next();
};
module.exports = auth;
