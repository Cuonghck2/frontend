/* eslint-disable no-unused-vars */
import { Notifications, Person } from "@mui/icons-material";
import { Avatar, Badge, Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../../component/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUserAsync } from "../../../../slice/authSlice";
import request from "../../../../utils/request";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.post("/api/auth/profile");
        console.log(res?.data);
        dispatch(getUser(res?.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);
  const handleLogout = async () => {
    await dispatch(logoutUserAsync());
    localStorage.removeItem("token");
  };
  return (
    <div className=" flex justify-between items-center mb-[24px] h-[77.6px] py-3 px-[26px] shadow-sm">
      <Breadcrumb />
      <div className="flex justify-center items-center">
        <div>
          <Button
            sx={{ color: "#000", margin: " 0 16px" }}
            id="basic-button"
            aria-controls={open ? "basic-admin" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <div className="flex items-center">
              <Avatar alt="avatar" src="public/images.jfif" />
              <span className="ml-3">{auth?.fullName}</span>
            </div>
          </Button>
          <Menu
            id="basic-admin"
            sx={{ width: "200px" }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleLogout}>
              <a href="http://localhost:5173/">Đăng xuất</a>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
