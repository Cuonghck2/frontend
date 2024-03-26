import { Lock } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../../../slice/authSlice";

const LoginPage = () => {
  const [errorLogin, setErrorLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });
  const [emptyError, setEmptyError] = useState(false);
  const dispatch = useDispatch();
  const { username, password } = formLogin;

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setFormLogin((prevFormLogin) => ({
      ...prevFormLogin,
      [name]: value,
    }));
  };
  const handleLogin = async () => {
    if (!username || !password) {
      setEmptyError(true);
      return;
    } else {
      setEmptyError(false);
      setErrorLogin(false);
      setIsLoading(true);
      const res = await dispatch(loginUserAsync(formLogin));

      setIsLoading(false);

      if (res.payload.status === "success") {
        localStorage.setItem("token", res?.payload?.data?.token);
        navigate("/");
      } else {
        setErrorLogin(true);
      }
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {isLoading && (
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            color: "#fff",
          }}
          open={true}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        </Backdrop>
      )}
      <Box
        sx={{
          width: "400px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar sx={{ p: 3, bgcolor: "#9c27b0" }}>
            <Lock sx={{ fontSize: "25px", color: "#fff" }} />
          </Avatar>
        </Box>
        <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
          Đăng nhập
        </Typography>
        {emptyError && (
          <Typography sx={{ color: "red", textAlign: "start" }}>
            Vui lòng nhập đầy đủ thông tin*
          </Typography>
        )}
        {errorLogin && !emptyError && (
          <Typography sx={{ color: "red", textAlign: "start" }}>
            Tài khoản hoặc mật khẩu không chính xác*
          </Typography>
        )}
        <TextField
          onChange={handleChangeLogin}
          name="username"
          value={username}
          sx={{ width: "100%", marginTop: "20px" }}
          label="Tài khoản"
        />
        <TextField
          onChange={handleChangeLogin}
          name="password"
          value={password}
          sx={{ width: "100%", marginTop: "20px" }}
          label="Mật khẩu"
          type="password"
        />
        <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
          <Box onClick={() => navigate("/signup")} sx={{ display: "flex" }}>
            Bạn chưa có tài khoản?{" "}
            <span className="text-[#9c27b0] text-lg font-medium hover:cursor-pointer">
              Đăng ký
            </span>
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{ width: "100%", marginTop: "20px" }}
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
        <span
          className="text-[#9c27b0] text-lg font-normal hover:cursor-pointer mt-2 float-right"
          onClick={() => navigate("/")}
        >
          Quay lại trang chủ
        </span>
      </Box>
    </>
  );
};

export default LoginPage;
