require('dotenv').config();
const jwt = require('jsonwebtoken');
const userService = require('../Service/usersService');

const SECRET = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  try {
  const header = req.header('Authorization');
  if (!header) return res.status(401).json({ message: 'Token not found' });

  jwt.verify(header, SECRET, async (err, decode) => {
    if (err) return res.status(401).json({ message: 'Expired or invalid token' });
    req.email = decode.email;
    const response = await userService.getByEmail(decode.email);
    req.userId = response.id;
    return next();
  });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = validateToken;