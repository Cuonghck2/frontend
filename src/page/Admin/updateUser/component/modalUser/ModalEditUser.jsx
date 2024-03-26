/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
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
import request from "../../../../../utils/request";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

const ModalEditUser = ({
  openModalEdit,
  handleEditUser,
  handleCancelEditUser,
  modalData,
}) => {
  const [selectUnit, setSelectUnit] = useState([]);
  const [formData, setFormData] = useState({
    idUser: "",
    fullName: "",
    username: "",
    idUnit: "",
  });
  const { idUser, fullName, username, idUnit } = formData;
  useEffect(() => {
    // handle update data
    if (modalData) {
      setFormData({
        idUser: modalData?.idUser,
        fullName: modalData?.fullName,
        username: modalData?.username,
        idUnit: modalData?.idUnit,
      });
    }
  }, [modalData]);

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Modal
      keepMounted
      open={openModalEdit}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={styleModal}>
        <Typography variant="h5" sx={{ marginBottom: "15px" }}>
          Sửa thông tin người dùng
        </Typography>
        <div className="flex items-center my-3">
          <div className="mx-4">
            <TextField
              name="idTopic"
              onChange={handleChange}
              value={idUser}
              sx={{ margin: "16px 0 16px 0", width: "100%" }}
              id="outlined-basic"
              label="Mã người dùng"
              variant="outlined"
            />
            <TextField
              name="fullName"
              onChange={handleChange}
              value={fullName}
              sx={{ margin: "16px 0 16px 0", width: "100%" }}
              id="outlined-basic"
              label="Họ và tên"
              variant="outlined"
            />
            <TextField
              name="username"
              onChange={handleChange}
              value={username}
              sx={{ margin: "16px 0 16px 0", width: "100%" }}
              id="outlined-basic"
              label="Tài khoản"
              variant="outlined"
            />
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">Kết quả</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={idUnit}
                label="Kết quả"
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
        <Button
          variant="text"
          sx={{ margin: "24px 0", float: "right" }}
          onClick={handleCancelEditUser}
        >
          Hủy Bỏ
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "24px 12px", float: "right" }}
          onClick={() => handleEditUser(formData)}
        >
          Cập nhật
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalEditUser;
