import router from '@curveball/router';

import Home from './home/controller';
import ListCollection from './list/controller/collection';
import List from './list/controller/item';
import TodoCollection from './todo/controller/collection';
import Todo from './todo/controller/item';

export default [
  router('/', new Home()),
  router('/list', new ListCollection()),
  router('/list/:listId', new List()),
  router('/list/:listId/todo', new TodoCollection()),
  router('/list/:listId/todo/:todoId', new Todo())
];
