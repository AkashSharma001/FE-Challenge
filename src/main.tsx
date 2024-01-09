import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CircularProgress } from "@mui/joy";
import App from "./App.tsx";
import "./index.css";


const Home = lazy(() => import("./views/Home/Home.tsx"));
const Inventory = lazy(() => import("./views/Inventory/Inventory.tsx"));
const AnalysisPage = lazy(() => import("./views/Analysis/Analysis.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/analysis/:MODEL_NAME",
        element: <AnalysisPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-screen h-screen">
          <CircularProgress variant="solid" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
