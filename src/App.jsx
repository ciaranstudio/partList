import * as React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { authProvider } from "./auth";
import "./index.css";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./errorPage";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";
import LoginPage, {
  loader as loginLoader,
  action as loginAction,
} from "./routes/login";
import CanvasLayout, { loader as canvasLoader } from "./routes/canvas";
import debugControls from "./debugControls";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CanvasLayout hideDebug={true} perfVisible={debugControls.perfVisible} />
    ),
    errorElement: <ErrorPage />,
    loader: canvasLoader,
  },
  {
    path: "/debug",
    element: (
      <CanvasLayout hideDebug={false} perfVisible={debugControls.perfVisible} />
    ),
    errorElement: <ErrorPage />,
    loader: canvasLoader,
  },
  {
    id: "root",
    path: "/admin",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
  {
    path: "/login",
    action: loginAction,
    loader: loginLoader,
    Component: LoginPage,
  },
  {
    path: "/logout",
    async action() {
      await authProvider.signout();
      return redirect("/");
    },
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider
        router={router}
        fallbackElement={
          <div id="initialLoad">
            <div className="loader"></div>
          </div>
        }
      />
    </>
  );
}
