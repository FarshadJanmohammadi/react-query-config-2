import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

const App = () => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 5,
        // staleTime: Infinity, // data cache -> 0s
        // gcTime: 10_000, // query inactive -> 5m
        // retryDelay: 5_000,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  }); // create client

  const router = createBrowserRouter([
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/products",
      Component: Products,
    },
  ]);

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />

      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        draggable
        newestOnTop
        pauseOnHover
        stacked
      />
    </QueryClientProvider>
  );
};

export default App;
