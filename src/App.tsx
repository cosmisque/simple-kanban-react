import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Layout from './layout/Layout';
import UserContext, { UserContextProvider } from './context/UserContext';
import { AppContextProvider } from './context/AppContext';
import { LoginForm } from './forms/LoginForm';
import Theme from './provider/Theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryBoundaries } from './suspense/QueryBoundaries';
import { Fragment, useContext } from 'react';
import { type User } from './types';
import RegisterForm from './forms/RegisterForm';
import ProtectedRoute from './route/ProtectedRoute';
import GlobalStyle from './provider/globalStyles';
import { useTheme } from 'styled-components';
import { TaskBoard } from './pages/TaskBoard';
import { KanbanBoard } from './pages/KabanBoard';
import { queryClient } from './utils/queryClient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Fragment>
      <Theme>
        <GlobalStyle />
        <AppContextProvider>
          <UserContextProvider>
            <QueryClientProvider client={queryClient}>
              <QueryBoundaries>
                <Layout>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        // <ProtectedRoute>
                        <KanbanBoard />
                        // </ProtectedRoute>
                      }
                    />
                    <Route
                      path="*"
                      element={<p>There&apos;s nothing here: 404!</p>}
                    />
                  </Routes>
                </Layout>
              </QueryBoundaries>
              <ToastContainer
                hideProgressBar={true}
                toastStyle={{ backgroundColor: '#1a2332' }}
                position="top-right"
              />
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            </QueryClientProvider>
          </UserContextProvider>
        </AppContextProvider>
      </Theme>
    </Fragment>
  );
}

export default App;
