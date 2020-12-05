import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

export default class HomeController extends Controller {

  get(ctx: Context) {

    ctx.response.type = 'application/json';

    ctx.response.body = {
      _links: {
        self: { href: '/' },
        'todo-collection': { href: '/todo', title: 'List of todos'},
      },
      title: 'Hello World!'
    };

  }

}
