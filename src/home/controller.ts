import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

export default class HomeController extends Controller {

  get(ctx: Context) {

    ctx.response.type = 'application/json';

    ctx.response.body = {
      _links: {
        self: { href: '/' },
        'list-collection': { href: '/list', title: 'List of lists!'},
      },
      title: 'Hello World!'
    };

  }

}
