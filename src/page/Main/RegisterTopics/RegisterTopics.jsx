/* eslint-disable no-unused-vars */
import React from "react";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Person, LibraryBooks } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import request from "../../../utils/request";
import { logoutUserAsync } from "../../../slice/authSlice";
import Header from "../homePage/component/Header";

const RegisterTopics = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [selectUnit, setSelectUnit] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [studentTopic, setStudentTopic] = useState(true);

  const [formData, setFormData] = useState({
    idLeader: "",
    nameLeader: "",
    idUnit: "",
  });

  const { idLeader, nameLeader, idUnit } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

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
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header
          setIsLoading={setIsLoading}
          setIsLogin={setIsLogin}
          isLogin={isLogin}
          setStudentTopic={setStudentTopic}
        />
      </Box>
      {studentTopic && (
        <>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", marginTop: "100px" }}
          >
            Đăng ký đề tài sinh viên
          </Typography>
          <Box sx={{ width: "100%", maxWidth: 800, margin: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="nameTopics"
                  label="Tên đề tài"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="fullName"
                  label="Họ và tên chủ nhiệm"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="standard" sx={{ width: "100%" }}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Loại</InputLabel>
                  <Select
                    name="type"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Loại"
                    required
                  >
                    <MenuItem value={"Sinh viên"}>Sinh viên</MenuItem>
                    <MenuItem value={"Giảng viên"}>Giảng viên</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="class"
                  fullWidth
                  required
                  variant="standard"
                  label="Lớp"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="year"
                  fullWidth
                  required
                  variant="standard"
                  label="Năm"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="numberPhone"
                  fullWidth
                  required
                  variant="standard"
                  label="Số điện thoại"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  fullWidth
                  required
                  variant="standard"
                  label="Email"
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{ width: "100%", marginTop: "40px" }}
            >
              Đăng ký
            </Button>
          </Box>
        </>
      )}
      {!studentTopic && (
        <>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", marginTop: "100px" }}
          >
            Đăng ký đề tài giảng viên
          </Typography>
          <Box sx={{ width: "100%", maxWidth: 800, margin: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="nameTopics"
                  label="Tên đề tài"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="fullName"
                  label="Họ và tên chủ nhiệm"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="standard" sx={{ width: "100%" }}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Loại</InputLabel>
                  <Select
                    name="type"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Loại"
                    required
                  >
                    <MenuItem value={"Sinh viên"}>Sinh viên</MenuItem>
                    <MenuItem value={"Giảng viên"}>Giảng viên</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="class"
                  fullWidth
                  required
                  variant="standard"
                  label="Chức vụ"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="year"
                  fullWidth
                  required
                  variant="standard"
                  label="Năm"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="numberPhone"
                  fullWidth
                  required
                  variant="standard"
                  label="Số điện thoại"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  fullWidth
                  required
                  variant="standard"
                  label="Email"
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{ width: "100%", marginTop: "40px" }}
            >
              Đăng ký
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default RegisterTopics;
