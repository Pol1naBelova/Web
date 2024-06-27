import { RouteObject, useRoutes } from "react-router-dom";
import Misha from '../../pages/Misha/Misha';
import Karen from '../../pages/Karen/Karen';
import Maks from '../../pages/Maks/Maks';
import Table from "../../pages/Table/Table";
import { AUTH_ROUTE, KAREN_ROUTE, MASK_ROUTE, TABLE, MISHA_ROUTE } from "./config.ts";
import ProfilePage from "../../pages/Profile";

const MainRouter = ({ isAuth = false }) => {
  const basePath: RouteObject[] = [
    { path: MASK_ROUTE, element: <Maks /> },
    { path: AUTH_ROUTE, element: <ProfilePage /> },
  ];
  const authPath: RouteObject[] = [
    { path: MISHA_ROUTE, element: <Misha /> },
    { path: KAREN_ROUTE, element: <Karen /> },
    { path: TABLE, element: <Table /> },
  ];

  const resultPaths: RouteObject[] = basePath;

  if (isAuth) {
    resultPaths.push(...authPath);
  } else {
    resultPaths.push({ path: "*", element: <ProfilePage /> });
  }

  return useRoutes(resultPaths);
};

export default MainRouter;
