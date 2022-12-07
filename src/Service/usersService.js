const { User } = require('../models');

const getByEmail = async (email) => {
  const [data] = await User.findAll({ where: { email } });
  console.log(data);
  return data;
};

const create = async (infos) => {
  const data = await User.create(infos);
  return data;
};

const getAll = async () => {
    const data = await User.findAll({ attributes: { exclude: ['password'] } });
    return data;
};

const getById = async (id) => {
  const data = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return data;
};

const remove = async (id) => {
  const data = await User.destroy({ where: { id } });
  return data;
};

module.exports = {
  getByEmail,
  create,
  getAll,
  getById,
  remove,
};
