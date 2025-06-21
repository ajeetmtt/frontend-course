import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Error from "./pages/Error";
import ProductContainer from "./components/ProductContainer";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./components/Cart";
import App from "./App";
import Login from "./components/Login";

const Video = lazy(() => import("./pages/Video"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <ProductContainer />,
      },
      {
        path: "/men",
        element: <Men />,
      },
      {
        path: "/women",
        element: <Women />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },

      {
        path: "/product/:productID",
        element: <ProductDetails />,
      },
      {
        path: "/video",
        element: (
          <Suspense fallback={"<h1>Loding...</h1>"}>
            <Video />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
