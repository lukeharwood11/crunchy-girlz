import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login-page/login.page';
import SignUpPage from './pages/signup-page/signup.page';
import HomePage from './pages/home-page/home.page';
import AuthWrapper from './AuthWrapper';
import NotFoundPage from './pages/not-found-page/not-found.page';

const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  notFound: '*'
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.signup} element={<SignUpPage />} />
          <Route path={""} element={<AuthWrapper />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path={routes.notFound} element={<NotFoundPage />} />
        </Routes> 
    </BrowserRouter>
  );
};

export default App;