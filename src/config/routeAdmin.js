const routeAdmin = {
  updateUser: "/update-user",
  updateCategories: "/update-categories",
  updateTopic: "/update-topic",
  updateLeader: {
    path: "/update-leader",
    children: {
      member: "members/:id",
    },
  },
  report: "/report",
  dashboard: "/dashboard",
};
export default routeAdmin;
