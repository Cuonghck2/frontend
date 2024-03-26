import routes from "../config/routeMain";
import SignUpPage from "../page/Main/Auth/SignUpPage";
import LoginPage from "../page/Main/Auth/LoginPage";
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
  {
    path: routes.signup,
    component: SignUpPage,
  },
];

export { publicRoutes };
