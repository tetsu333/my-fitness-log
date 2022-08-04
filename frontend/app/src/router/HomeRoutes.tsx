import { Home } from "../components/pages/Home";
import { Exercises } from "../components/pages/Exercises";
import { Repetitions } from "../components/pages/Repetitions";
import { Page404 } from "../components/pages/Page404";

export const homeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />,
  },
  {
    path: "/exercises",
    exact: false,
    children: <Exercises />,
  },
  {
    path: "/repetitions",
    exact: false,
    children: <Repetitions />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
