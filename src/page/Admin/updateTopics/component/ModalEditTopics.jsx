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
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateField } from "@mui/x-date-pickers";

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

const ModalEditTopics = ({
  openModalEdit,
  handleEditTopics,
  handleCancelEditTopics,
  modalData,
}) => {
  const [selectLeader, setSelectLeader] = useState([]);
  const [selectResult, setSelectResult] = useState([]);
  const [selectGrade, setSelectGrade] = useState([]);
  const [selectLevel, setSelectLevel] = useState([]);
  const [formData, setFormData] = useState({
    idTopic: "",
    idLeader: "",
    nameTopic: "",
    timeStart: "",
    timeEnd: "",
    typeTopic: "",
    idResult: "",
    idGrade: "",
    idLevel: "",
  });
  useEffect(() => {
    // handle update data
    if (modalData) {
      setFormData({
        idTopic: modalData?.idTopic,
        idLeader: modalData?.idLeader,
        nameTopic: modalData?.nameTopic,
        timeStart: modalData?.timeStart,
        timeEnd: modalData?.timeEnd,
        typeTopic: modalData?.typeTopic,
        idResult: modalData?.idResult,
        idGrade: modalData?.idGrade,
        idLevel: modalData?.idLevel,
      });
    }
  }, [modalData]);
  const {
    idTopic,
    idLeader,
    nameTopic,
    timeStart,
    timeEnd,
    typeTopic,
    idResult,
    idGrade,
    idLevel,
  } = formData;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request("/api/topicLeader");
        setSelectLeader(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request("/api/result");
        setSelectResult(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request("/api/awardGrade");
        setSelectGrade(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request("/api/awardLevel");
        setSelectLevel(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleChangeTimeStart = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      timeStart: date,
    }));
  };

  const handleChangeTimeEnd = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      timeEnd: date,
    }));
  };
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
          Sửa đề tài
        </Typography>
        <div className="flex flex-col items-center justify-center my-3">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <TextField
                name="idTopic"
                onChange={handleChange}
                value={idTopic}
                sx={{ margin: "16px 0 16px 0", width: "100%" }}
                id="outlined-basic"
                label="Mã đề tài"
                variant="outlined"
              />
              <FormControl sx={{ width: "100%", margin: "16px 0" }}>
                <InputLabel id="demo-simple-select-label">
                  Tên chủ nhiệm
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idLeader}
                  label="Kết quả"
                  onChange={handleChange}
                  name="idLeader"
                >
                  {selectLeader?.map((item) => (
                    <MenuItem key={item?.idLeader} value={item?.idLeader}>
                      {item?.nameLeader}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{
                    margin: "16px 0 16px 0",
                  }}
                  components={["DateField"]}
                >
                  <DateField
                    onChange={handleChangeTimeStart}
                    sx={{ width: "1000px" }}
                    label="Ngày bắt đầu"
                    value={dayjs(timeStart)}
                    format="DD/MM/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div>
              <TextField
                name="nameTopic"
                onChange={handleChange}
                value={nameTopic}
                sx={{ margin: "16px 0 16px 0", width: "100%" }}
                id="outlined-basic"
                label="Tên đề tài"
                variant="outlined"
              />
              <FormControl sx={{ width: "100%", margin: "16px 0" }}>
                <InputLabel id="demo-simple-select-label">
                  Loại đề tài
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={typeTopic}
                  label="Loại đề tài"
                  onChange={handleChange}
                  name="typeTopic"
                >
                  <MenuItem value={"Sinh viên"}>Sinh viên</MenuItem>
                  <MenuItem value={"Giảng viên"}>Giảng viên</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{
                    width: "100%",
                    margin: "16px 0 16px 0",
                  }}
                  components={["DateField"]}
                >
                  <DateField
                    onChange={handleChangeTimeEnd}
                    value={dayjs(timeEnd)}
                    format="DD/MM/YYYY"
                    sx={{ width: "1000px" }}
                    label="Ngày kết thúc"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full mt-5">
            <div>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Kết quả</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idResult}
                  label="Kết quả"
                  onChange={handleChange}
                  name="idResult"
                >
                  {selectResult?.map((item) => (
                    <MenuItem key={item?.idResult} value={item?.idResult}>
                      {item?.nameResult}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">
                Cấp giải thưởng
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={idGrade}
                label="Kết quả"
                onChange={handleChange}
                name="idGrade"
              >
                {selectGrade?.map((item) => (
                  <MenuItem key={item?.idGrade} value={item?.idGrade}>
                    {item?.nameGrade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">
                Mức giải thưởng
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={idLevel}
                label="Kết quả"
                onChange={handleChange}
                name="idLevel"
              >
                {selectLevel?.map((item) => (
                  <MenuItem key={item?.idLevel} value={item?.idLevel}>
                    {item?.nameLevel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <Button
          variant="text"
          sx={{ margin: "24px 0", float: "right" }}
          onClick={handleCancelEditTopics}
        >
          Hủy Bỏ
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "24px 12px", float: "right" }}
          onClick={() => handleEditTopics(formData)}
        >
          Cập nhật
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalEditTopics;
