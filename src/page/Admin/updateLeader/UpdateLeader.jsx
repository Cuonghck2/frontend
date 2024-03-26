/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
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
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import request from "../../../utils/request";
import ModalAddLeader from "./component/modalLeader/ModalAddLeader";
import {
  deleteLeader,
  listLeader,
  updateLeaderAsync,
} from "../../../slice/leaderSlice";
import { addLeaderAsync, deleteLeaderAsync } from "../../../slice/leaderSlice";
import useLeaders from "../../../api/useLeaders";
import ModalDeleteLeader from "./component/modalLeader/ModalDeleteLeader";
import ModalEditLeader from "./component/modalLeader/ModalEditLeader";
import { useNavigate } from "react-router-dom";
const UpdateLeader = () => {
  const { leaders } = useSelector((state) => state.leaders);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [typeSearch, setTypeSearch] = useState("");
  const [emtyError, setEmtyError] = useState(false);
  const [dataLeaders, setDataLeaders] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selecIdLeader, setSelecIdLeader] = useState(null);
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  //get leaders
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await request("/api/topicLeader");
      dispatch(listLeader(res?.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //add leaders
  const handleAddLeader = (data) => {
    const { idLeader, nameLeader, idUnit } = data;
    if (!idLeader || !nameLeader || !idUnit) {
      setEmtyError(true);
    } else {
      dispatch(addLeaderAsync(data));
      setOpenModalAdd(false);
    }
  };
  //edit
  const handleEditLeader = (data) => {
    dispatch(updateLeaderAsync(data));
    setOpenModalEdit(false);
  };

  //delete
  const handleDeleteLeader = () => {
    dispatch(deleteLeaderAsync(selecIdLeader));
    setConfirmDel(false);
  };

  //search
  useEffect(() => {
    if (typeSearch === "Mã chủ nhiệm") {
      setDataLeaders(
        leaders.filter((leader) => leader?.idLeader.includes(searchValue))
      );
    } else if (typeSearch === "Tên chủ nhiệm") {
      setDataLeaders(
        leaders.filter((leader) => leader?.nameLeader.includes(searchValue))
      );
    } else if (typeSearch === "Đơn vị") {
      setDataLeaders(
        leaders.filter((leader) => leader?.unit?.nameUnit.includes(searchValue))
      );
    } else {
      setDataLeaders(leaders);
    }
  }, [leaders, searchValue, typeSearch]);

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

  //view modal add
  const handleOpenModal = () => {
    setOpenModalAdd(true);
  };
  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  //view modal edit
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
      <Button variant="contained" startIcon={<Add />} onClick={handleOpenModal}>
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
          <MenuItem value={"Mã chủ nhiệm"}>Mã đề tài</MenuItem>
          <MenuItem value={"Tên chủ nhiệm"}>Tên chủ nhiệm</MenuItem>
          <MenuItem value={"Đơn vị"}>Đơn vị</MenuItem>
        </Select>
      </FormControl>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
          <Table stickyHeader aria-label="custom-table">
            <TableHead>
              <TableRow>
                <StyleTableCell align="center">Mã chủ nhiệm</StyleTableCell>
                <StyleTableCell align="center">Tên chủ nhiệm</StyleTableCell>
                <StyleTableCell align="center">Đơn vị</StyleTableCell>
                <StyleTableCell align="center">Thành viên</StyleTableCell>
                <StyleTableCell align="center">Chức năng</StyleTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataLeaders.length ? (
                (rowsPerPage > 0
                  ? dataLeaders.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : leaders
                ).map((leader, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyleTableCell align="center">
                        {leader?.idLeader}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {leader?.nameLeader}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {leader?.unit?.nameUnit}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => {
                            naviagate(
                              `/update-leader/members/${leader?.idLeader}`
                            );
                          }}
                        >
                          Nhấn để xem
                        </Button>
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        <IconButton
                          color="primary"
                          size="medium"
                          variant="text"
                          onClick={() => {
                            setModalData(leader);
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
                            setSelecIdLeader(leader.idLeader);
                            handleConfirmDel();
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <ModalDeleteLeader
                          handleCancelDel={handleCancelDel}
                          confirmDel={confirmDel}
                          handleDeleteLeader={handleDeleteLeader}
                          id={selecIdLeader}
                        />
                      </StyleTableCell>
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
          count={leaders?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ModalAddLeader
        openModalAdd={openModalAdd}
        handleAddLeader={handleAddLeader}
        handleCancelAddLeader={handleCloseModalAdd}
        emtyError={emtyError}
      />
      <ModalEditLeader
        openModalEdit={openModalEdit}
        modalData={modalData}
        handleEditLeader={handleEditLeader}
        handleCancelEditLeader={handleCloseModalEdit}
      />
    </>
  );
};

export default UpdateLeader;
