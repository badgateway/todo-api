import { NotFound } from '@curveball/http-errors';

import * as db from '../database';
import { Todo, NewTodo, TodoStatus } from './types';

type TodoRecord = {
  id: number;
  list_id: string;
  title: string;
  created_at: number;
  modified_at: number;
  status: number;
  completed_at: number | null;
}

export async function findByList(listId: string): Promise<Todo[]> {

  const todos = await db.query<TodoRecord>('SELECT * FROM todo WHERE list_id = ?', listId);
  return todos.map(recordToModel);

}
export async function findById(listId: string, todoId: string): Promise<Todo> {

  const todos = await db.query<TodoRecord>(
    'SELECT * FROM todo WHERE list_id = ? AND id = ?',
    [listId, todoId]
  );

  if (!todos.length) {
    throw new NotFound(`Todo with id ${todoId} not found in list ${listId}`);
  }

  return recordToModel(todos[0]);

}

export async function findLists(): Promise<string[]> {

  const results = await db.query<{list_id: string}>('SELECT DISTINCT list_id FROM todo');
  return results.map( v => v.list_id);

}

export async function create(todo: NewTodo): Promise<Todo> {

  const query = 'INSERT INTO todo SET ?';
  const fields: Partial<TodoRecord> = {
    list_id: todo.listId,
    title: todo.title,
    status: statusMap[todo.status],
    created_at: Date.now(),
    modified_at: Date.now(),
  };

  console.log(query, fields);

  const newId = await db.insert(query, fields);

  return {
    id: newId,
    ...todo,
    createdAt: new Date(),
    modifiedAt: new Date(),
  } as Todo;

}


export async function update(todo: Todo): Promise<void> {

  const query = 'UPDATE todo SET ? WHERE id = ? AND list_id = ?';
  const fields: Partial<TodoRecord> = {
    list_id: todo.listId,
    title: todo.title,
    status: statusMap[todo.status],
    modified_at: Date.now(),
    completed_at: todo.completedAt?.getTime() || null,
  };
  await db.query(query, [fields, todo.id, todo.listId]);

}


function recordToModel(record: TodoRecord): Todo {

  const baseProps = {
    id: record.id,
    listId: record.list_id,
    title: record.title,
    createdAt: new Date(record.created_at),
    modifiedAt: new Date(record.modified_at),
  };


  if (record.status === 3) {
    return {
      ...baseProps,
      status: 'completed',
      completedAt: new Date(record.completed_at!),
    };
  } else {
    return {
      ...baseProps,
      status: record.status === 1 ? 'needs-action' : 'in-progress',
      completedAt: null,
    };
  }

}

const statusMap: Record<TodoStatus, number> = {
  'needs-action': 1,
  'in-progress': 2,
  'completed': 3,
};
