// importing links used in the page
import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeLayout, Landing, Register, Login, DashboardLayout, Error, AddJob, Stats, AllJobs, Profile, Admin } from './pages';


// check for dark theme status while starting the page
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};


checkDefaultTheme();


const router = createBrowserRouter([
  {
    // ! this is going to be our parent route
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    // the links to the children page are given below
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />
          },
          {
            path: 'stats',
            element: <Stats />
          },
          {
            path: 'all-jobs',
            element: <AllJobs />
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'admin',
            element: <Admin />
          },
        ]
      },
    ]
  },


])

// accessing the router
const App = () => {
  return <RouterProvider router={router} />;

};

export default App;
