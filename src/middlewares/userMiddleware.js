const usersService = require('../Service/usersService');

const validateLength = (value, min) => (value.length >= min);

const validateEmail = (email) => {
  const regex = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/;
  return regex.test(email);
};

const validateUserId = async (req, res, next) => {
  const { id } = req.params;
  const response = await usersService.getById(id);
  if (!response) {
    return res.status(404).json({
    message: 'User does not exist',
    });
  }
  req.response = response;
  next(); 
};

const validateCreate = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (!validateLength(displayName, 8)) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (!validateLength(password, 6)) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }
  next();
};

module.exports = {
  validateCreate,
  validateUserId,
};
