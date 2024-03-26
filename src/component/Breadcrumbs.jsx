import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  let crumbLink = "";
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <Breadcrumbs>
      <Link color="inherit" to="/admin">
        Home
      </Link>
      {pathnames.map((crumb, index) => {
        crumbLink += `/${crumb}`;
        return (
          <Link to={crumbLink} key={index}>
            {crumb}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
