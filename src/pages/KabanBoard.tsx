import { useTasksData } from '../hooks/useTaskData';
import { HashMap, TaskResponse } from '../types';
import { TaskBoard } from './TaskBoard';

interface KanbanProps {}

export const KanbanBoard: React.FC<KanbanProps> = () => {
  const userId = '293af5ec-5031-704f-f75a-366657c6fb7f';
  const keyMap: HashMap = {
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed'
  };

  const { isLoading, data, isError, error, refetch } = useTasksData(userId, {
    refetchOnWindowFocus: false
  });

  const defaultValue: TaskResponse = {};

  for (const key of Object.keys(keyMap)) {
    defaultValue[key] = [];
  }

  return <TaskBoard tasks={data ?? defaultValue} keyMap={keyMap} />;
};
