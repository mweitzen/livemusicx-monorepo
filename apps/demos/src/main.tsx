import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppLayout } from "./layout";
import { ErrorPage } from "./error-page";

import { AppDashboard } from "./app";
import { BulkUploadPage } from "./bulk-upload";
import { GoogleMapsPage } from "./google-maps";
import { ShareEventsPage } from "./share-events";
import { ImageUploadPage } from "./image-upload";
import { MessagesDemoPage } from "./messages";
import { EventCreationPage } from "./event-creation";
import { BulletinBoardPage } from "./bulletin-board";
import { AccountCreationPage } from "./account-creation";
import { AffiliationManagementPage } from "./affiliation-management";
import { BlankPage } from "./__blank-page";

export const routes = [
  {
    path: "/blank",
    name: "Blank Page",
    element: <BlankPage />,
  },
  {
    path: "/google-maps",
    name: "Google Maps",
    element: <GoogleMapsPage />,
  },
  {
    path: "/bulk-upload",
    name: "Bulk Upload",
    element: <BulkUploadPage />,
  },
  {
    path: "/image-upload",
    name: "Image Upload",
    element: <ImageUploadPage />,
  },
  {
    path: "/event-creation",
    name: "Event Creation",
    element: <EventCreationPage />,
  },
  {
    path: "/account-creation",
    name: "Account Creation",
    element: <AccountCreationPage />,
  },
  {
    path: "/bulletin-board",
    name: "Bulletin Board",
    element: <BulletinBoardPage />,
  },
  {
    path: "/share-events",
    name: "Share Events",
    element: <ShareEventsPage />,
  },
  {
    path: "/affiliation-management",
    name: "Affiliation Management",
    element: <AffiliationManagementPage />,
  },
  {
    path: "/messages",
    name: "Messages",
    element: <MessagesDemoPage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AppDashboard />,
      },
      ...routes.map((route) => ({
        path: route.path,
        element: route.element,
      })),
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
