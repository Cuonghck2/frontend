import routeAdmin from "../config/routeAdmin";
import HomeAdmin from "../page/Admin/home/HomeAdmin";
import updateUser from "../page/Admin/updateUser/updateUser";
import UpdateCategories from "../page/Admin/UpdateCategories/UpdateCategories";
import UpdateTopic from "../page/Admin/updateTopic/UpdateTopic";
import Report from "../page/Admin/report/Report";

const routesAdmin = [
  {
    path: routeAdmin.home,
    component: HomeAdmin,
  },
  {
    path: routeAdmin.updateUser,
    component: updateUser,
  },
  {
    path: routeAdmin.updateCategories,
    component: UpdateCategories,
  },
  {
    path: routeAdmin.updateTopic,
    component: UpdateTopic,
  },
  {
    path: routeAdmin.report,
    component: Report,
  },
];

export default routesAdmin;
