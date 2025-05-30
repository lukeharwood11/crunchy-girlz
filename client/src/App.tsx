import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login-page/login.page';
import SignUpPage from './pages/signup-page/signup.page';
import HomePage from './pages/home-page/home.page';
import ProfilePage from './pages/profile-page/profile.page';
import ManageMealsPage from './pages/manage-meals-page/manage-meals.page';
import ManageRecipesPage from './pages/manage-recipes-page/manage-recipes.page';
import SearchRecipesPage from './pages/search-recipes-page/search-recipes.page';
import ShoppingListPage from './pages/shopping-list-page/shopping-list.page';
import AuthWrapper from './AuthWrapper';
import NotFoundPage from './pages/not-found-page/not-found.page';
import Layout from './components/layout/Layout';

export const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  profile: '/profile',
  manageMeals: '/meals',
  manageRecipes: '/recipes',
  searchRecipes: '/search',
  shoppingList: '/shopping',
  notFound: '*'
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.signup} element={<SignUpPage />} />
          <Route path={""} element={<AuthWrapper />}>
            <Route path={""} element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path={routes.profile} element={<ProfilePage />} />
              <Route path={routes.manageMeals} element={<ManageMealsPage />} />
              <Route path={routes.manageRecipes} element={<ManageRecipesPage />} />
              <Route path={routes.searchRecipes} element={<SearchRecipesPage />} />
              <Route path={routes.shoppingList} element={<ShoppingListPage />} />
            </Route>
          </Route>
          <Route path={""} element={<Layout />}>
            <Route path={routes.notFound} element={<NotFoundPage />} />
          </Route>
        </Routes> 
    </BrowserRouter>
  );
};

export default App;