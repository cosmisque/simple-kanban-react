import { TaskResponse, useTasksData } from '../hooks/useTaskData';
import { TaskBoard } from './TaskBoard';

interface KanbanProps {}

export const KanbanBoard: React.FC<KanbanProps> = () => {
  const userId = '293af5ec-5031-704f-f75a-366657c6fb7f';
  const defaultValue = {
    pending: [],
    inProgress: [],
    completed: []
  };

  const { isLoading, data, isError, error, refetch } = useTasksData(userId, {
    refetchOnWindowFocus: false
  });

  return <TaskBoard tasks={data ?? defaultValue} />;
};
