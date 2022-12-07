const categoryService = require('../Service/categoryService');
const postService = require('../Service/postService');

const validateFields = (body) => (!body.title || !body.content || !body.categoryIds);

const validateIds = async (ids) => {
  if (!ids.length) return { type: false, message: 'one or more "categoryIds" not found' };
  const response = await categoryService.getByIds();
  if (!ids.every((e) => response.includes(e))) {
    return { type: false, message: 'one or more "categoryIds" not found' };
  }
  return { type: true };
};

const validateCreate = async (req, res, next) => {
  if (validateFields(req.body)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const valueValidate = await validateIds(req.body.categoryIds);

  if (!valueValidate.type) res.status(400).json({ message: valueValidate.message });
  next();
};

const validateIdPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await postService.getById(id);
    if (!data) return res.status(404).json({ message: 'Post does not exist' });
    req.post = data;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validatePut = async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const response = await postService.getById(id);
  if (!response) return res.status(404).json({ message: 'Post does not exist' });
  next();
};

module.exports = { validateCreate, validateIdPost, validatePut, validateId };