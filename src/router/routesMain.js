import routes from "../config/routes";
import Admin from "../page/adminPage/admin";

const publicRoutes = [
  {
    path: routes.home,
    component: Home,
  },
  {
    path: routes.profiles,
    component: Profiles,
  },
  {
    path: routes.search,
    component: Search,
  },
];

const privateRoutes = [
  {
    path: routes.admin,
    component: Admin,
  },
];

export { publicRoutes, privateRoutes };
