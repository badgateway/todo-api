import router from '@curveball/router';

import Home from './home/controller';
import TodoCollection from './todo/controller/collection';
import Todo from './todo/controller/item';

export default [
  router('/', new Home()),
  router('/todo', new TodoCollection()),
  router('/todo/:id', new Todo())
];
