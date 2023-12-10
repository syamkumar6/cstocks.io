import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import  { Toaster } from 'react-hot-toast';
import Store from "./ReduxStore/Store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import Rootroute from "./Routes/Rootroute";
import Errorpage from "./Errorpage";
import Homepage, { loader as homepageloader } from "./Routes/Homepage";
import Singlebook, { loader as singlebookloader } from "./Routes/Singlebook";
import Bookspage, {loader as bookspageloader} from "./Routes/Bookspage";
import AuthorProfilePage, {loader as authorloader} from "./Routes/AuthorProfilePage";
import CartPage from "./Routes/CartPage";
import SignUpPage from "./Routes/SignUpPage";
import SignInPage from "./Routes/SignInPage";
import UserProfile from "./Routes/UserProfile";
import UserOrder, {loader as orderLoader} from "./Routes/UserOrder";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootroute />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        loader: homepageloader,
      },
      {
        path: "/books",
        element: <Bookspage />,
        loader: bookspageloader
      },
      {
        path: "/books/:bookId",
        element: <Singlebook />,
        loader: singlebookloader,
      },
      {
        path: "/authors/:authorId",
        element: <AuthorProfilePage/>,
        loader: authorloader
      },
      {
        path: "/cart",
        element: <CartPage/>
      },
      {
        path: "/signup",
        element: <SignUpPage/>
      },
      {
        path: "/login",
        element: <SignInPage/>
      },
      {
        path: "/userprofile",
        element: <UserProfile/>
      },
      {
        path: "/user/orders",
        element: <UserOrder/>,
        loader: orderLoader
      },
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
    <Toaster />
  </React.StrictMode>
);


reportWebVitals();
