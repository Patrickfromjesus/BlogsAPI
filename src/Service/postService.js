const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const create = async (infos, categoryIds) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const dataPost = await BlogPost.create(infos, { transaction: t });
      const { id } = dataPost;
      const postId = 'post_id';
      const categoryId = 'category_id';
      const bulkInfos = categoryIds
        .map((e) => ({ [postId]: id, [categoryId]: e }));
      await PostCategory.bulkCreate(bulkInfos, { transaction: t });
      return dataPost;
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getAll = async () => {
  const data = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    attributes: { exclude: ['user_id'] },
  });
  return data;
};

const getById = async (id) => {
  const data = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    attributes: { exclude: ['user_id'] },
  });
  return data;
};

const edit = async (infos, id) => {
  await BlogPost.update(infos, {
    where: { id },
  });
  const data = await getById(id);
  return data; 
};

const deletePost = async (id) => {
  const data = await BlogPost.destroy({ where: { id } });
  return data;
};

const getByQuery = async (q) => {
  const data = await BlogPost.findAll({ where: {
    [Op.or]: [
    { content: { [Op.like]: `%${q}%` } },
    { title: { [Op.like]: `%${q}%` } }],
  },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  attributes: { exclude: ['user_id'] },
  });
  return data;
};

module.exports = {
  create,
  getAll,
  getById,
  edit,
  deletePost,
  getByQuery,
};
