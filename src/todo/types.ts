export type TodoStatus = 'needs-action' | 'in-progress' | 'completed';

export type Todo = {
  id: number;
  listId: string;
  title: string;

  createdAt: Date;
  modifiedAt: Date;

  status: 'needs-action' | 'in-progress';
  completedAt: null;

} | {
  id: number;
  listId: string;
  title: string;

  createdAt: Date;
  modifiedAt: Date;

  status: 'completed';
  completedAt: Date;
}

export type NewTodo = Omit<Todo, 'id' | 'createdAt' | 'modifiedAt'>;
