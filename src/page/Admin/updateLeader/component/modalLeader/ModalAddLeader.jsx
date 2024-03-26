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

const ModalAddLeader = ({
  openModalAdd,
  handleAddLeader,
  handleCancelAddLeader,
  emtyError,
}) => {
  const [selectUnit, setSelectUnit] = useState([]);
  const [formData, setFormData] = useState({
    idLeader: "",
    nameLeader: "",
    idUnit: "",
  });

  const { idLeader, nameLeader, idUnit } = formData;
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
      open={openModalAdd}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={styleModal}>
        <Typography variant="h5" sx={{ marginBottom: "15px" }}>
          Thêm chủ nhiệm đề tài
        </Typography>
        {emtyError && (
          <span style={{ marginBottom: "15px", color: "red" }}>
            Vui lòng nhập đầy đủ thông tin*
          </span>
        )}
        <div className="flex items-center my-3">
          <div className="mx-4">
            <TextField
              name="idLeader"
              onChange={handleChange}
              value={idLeader}
              sx={{ margin: "16px 0 16px 0", width: "100%" }}
              id="outlined-basic"
              label="Mã chủ nhiệm"
              variant="outlined"
            />
            <TextField
              name="nameLeader"
              onChange={handleChange}
              value={nameLeader}
              sx={{ margin: "16px 0 16px 0", width: "100%" }}
              id="outlined-basic"
              label="Tên chủ nhiệm"
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
          </div>
        </div>
        <Button
          variant="text"
          sx={{ margin: "24px 0", float: "right" }}
          onClick={handleCancelAddLeader}
        >
          Hủy Bỏ
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "24px 12px", float: "right" }}
          onClick={() => handleAddLeader(formData)}
        >
          Thêm
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalAddLeader;
