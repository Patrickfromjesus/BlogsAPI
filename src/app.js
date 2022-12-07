const express = require('express');
const userMiddleware = require('./middlewares/userMiddleware');
const categoryMiddleware = require('./middlewares/caterogyMiddleware');
const postMiddleware = require('./middlewares/postMiddleware');
const validateToken = require('./Auth/auth');
const usersController = require('./Controller/usersController');
const categoriesController = require('./Controller/categoriesController');
const postsController = require('./Controller/postsController');

const app = express();

app.use(express.json());

app.post('/login', usersController.login);
app.post('/user', userMiddleware.validateCreate, usersController.create);
app.get('/user', validateToken, usersController.getAll);
app.get('/user/:id', validateToken, userMiddleware.validateUserId, usersController.getById);
app
.post('/categories', validateToken, categoryMiddleware.validateCreate, categoriesController.create);
app.get('/categories', validateToken, categoriesController.getAll);
app.post('/post', validateToken, postMiddleware.validateCreate, postsController.create);
app.get('/post/search?', validateToken, postsController.getByQuery);
app.get('/post', validateToken, postsController.getAll);
app.get('/post/:id', validateToken, postMiddleware.validateIdPost, postsController.getById);
app.put('/post/:id', validateToken, postMiddleware.validatePut, postsController.edit);
app.delete('/post/:id', validateToken, postMiddleware.validateId, postsController.deletePost);
app.delete('/user/me', validateToken, usersController.remove);

module.exports = app;
