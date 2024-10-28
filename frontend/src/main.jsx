import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import {provider} from 'react-redux';
import {Provider} from 'react-redux';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import store from './store.js';
import HomePage from './pages/HomePage.jsx';
import PostInfopage from './pages/PostInfopage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/index",
        element: <HomePage/>
      },
      {
        path: "/post/:id", // dynamic aa ka dhigeena Id-ga
        element: <PostInfopage/>
      },

      {
        path: "/login",
        element: <LoginPage/>
      },
      {
        path: "/signup",
        element: <SignUpPage/>
      },
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
