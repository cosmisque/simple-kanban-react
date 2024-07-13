import { IconX, IconPencil } from '@tabler/icons-react';
import FlexItem from '../styled/flex/FlexItem.style';
import FlexWrapper from '../styled/flex/FlexWrapper';
import { useMutation } from '@tanstack/react-query';
import { deleteTask } from '../../api/taskApi';
import { showSuccessToast } from '../../utils/toast';
import { queryClient } from '../../utils/queryClient';

import Modal from '../styled/modal/Modal';
import { Task, TaskAction } from '../../types';
import TaskUpdateForm from '../../forms/TaskUpdateForm';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import './item.css';

interface ItemProps {
  id: string;
  task?: Task;
}

export const Item: React.FC<ItemProps> = ({ id, task }) => {
  const { mutate: deleteTaskMutate, isLoading: deleteTaskIsLoading } =
    useMutation(deleteTask, {
      onSuccess: () => {
        showSuccessToast('Task successfully deleted', 'task-deleted');
        queryClient.invalidateQueries(['user-tasks']);
      }
    });
  const { modalOpen, setModalOpen } = useContext(AppContext);

  return (
    <FlexWrapper flexDirection="row" height="100px" width="95%" margin="15px">
      <FlexWrapper
        justifyContent="flex-start"
        alignItems="flex-start"
        margin="0 0"
      >
        <FlexItem alignItems="flex-start" style={{ fontSize: '14px' }}>
          <span
            style={{
              margin: '6px 0',
              fontWeight: 'bold',
              textDecorationLine: 'underline'
            }}
          >
            {task?.name}
          </span>
          <span>{task?.description}</span>
        </FlexItem>
      </FlexWrapper>

      <FlexItem
        alignItems="flex-end"
        justifyContent="flex-start"
        flex="1 0"
        margin="3px 1px"
      >
        <span className="removeIcon">
          <span>
            <Modal
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
              type="icon"
              icon={<IconPencil size={18} color="#7ab318" />}
              content={
                <TaskUpdateForm taskData={task} setModalOpen={setModalOpen} />
              }
            />
          </span>
          <span>
            <IconX
              color="red"
              size={20}
              onClick={(e: React.MouseEvent) => {
                deleteTaskMutate(id);
              }}
            />
          </span>
        </span>
      </FlexItem>
    </FlexWrapper>
  );
};
