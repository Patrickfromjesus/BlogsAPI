const { Category } = require('../models');

const create = async (name) => {
  const data = await Category.create({ name });
  return data;
};

const getAll = async () => {
  const data = await Category.findAll();
  return data;
};

const getByIds = async () => {
  const data = await Category.findAll({ attributes: ['id'] });
  const values = data.map((e) => e.dataValues.id);
  return values;
};

module.exports = {
  create,
  getAll,
  getByIds,
};
