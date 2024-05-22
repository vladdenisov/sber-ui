import { RouteObject, createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/main";
import { ChatPage } from "../pages/chat/chat.page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: ":id", element: <ChatPage /> }],
  },
];

export const router = createBrowserRouter(routes);
