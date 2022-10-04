import { Home } from "../components/pages/Home";
import { Exercises } from "../components/pages/Exercises";
import { NewRepetitions } from "../components/pages/NewRepetitions";
import { EditExercise } from "../components/pages/EditExercise";
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
    path: "/repetitions/new",
    exact: false,
    children: <NewRepetitions />,
  },
  {
    path: "/exercise/edit",
    exact: false,
    children: <EditExercise />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
