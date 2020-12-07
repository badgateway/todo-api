import Controller from '@curveball/controller';
import { Context } from '@curveball/core';
import * as service from '../service';
import { NewTodo } from '../types';

export default class TodoCollection extends Controller {

  async get(ctx: Context) {

    const todos = await service.findByList(ctx.state.params.listId);

    ctx.response.body = {
      total: todos.length,
      _links: {
        self: {
          href: `/list/${ctx.state.params.listId}/todo`,
        },
        item: todos.map(todo => ({ href: `/list/${todo.listId}/todo/${todo.id}`, title: todo.title})),
      }
    };

  }

  async post(ctx: Context) {

    const todo: NewTodo = {
      title: ctx.request.body.title,
      status: ctx.request.body.status,
      listId: ctx.state.params.listId,
      completedAt: ctx.request.body.completedAt,
    };

    const newTodo = await service.create(todo);
    ctx.status = 201;
    ctx.response.headers.set('Location', `/list/${newTodo.listId}/todo/${newTodo.id}`);

  }

}
