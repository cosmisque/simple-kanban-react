import * as React from 'react';
import { useForm, Controller, Control, FieldValues } from 'react-hook-form';
import Input from '../components/styled/input/Input';
import { useMutation } from '@tanstack/react-query';
import { DevTool } from '@hookform/devtools';
import { Task, TaskInput } from '../types';
import { updateTask } from '../api/taskApi';
import { Button } from '../components/styled/button/Button';
import Stack from '../components/styled/stack/Stack';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import AppContext from '../context/AppContext';
import { showSuccessToast } from '../utils/toast';
import { queryClient } from '../utils/queryClient';
import { SelectBox } from '../components/select/SelectBox';

interface ITaskFormProps {
  taskData?: Task;
}
interface IStatus {
  value: string;
  label: string;
}

const options: IStatus[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'inProgress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
];

const TaskUpdateForm: React.FC<ITaskFormProps> = ({ taskData }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control
  } = useForm<TaskInput>({
    defaultValues: {
      name: '',
      description: '',
      status: ''
    }
  });

  const { mutate: updateTaskMutate } = useMutation(updateTask, {
    onSuccess: () => {
      showSuccessToast('Task successfully updated', 'task-updated');
      queryClient.invalidateQueries(['user-tasks']);
    }
  });

  const { setModalOpen } = useContext(AppContext);

  useEffect(() => {
    if (!taskData) {
      return;
    }
    const { name, description, status } = taskData;
    setValue('name', name);
    setValue('description', description);
    setValue('status', status);
  }, [taskData]);

  const onSubmit = (taskInput: TaskInput) => {
    if (!taskData) {
      return;
    }
    const data = {
      ...taskInput,
      userId: '293af5ec-5031-704f-f75a-366657c6fb7f'
    };

    const { taskId, userId } = taskData;
    const updatedTask = { ...data, userId };
    setModalOpen(false);
    updateTaskMutate({ taskData: updatedTask, taskId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ width: '70%' }}>
      <Stack>
        <Input
          label="Task"
          data-testid="task"
          type="text"
          placeholder="Task"
          {...register('name', { required: 'Task name is required' })}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' ? handleSubmit(onSubmit) : ''
          }
          error={errors.name?.message}
        />
        <Input
          lineHeight="6"
          type="text"
          data-testid="desciption"
          label="Desciption"
          placeholder="Enter Your Desciption"
          {...register('description', {
            required: 'Task description is required'
          })}
          error={errors.description?.message}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' ? handleSubmit(onSubmit) : ''
          }
        />
        <Controller
          name="status"
          control={control}
          render={({ field: { value, onChange, ref } }) => {
            return (
              <>
                <label style={{ marginBottom: '-10px' }}>Status</label>
                <SelectBox
                  classNamePrefix="react-select"
                  onChange={(selected) => onChange(selected?.value)}
                  value={options.find((c) => c.value === value)}
                  options={options}
                  placeholder="Select status"
                />
              </>
            );
          }}
          rules={{ required: true }}
        />
      </Stack>
      <Stack margin="30px 10px">
        <Button type="submit" displayLabel="Update" />
      </Stack>
      <DevTool control={control} />
    </form>
  );
};

export default TaskUpdateForm;
