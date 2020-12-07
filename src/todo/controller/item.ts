import { Context } from '@curveball/core';
import Controller from '@curveball/controller';

import * as service from '../service';

export default class Todo extends Controller {

  async get(ctx: Context) {

    const todo = await service.findById(
      ctx.state.params.listId,
      ctx.state.params.todoId
    );

    ctx.response.body = {
      ...todo,
      _links: {
        self: `/list/${todo.listId}/todo/${todo.id}`,
        collection: {
          href: `/list/${todo.listId}`,
        },
      }
    };

  }

  async put(ctx: Context) {

    const todo = await service.findById(
      ctx.state.params.listId,
      ctx.state.params.todoId
    );

    todo.title = ctx.request.body.title;
    todo.status = ctx.request.body.status;
    if (todo.status === 'completed') {
      todo.completedAt = ctx.request.body.completedAt ? new Date(ctx.request.body.completedAt) : new Date();
    } else {
      todo.completedAt = null;
    }

    await service.update(todo);
    ctx.status = 204;

  }
}
