import Controller from '@curveball/controller';
import * as service from '../service';
import { Context } from '@curveball/core';
import { nanoid } from 'nanoid/async';

export default class ListCollection extends Controller {

  async get(ctx: Context) {

    const lists = await service.findLists();

    ctx.response.body = {
      _links: {
        self: { href: '/list' } ,
        item: lists.map(list => ({
          href: '/list/' + list,
        }))
      },
      total: lists.length,
    };

  }


  async post(ctx: Context) {

    // Lists are really ephemeral. Lists exists because they have tasks in
    // them.
    // So if someone wants to create a list with POST, we just give them
    // a new list id.

    const id = await nanoid(6);

    ctx.status = 201;
    ctx.response.headers.set('Location', '/list/' + id);

  }

}
