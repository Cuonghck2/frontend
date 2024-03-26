import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUserAsync } from "../../../slice/authSlice";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Lock } from "@mui/icons-material";
import request from "../../../utils/request";

const SignUpPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectUnit, setSelectUnit] = useState([]);
  const [formData, setFormData] = useState({
    idUser: "",
    fullName: "",
    username: "",
    password: "",
    password_confirmation: "",
    idUnit: "",
  });
  const [emptyError, setEmptyError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    idUser,
    fullName,
    username,
    password,
    password_confirmation,
    idUnit,
  } = formData;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request("/api/units");
        setSelectUnit(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSignUp = () => {
    const dataUsers = {
      idUser,
      fullName,
      username,
      password,
      password_confirmation,
      idUnit,
    };
    if (
      !idUser ||
      !fullName ||
      !username ||
      !password ||
      !password_confirmation ||
      !idUnit
    ) {
      setEmptyError("Vui lòng nhập đầy đủ thông tin*");
    } else {
      setFormData({
        idUser: "",
        fullName: "",
        username: "",
        password: "",
        password_confirmation: "",
        idUnit: "",
      });
      dispatch(signUserAsync(dataUsers));
      setIsSignUp(true);
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "600px",
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
          Đăng ký thành viên
        </Typography>
        {emptyError && <span className="pt-8 text-red-500">{emptyError}</span>}
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <TextField
              onChange={handleChange}
              value={idUser}
              name="idUser"
              sx={{ width: "100%", marginTop: "20px" }}
              label="Mã người dùng"
            />
            <TextField
              onChange={handleChange}
              value={fullName}
              name="fullName"
              sx={{ width: "100%", marginTop: "20px" }}
              label="Họ và tên"
            />
            <TextField
              onChange={handleChange}
              value={username}
              name="username"
              sx={{ width: "100%", marginTop: "20px" }}
              label="Tên người dùng"
            />
          </div>
          <div>
            <TextField
              onChange={handleChange}
              value={password}
              name="password"
              sx={{ width: "100%", marginTop: "20px" }}
              label="Mật khẩu"
              type="password"
            />
            <TextField
              onChange={handleChange}
              value={password_confirmation}
              name="password_confirmation"
              sx={{ width: "100%", marginTop: "20px" }}
              label="Xác nhận mật khẩu"
              type="password"
            />
            <FormControl sx={{ width: "100%", marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">Đơn vị</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={idUnit}
                label="Đơn vị"
                onChange={handleChange}
                name="idUnit"
              >
                {selectUnit?.map((item) => (
                  <MenuItem key={item?.idUnit} value={item?.idUnit}>
                    {item?.nameUnit}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <Box sx={{ mt: 2, float: "right" }}>
          Bạn đã có tài khoản?{" "}
          <span
            className="text-[#9c27b0] text-lg font-medium hover:cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </span>
        </Box>
        <Button
          variant="contained"
          sx={{ width: "100%", marginTop: "20px" }}
          onClick={handleSignUp}
        >
          Đăng ký
        </Button>
        <span
          className="text-[#9c27b0] text-lg font-normal hover:cursor-pointer mt-2 float-right"
          onClick={() => navigate("/login")}
        >
          Quay lại trang chủ
        </span>
      </Box>
      <Modal
        sx={{
          "& .Mui-focusVisible": {
            outline: "none",
          },
        }}
        onClose={() => setIsSignUp(false)}
        keepMounted
        open={isSignUp}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#fff",
            boxShadow: 24,
            borderRadius: "12px",
            border: "none",
            padding: 4,
          }}
        >
          <div className="flex flex-col items-center">
            <Typography
              variant="h5"
              sx={{
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              Đăng ký thành công
            </Typography>
            <Button
              variant="contained"
              sx={{ margin: "24px 0" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SignUpPage;
