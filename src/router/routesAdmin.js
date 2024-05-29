import routeAdmin from "../config/routeAdmin";
import updateUser from "../page/Admin/updateUser/updateUser";
import UpdateCategories from "../page/Admin/UpdateCategories/UpdateCategories";
import UpdateLeader from "../page/Admin/updateLeader/UpdateLeader";
import Report from "../page/Admin/report/Report";
import UpdateTopics from "../page/Admin/updateTopics/updateTopics";
import Member from "../page/Admin/updateLeader/members/Member";
import updateFile from "../page/Admin/updateFile/updateFile";
import Documents from "../page/Admin/updateFile/document/documents";
import DashBoard from "../page/Admin/home/Dashboard";

const routesAdmin = [
  {
    path: routeAdmin.dashboard,
    component: DashBoard,
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
    component: UpdateTopics,
  },
  {
    path: routeAdmin.updateFile.path,
    component: updateFile,
  },
  {
    path: `${routeAdmin.updateFile.path}/${routeAdmin.updateFile.children.document}`,
    component: Documents,
  },
  {
    path: routeAdmin.report,
    component: Report,
  },
  {
    path: routeAdmin.updateLeader.path,
    component: UpdateLeader,
  },
  {
    path: `${routeAdmin.updateLeader.path}/${routeAdmin.updateLeader.children.member}`,
    component: Member,
  },
];

export default routesAdmin;
