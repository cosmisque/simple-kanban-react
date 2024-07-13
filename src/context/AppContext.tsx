import React, { type ReactNode, createContext, useState } from 'react';
import { Task } from '../types';

export interface IApp {
  navBarHidden: boolean;
  setNavBarHidden: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: Task | undefined;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
  formType: 'edit' | 'create' | null;
  setFormType: React.Dispatch<React.SetStateAction<'edit' | 'create' | null>>;
}

const initialAppValue: IApp = {
  navBarHidden: false,
  setNavBarHidden: () => {},
  modalOpen: false,
  setModalOpen: () => {},
  selectedTask: undefined,
  setSelectedTask: () => {},
  formType: null,
  setFormType: () => {}
};

export const AppContext = createContext<IApp>(initialAppValue);

interface IAppContext {
  children: ReactNode;
}

export const AppContextProvider: React.FC<IAppContext> = ({ children }) => {
  const [navBarHidden, setNavBarHidden] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [formType, setFormType] = useState<'edit' | 'create' | null>(null);

  const value = {
    navBarHidden,
    setNavBarHidden,
    modalOpen,
    setModalOpen,
    setSelectedTask,
    selectedTask,
    formType,
    setFormType
  };

  return <AppContext.Provider value={value}> {children} </AppContext.Provider>;
};

export default AppContext;
