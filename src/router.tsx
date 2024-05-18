import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: AppRoutes.CATS,
    element: <App />,
  },
  {
    path: "*",
    element: <div>Not found</div>,
  },
]);
