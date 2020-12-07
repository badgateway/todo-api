import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

export default class List extends Controller {

  get(ctx: Context) {

    ctx.response.body = {
      _links: {
        self: { href: `/list/${ctx.state.params.listId}` },
        'todo-collection': {
          href: `/list/${ctx.state.params.listId}/todo`,
          title: 'List of todos',
        }
      }
    };

  }

}
