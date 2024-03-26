/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
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
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import request from "../../../../../utils/request";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#fff",
  boxShadow: 24,
  borderRadius: "12px",
  padding: 4,
};
const ModalAddUser = ({
  openModaAdd,
  onCloseModalAdd,
  emtyError,
  handleAddUser,
}) => {
  const dispatch = useDispatch();
  const [selectUnit, setSelectUnit] = useState([]);
  const [formData, setFormData] = useState({
    idUser: "",
    fullName: "",
    username: "",
    password: "",
    password_confirmation: "",
    idUnit: "",
  });
  const {
    idUser,
    fullName,
    username,
    password,
    password_confirmation,
    idUnit,
  } = formData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
  return (
    <Modal
      onClose={onCloseModalAdd}
      keepMounted
      open={openModaAdd}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={styleModal}>
        <Typography variant="h5">Thêm người dùng</Typography>
        {emtyError && (
          <span className="my-5 text-red-500">
            Vui lòng nhập đầy đủ thông tin*
          </span>
        )}
        <TextField
          onChange={handleChange}
          value={idUser}
          name="idUser"
          sx={{ margin: "16px 0", width: "100%" }}
          id="outlined-basic"
          label="Mã người dùng"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          value={fullName}
          name="fullName"
          sx={{ margin: "12px 0", width: "100%" }}
          id="outlined-basic"
          label="Họ và tên"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          value={username}
          name="username"
          sx={{ margin: "12px 0", width: "100%" }}
          id="outlined-basic"
          label="Tài khoản"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          value={password}
          name="password"
          sx={{ margin: "12px 0", width: "100%" }}
          type="password"
          id="outlined-basic"
          label="Mật khẩu"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          value={password_confirmation}
          name="password_confirmation"
          sx={{ margin: "12px 0", width: "100%" }}
          type="password"
          id="outlined-basic"
          label="Xác nhận mật khẩu"
          variant="outlined"
        />
        <FormControl sx={{ width: "100%" }}>
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
        <Button
          variant="text"
          sx={{ margin: "24px 0", float: "right" }}
          onClick={onCloseModalAdd}
        >
          Hủy Bỏ
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "24px 12px", float: "right" }}
          onClick={() => {
            handleAddUser(formData);
          }}
        >
          Thêm
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalAddUser;
