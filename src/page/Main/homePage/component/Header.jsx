/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import request from "../../../../utils/request";
import { getUser, logoutUserAsync } from "../../../../slice/authSlice";
import { Person } from "@mui/icons-material";

const Header = ({ setIsLoading, setIsLogin, isLogin, setStudentTopic }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const [anchorElRegister, setAnchorElRegister] = useState(null);
  const openRegister = Boolean(anchorElRegister);
  const { auth } = useSelector((state) => state.auth);
  console.log(auth);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await request.post("/api/auth/profile");
        dispatch(getUser(res?.data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickRegister = (event) => {
    setAnchorElRegister(event.currentTarget);
    navigate("/register-topics");
  };
  const handleCloseRegisterStudent = () => {
    setStudentTopic(true);
    setAnchorElRegister(null);
  };
  const handleCloseRegisterTeacher = () => {
    setStudentTopic(false);
    setAnchorElRegister(null);
  };
  const handleLogout = async () => {
    setIsLoading(true);
    await dispatch(logoutUserAsync());
    localStorage.removeItem("token");
    navigate("/login");
    setIsLogin(false);
  };
  return (
    <>
      {" "}
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            onClick={() => navigate("/")}
          >
            <div className="flex items-center">
              <img src="/public/Group-134.png" alt="" className="w-[50px]" />
              <span className="text-base ml-3">
                Trường Đại học Tài chính - Ngân hàng Hà Nội
              </span>
            </div>
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{ color: "#fff", margin: " 0 16px" }}
              onClick={() => navigate("/")}
            >
              Trang chủ
            </Button>
            <div>
              <Button
                sx={{ color: "#fff", margin: " 0 16px" }}
                onClick={handleClickRegister}
              >
                Đăng ký đề tài
              </Button>
              <Menu
                anchorEl={anchorElRegister}
                open={openRegister}
                onClose={handleCloseRegisterStudent}
              >
                <MenuItem onClick={handleCloseRegisterStudent}>
                  Đề tài sinh viên
                </MenuItem>
                <MenuItem onClick={handleCloseRegisterTeacher}>
                  Đề tài giảng viên
                </MenuItem>
              </Menu>
            </div>
            {isLogin && (
              <div>
                <Button
                  sx={{ color: "#fff", margin: " 0 16px" }}
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <div className="flex items-center">
                    <Person sx={{ fontSize: "25px", color: "#fff" }} />
                    <span className="ml-3">{auth?.fullName}</span>
                  </div>
                </Button>
                <Menu
                  id="basic-menu"
                  sx={{ width: "400px" }}
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
                  {auth?.username === "admin" && (
                    <MenuItem>
                      <a href="http://localhost:5173/update-user">
                        Trang quản trị
                      </a>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
              </div>
            )}
            {!isLogin && (
              <Button
                onClick={() => navigate("/login")}
                sx={{ color: "#fff", margin: " 0 16px" }}
              >
                Đăng nhập
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
