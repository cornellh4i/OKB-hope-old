import {createBrowserRouter} from "react-router-dom";
import React from "react";
import NotFoundError from "./NotFoundError";
import HomeView from "../src/Views/HomeView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
    errorElement: <NotFoundError />
  },
]);
