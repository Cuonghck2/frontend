import routes from "../config/routeMain";
import LoginPage from "../page/Main/Login/LoginPage";
import RegisterTopics from "../page/Main/RegisterTopics/RegisterTopics";
import HomePage from "../page/Main/homePage/HomePage";

const publicRoutes = [
  {
    path: routes.home,
    component: HomePage,
  },
  {
    path: routes.registerTopics,
    component: RegisterTopics,
  },
  {
    path: routes.login,
    component: LoginPage,
  },
];

export { publicRoutes };
