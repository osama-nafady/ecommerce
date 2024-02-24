import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./components/Cart/Cart";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";

let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "details/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <CartContextProvider>
      <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <RouterProvider router={routers}></RouterProvider>
      </UserContextProvider>
      <ReactQueryDevtools/>
      <Toaster/>
    </QueryClientProvider>
    </CartContextProvider>
  );
}

export default App;
