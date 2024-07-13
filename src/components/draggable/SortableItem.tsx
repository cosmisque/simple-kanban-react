import React, { useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from './Item';
import { Task } from '../../types';
import AppContext from '../../context/AppContext';

export const SortableItem: React.FC<{
  id: string;
  task: Task;
}> = ({ id, task }) => {
  const { modalOpen } = useContext(AppContext);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled: modalOpen });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '10px 5px',
    marginTop: '10px'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={id} task={task} />
    </div>
  );
};
