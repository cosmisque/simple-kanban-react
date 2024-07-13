import { IconX } from '@tabler/icons-react';
import FlexItem from '../styled/flex/FlexItem.style';
import FlexWrapper from '../styled/flex/FlexWrapper';
import { useMutation } from '@tanstack/react-query';
import { deleteTask } from '../../api/taskApi';
import { showSuccessToast } from '../../utils/toast';
import { queryClient } from '../../utils/queryClient';
import './item.css';
interface ItemProps {
  id: string;
  description?: string;
}

export const Item: React.FC<ItemProps> = ({ id, description }) => {
  const { mutate, isLoading: deleteTaskIsLoading } = useMutation(deleteTask, {
    onSuccess: () => {
      showSuccessToast('Task successfully deleted', 'task-deleted');
      queryClient.invalidateQueries(['user-tasks']);
    }
  });

  return (
    <FlexWrapper flexDirection="row" height="70px" width="95%" margin="10px">
      <FlexItem alignItems="flex-start" margin="10px 0">
        {description}
      </FlexItem>
      <FlexItem
        alignItems="flex-end"
        justifyContent="flex-start"
        flex="1 0"
        margin="3px 1px"
      >
        <span className="removeIcon">
          <span>
            <IconX
              color="red"
              size={20}
              onClick={(e: React.MouseEvent) => {
                mutate(id);
              }}
            />
          </span>
        </span>
      </FlexItem>
    </FlexWrapper>
  );
};
