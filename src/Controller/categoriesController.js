const categoryService = require('../Service/categoryService');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const response = await categoryService.create(name);
    return res.status(201).json({ id: response.id, name });
  } catch (error) {
    res.status(500).json({ message: error.messsage });
  }
};

const getAll = async (_req, res) => {
  try {
    const response = await categoryService.getAll();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
};
