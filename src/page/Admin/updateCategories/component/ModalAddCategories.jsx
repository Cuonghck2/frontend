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
import request from "../../../../utils/request";

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

const ModalAddCategories = ({
  openModalAdd,
  handleAddCategories,
  handleCancelAddCategories,
  emtyError,
}) => {
  const [formData, setFormData] = useState({
    idCategories: "",
    nameCategories: "",
  });

  const { idCategories, nameCategories } = formData;
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
          Thêm danh mục
        </Typography>
        {emtyError && (
          <span style={{ marginBottom: "15px", color: "red" }}>
            Vui lòng nhập đầy đủ thông tin*
          </span>
        )}
        <div className="flex items-center my-3">
          <div className="mx-4">
            <TextField
              name="idCategories"
              onChange={handleChange}
              value={idCategories}
              sx={{ margin: "16px 0 16px 0", width: "100%" }}
              id="outlined-basic"
              label="Mã danh mục"
              variant="outlined"
            />
            <TextField
              name="nameCategories"
              onChange={handleChange}
              value={nameCategories}
              sx={{ margin: "16px 0 16px 0", width: "100%" }}
              id="outlined-basic"
              label="Tên danh mục"
              variant="outlined"
            />
          </div>
        </div>
        <Button
          variant="text"
          sx={{ margin: "24px 0", float: "right" }}
          onClick={handleCancelAddCategories}
        >
          Hủy Bỏ
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "24px 12px", float: "right" }}
          onClick={() => handleAddCategories(formData)}
        >
          Thêm
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalAddCategories;
