require('dotenv').config();
const jwt = require('jsonwebtoken');
const usersService = require('../Service/usersService');

const SECRET = process.env.JWT_SECRET;

const validateFields = (body) => (body.email && body.password);

const login = async (req, res) => {
  if (!validateFields(req.body)) {
    return res
    .status(400)
    .json({ message: 'Some required fields are missing' });
  }
  try {
    const { email, password } = req.body;
    const response = await usersService.getByEmail(email);

    if (!response || response.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = jwt.sign({ email }, SECRET, {
      expiresIn: 6000,
    });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
  const { email } = req.body;
  const response = await usersService.getByEmail(email);

  if (response) return res.status(409).json({ message: 'User already registered', response });
  const token = jwt.sign({ data: { user: email } }, SECRET, {
    expiresIn: 600,
  });

  const { displayName, password, image } = req.body;
  await usersService.create({ displayName, email, password, image });
  return res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await usersService.getAll();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { response } = req;
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { userId } = req;
    await usersService.remove(userId);
    return res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  create,
  getAll,
  getById,
  remove,
};
