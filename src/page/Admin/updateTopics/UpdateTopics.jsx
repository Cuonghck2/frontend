/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import {
  StyleTableCell,
  StyledTableRow,
} from "../../../Layouts/adminLayouts/component/customMUI/customMUI";
import { useDispatch, useSelector } from "react-redux";
import ModalAddTopics from "./component/modalAddTopics";
import request from "../../../utils/request";
import {
  addTopicsAsync,
  deleteTopicsAsync,
  listTopics,
  updateTopicsAsync,
} from "../../../slice/topicsSlice";
import ModalEditTopics from "./component/ModalEditTopics";
import dayjs from "dayjs";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const UpdateTopics = () => {
  const { topics } = useSelector((state) => state.topics);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [typeSearch, setTypeSearch] = useState("");
  const [emtyError, setEmtyError] = useState(false);
  const [dataTopics, setDataTopics] = useState([]);
  const [modalData, setModalData] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selecIdTopic, setSelecIdTopic] = useState(null);

  const dispatch = useDispatch();
  //getTopics
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await request("/api/topics");
      dispatch(listTopics(res?.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(topics);

  useEffect(() => {
    fetchData();
  }, []);

  //search
  useEffect(() => {
    if (typeSearch === "Mã đề tài") {
      setDataTopics(
        topics.filter((topic) => topic?.idTopic.includes(searchValue))
      );
    } else if (typeSearch === "Tên đề tài") {
      setDataTopics(
        topics.filter((topic) => topic?.nameTopic.includes(searchValue))
      );
    } else {
      setDataTopics(topics);
    }
  }, [topics, searchValue, typeSearch]);

  //addTopics
  const handleAddTopics = (data) => {
    const { idTopic, nameTopic, timeStart, timeEnd } = data;
    if (!idTopic || !nameTopic) {
      setEmtyError(true);
    } else {
      dispatch(addTopicsAsync(data));
      setOpenModalAdd(false);
    }
  };

  //edit topics
  const handleEditTopics = (data) => {
    dispatch(updateTopicsAsync(data));
    setOpenModalEdit(false);
  };

  //delete topics
  const handleDeleteTopics = () => {
    dispatch(deleteTopicsAsync(selecIdTopic));
    setConfirmDel(false);
  };

  //pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeType = (event) => {
    setTypeSearch(event.target.value);
  };

  //view modal
  const handleOpenModalAdd = () => {
    setOpenModalAdd(true);
  };
  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };
  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
  };
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };
  const handleConfirmDel = () => {
    setConfirmDel(true);
  };
  const handleCancelDel = () => {
    setConfirmDel(false);
  };
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
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpenModalAdd}
      >
        Thêm
      </Button>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 300,
          float: "right",
          marginBottom: "16px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, p: "6px" }}
          placeholder="Nhập từ khóa để tìm kiếm"
          inputProps={{ "aria-label": "search" }}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </Paper>
      <FormControl size="small" sx={{ m: 1, minWidth: 200, float: "right" }}>
        <InputLabel id="demo-simple-select-label">Tìm Kiếm</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={typeSearch}
          label="Tìm kiếm"
          onChange={handleChangeType}
        >
          <MenuItem value={"Mã đề tài"}>Mã đề tài</MenuItem>
          <MenuItem value={"Tên đề tài"}>Tên đề tài</MenuItem>
        </Select>
      </FormControl>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
          <Table stickyHeader aria-label="custom-table">
            <TableHead>
              <TableRow>
                <StyleTableCell align="center">Mã đề tài</StyleTableCell>
                <StyleTableCell align="center">Tên chủ nhiệm</StyleTableCell>
                <StyleTableCell align="center">Tên đề tài</StyleTableCell>
                <StyleTableCell align="center">
                  Thời gian bắt đầu
                </StyleTableCell>
                <StyleTableCell align="center">
                  Thời gian kết thúc
                </StyleTableCell>
                <StyleTableCell align="center">Loại đề tài</StyleTableCell>
                <StyleTableCell align="center">
                  Kết quả nghiệm thu
                </StyleTableCell>
                <StyleTableCell align="center">Cấp giải thưởng</StyleTableCell>
                <StyleTableCell align="center">Mức giải thưởng</StyleTableCell>
                <StyleTableCell align="center">Chức năng</StyleTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTopics.length ? (
                (rowsPerPage > 0
                  ? dataTopics.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : topics
                ).map((topic, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyleTableCell align="center">
                        {topic?.idTopic}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {topic?.leader?.nameLeader}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {topic?.nameTopic}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {dayjs(topic?.timeStart).format("DD/MM/YYYY")}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {dayjs(topic?.timeEnd).format("DD/MM/YYYY")}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {topic?.typeTopic}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {topic?.typeResult?.nameResult
                          ? topic?.typeResult?.nameResult
                          : "Chưa cập nhật"}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {topic?.awardGrade?.nameGrade
                          ? topic?.awardGrade?.nameGrade
                          : "Chưa cập nhật"}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {topic?.awardLevel?.nameLevel
                          ? topic?.awardLevel?.nameLevel
                          : "Chưa cập nhật"}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        <IconButton
                          color="primary"
                          size="medium"
                          variant="text"
                          onClick={() => {
                            setModalData(topic);
                            handleOpenModalEdit();
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="primary"
                          size="medium"
                          variant="text"
                          onClick={() => {
                            setSelecIdTopic(topic.idTopic);
                            handleConfirmDel();
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </StyleTableCell>
                      <Modal
                        onClose={handleCancelDel}
                        keepMounted
                        open={confirmDel}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 600,
                            bgcolor: "#fff",
                            boxShadow: 24,
                            borderRadius: "12px",
                            padding: 4,
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{ marginBottom: "15px" }}
                          >
                            Bạn có chắc chắn muốn xóa hay không ?
                          </Typography>
                          <Button
                            variant="text"
                            sx={{ margin: "24px 0", float: "right" }}
                            onClick={handleCancelDel}
                          >
                            Hủy Bỏ
                          </Button>
                          <Button
                            onClick={() => {
                              handleDeleteTopics();
                            }}
                            variant="contained"
                            sx={{ margin: "24px 12px", float: "right" }}
                          >
                            Xóa
                          </Button>
                        </Box>
                      </Modal>
                    </StyledTableRow>
                  );
                })
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={topics?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ModalAddTopics
        openModalAdd={openModalAdd}
        handleAddTopics={handleAddTopics}
        handleCancelAddTopics={handleCloseModalAdd}
        emtyError={emtyError}
      />
      <ModalEditTopics
        openModalEdit={openModalEdit}
        handleEditTopics={handleEditTopics}
        handleCancelEditTopics={handleCloseModalEdit}
        modalData={modalData}
      />
    </>
  );
};

export default UpdateTopics;
