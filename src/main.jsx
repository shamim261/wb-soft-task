import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "aos/dist/aos.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicProvider from "./ContextAPIs/BasicProvider.jsx";
import { CartProvider } from "./ContextAPIs/CartContext.jsx";
import OrderProvider from "./ContextAPIs/OrderProvider";
import "./index.css";
import Router from "./Router/Router.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <OrderProvider>
          <BasicProvider>
            <RouterProvider router={Router} />
          </BasicProvider>
        </OrderProvider>
      </CartProvider>
    </QueryClientProvider>
  </>
);
