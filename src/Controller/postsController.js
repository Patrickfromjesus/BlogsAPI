const userService = require('../Service/usersService');
const postService = require('../Service/postService');

const create = async (req, res) => {
  try {
  const { email } = req;
  const { title, content, categoryIds } = req.body;
  const { id } = await userService.getByEmail(email);
  const infos = { title, content, userId: id };
  const dataPost = await postService.create(infos, categoryIds);
  return res.status(201).json(dataPost);
  } catch (error) {
  return res.status(500).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
  const response = await postService.getAll();
  return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  const { post } = req;
  return res.status(200).json(post);
};

const edit = async (req, res) => {
  const { content, title } = req.body;
  const { id } = req.params;
  const response = await postService.edit({ content, title }, id);
  const dataUser = await userService.getByEmail(req.email);
  if (response.userId !== dataUser.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  return res.status(200).json(response);
};

const deletePost = async (req, res) => {
  try {
    const { content, title } = req.body;
    const { id } = req.params;
    const response = await postService.edit({ content, title }, id);
    const dataUser = await userService.getByEmail(req.email);
    if (response.userId !== dataUser.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    const responseDelete = await postService.deletePost(id);
    return res.status(204).json(responseDelete);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByQuery = async (req, res) => {
  if (!req.query.q) {
    const response = await postService.getAll();
    return res.status(200).json(response);
  }
  
  try {
    const { q } = req.query;
    const response = await postService.getByQuery(q);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  edit,
  deletePost,
  getByQuery,
};
