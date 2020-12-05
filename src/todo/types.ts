export type TaskStatus = 'needs-action' | 'in-progress' | 'completed';

export type Task = {
  id: number;
  title: string;

  createdAt: Date;
  modifiedAt: Date;

  status: 'needs-action' | 'in-progress';
  completedAt: null;

} | {
  id: number;
  title: string;

  createdAt: Date;
  modifiedAt: Date;

  status: 'completed';
  completedAt: Date;
}

export type NewTask = Omit<Task, 'id' | 'createdAt' | 'modifiedAt'>;
